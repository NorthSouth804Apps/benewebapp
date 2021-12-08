import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { async } from '@angular/core/testing/testing';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  StripeElementsOptions,
  Stripe,
  loadStripe,
  StripeElements,
} from '@stripe/stripe-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  @Input() paymentIntent: Subject<any>;
  stripeTest!: FormGroup;
  pi!: Object;
  private elements: StripeElements;

  // cardOptions: StripePaymentElementOptions = {

  //};
  public loadingForm?: boolean;

  @ViewChild('paymentElement') paymentElement!: ElementRef;

  card!: any;
  cardErrors!: any;
  loading = false;

  stripe;
  confirmation!: any;

  amount = 0.0;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToAmount();
  }

  ngAfterViewInit(): void {}

  handleForm(e) {
    e.preventDefault();

    if (!this.loading) {
      this.loadingForm = true;
      this.loading = true;
      const elements = this.elements;

      this.stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
          // confirmParams: {
          //   // return_url: environment.PAYMENT_REDIRECT + '/?amount=' + this.amount,
          //   redirect: "if_required",
          // }
        })
        .then(({ error }) => {
          this.loadingForm = false;
          this.loading = false;

          // This point will only be reached if there is an immediate error when
          // confirming the payment. Otherwise, your customer will be redirected to
          // your `return_url`. For some payment methods like iDEAL, your customer will
          // be redirected to an intermediate site first to authorize the payment, then
          // redirected to the `return_url`.
          if (
            error && error.type === 'card_error' ||
            error && error.type === 'validation_error'
          ) {
            console.log('CARD or VALIDATION', error.message);
            this.cardErrors = error.message;
          } else if (error) {
            console.log('An unexpected error occured. ', error);
          } else {
            this.router.navigate(['thankyou'], {
              queryParams: { amount: this.amount },
            });
          }
        });
    }
  }

  subscribeToAmount() {
    this.paymentIntent.subscribe((pi) => {
      console.log('payment', pi);
      this.pi = pi;
      this.amount = pi.amount;
      this.createStripeElement(pi.client_secret);
    });
  }

  createStripeElement(client_secret) {
    // seting loading while the form is mounted
    this.loadingForm = true;
    loadStripe('pk_test_4bYHi3AuP5PNZXw1WFZUsaDX00qy7g55AY').then((stripe) => {
      if (!stripe) {
        console.log('Failed to load stripe');
        return;
      }

      this.loadingForm = false;
      this.stripe = stripe;
      this.elements = stripe.elements({
        clientSecret: client_secret,
        appearance: {
          theme: 'night',
          variables: {
            colorText: '#FEFEFE',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          },
        },
      });

      this.card = this.elements.create('payment');
      this.card.mount(this.paymentElement.nativeElement);
      this.card.addEventListener('change', ({ error }) => {
        this.loadingForm = false;

        if (error) this.cardErrors = error && error.message;
      });
    });
  }
}
