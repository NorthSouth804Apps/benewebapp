import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  loadStripe, Stripe, StripeElementsOptions, StripeError, StripePaymentElementOptions
} from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  public loadingForm?: boolean;


  @ViewChild('paymentElement') paymentElement!:ElementRef;

  card! : any;
  cardErrors! : any;
  stripe;
  confirmation! : any;

  amount = 0.00;
  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
    this.subscribeToAmount();
  }

  async handleForm(e) {
    e.preventDefault();
    this.loadingForm = true;
    let  elements = this.elements;
    this.stripeService.confirmPayment({elements, confirmParams: {
      return_url: environment.PAYMENT_REDIRECT
    }}).subscribe(err => {
      this.loadingForm = false;
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
     // seting loading while the form is mounted
     this.loadingForm = true;
    this.stripe = loadStripe('pk_test_4bYHi3AuP5PNZXw1WFZUsaDX00qy7g55AY').then((res) =>{

      if(res){
        this.elements = res.elements({clientSecret: client_secret, appearance: this.setStripeAppearance()});
        this.card = this.elements.create('payment');
        this.card.mount(this.paymentElement.nativeElement);
        this.card.addEventListener('change', ({ error }) => {
        this.loadingForm = false;

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
