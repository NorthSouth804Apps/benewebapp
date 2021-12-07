import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  StripeElementsOptions,
  Stripe,
  loadStripe,
  StripeElements
} from '@stripe/stripe-js';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  @Input() paymentIntent: Subject<any>;

  stripeTest!: FormGroup;
  pi! : Object;
  private elements: StripeElements;

  // cardOptions: StripePaymentElementOptions = {
    
  // };

  @ViewChild('paymentElement') paymentElement!:ElementRef;

  // @ViewChild(StripeCardComponent) card: StripeCardComponent;

  card! : any;
  stripe: Stripe;
  cardErrors! : any;
  loading = false;
  confirmation! : any;

  amount = 0.00;
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribeToAmount();
  }

  ngAfterViewInit(): void {

  }

  handleForm(e) {
    e.preventDefault();

    if (!this.loading) {

      this.loading = true;
      const elements = this.elements;
  
      this.stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: environment.PAYMENT_REDIRECT
        }
      }).then(({ error }) => {
        this.loading = false;

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          console.log('CARD or VALIDATION', error.message);
          this.cardErrors = error.message;
        } else {
          console.log("An unexpected error occured.");
        }

      });

    }

  }

  subscribeToAmount(){

    this.paymentIntent.subscribe(pi => {
      console.log('payment',pi);
      this.pi = pi;
      this.amount = pi.amount;
      this.createStripeElement(pi.client_secret);

    });

  }

  createStripeElement(client_secret){

    loadStripe('pk_test_4bYHi3AuP5PNZXw1WFZUsaDX00qy7g55AY').then(stripe => {

        if (!stripe) {
          console.log('Failed to load stripe');
          return;
        }

        this.stripe = stripe;
        this.elements = stripe.elements({
          clientSecret: client_secret,
          appearance: {
            theme: 'night',
            variables: {
              colorText: '#FEFEFE',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            }
          }
        });

        this.card = this.elements.create('payment');
        this.card.mount(this.paymentElement.nativeElement);

        this.card.addEventListener('change', ({ error }) => {
          if(error)this.cardErrors = error && error.message;
        });

    });

  }

}
