import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  StripePaymentElementOptions,
  StripeElementsOptions,
  Stripe,
  StripeError,
  loadStripe
} from '@stripe/stripe-js';
import { async } from '@angular/core/testing/testing';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() paymentIntent: Subject<any>;

  stripeTest!: FormGroup;
  pi! : Object;
  private elements;
  cardOptions: StripePaymentElementOptions = {
    
  };

  @ViewChild('paymentElement') paymentElement!:ElementRef;

  card! : any;
  cardErrors! : any;
  stripe;
  loading = false;
  confirmation! : any;

  amount = 0.00;
  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
    this.subscribeToAmount();
  }

  async handleForm(e) {
    e.preventDefault();
    this.loading = true;
    let  elements = this.elements;
    this.stripeService.confirmPayment({elements, confirmParams: {
      return_url: environment.PAYMENT_REDIRECT
    }}).subscribe(err => {
      this.loading = false;
      if(err){
        
        console.log('stripe-error',err);
      }
    });
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
    this.stripe = loadStripe('pk_test_4bYHi3AuP5PNZXw1WFZUsaDX00qy7g55AY').then((res) =>{

      if(res){
        this.elements = res.elements({clientSecret: client_secret, appearance: this.setStripeAppearance()});
        this.card = this.elements.create('payment');
        this.card.mount(this.paymentElement.nativeElement);

        this.card.addEventListener('change', ({ error }) => {
          if(error)this.cardErrors = error && error.message;
        });
      }
    });
  }
  
  setStripeAppearance() : Object{
     return {
      theme: 'night',
      variables: {
        colorText: '#FEFEFE',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      },
    };
  }

}
