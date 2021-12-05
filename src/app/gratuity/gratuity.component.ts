import { Component, OnInit } from '@angular/core';
import { GratuityService } from './gratuity.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RouterExtService } from '../services/router.service';

@Component({
  selector: 'app-gratuity',
  templateUrl: './gratuity.component.html',
  styleUrls: ['./gratuity.component.scss']
})
export class GratuityComponent implements OnInit {

  constructor(private routerExtService: RouterExtService,private router: Router,private gratuityService: GratuityService ) { }

  private selectedTip: number = 0;
  private mServiceProvider;
  private mPaymentIntent;

  paymentIntent = new Subject;
  serviceProvider = new Subject;
  totalAmount = new Subject;

  ngOnInit(): void {
    let spID = this.routerExtService.getID();
    if(spID > 0){
      this.serviceProviderListener(spID);
    }else{
      this.router.navigate(['/not-found']);
    }
    
  }

  //creating a payment intent for stripe to handle payment charge.
  onTipSelected(event) {
    if(event && event > 0){
      this.selectedTip = event;
      //check if payment intent has been fetched
      if(!this.mPaymentIntent){
        this.gratuityService.fetchPaymentIntent(this.mServiceProvider.serviceProvider.serviceProviderID, this.selectedTip).subscribe(paymentIntent => {
          //storing payment intent if the user decides to  change amount.
          this.mPaymentIntent = paymentIntent;
          this.paymentIntent.next(this.mPaymentIntent);
        });
      }else{
        //TODO: correct payment intent in the event tip amount has changed.  
        this.paymentIntent.next(this.mPaymentIntent);
      }
    }
  }

  serviceProviderListener(id){

    this.gratuityService.fetchServiceProvider(id).subscribe(user => {
      //verifying the user is a service provider or redirecting to not found.
      if(user && user.user && user.user.user.type === '2'){
        try{
          this.mServiceProvider = user.user;
          this.serviceProvider.next(this.mServiceProvider);
        }catch(err){
          this.router.navigate(['/not-found']);
        }
      }else{
        this.router.navigate(['/not-found']);
      }
      
      
    });
  }

}
