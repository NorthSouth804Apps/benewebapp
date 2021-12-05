import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tipamount',
  templateUrl: './tipamount.component.html',
  styleUrls: ['./tipamount.component.scss']
})
export class TipamountComponent implements OnInit, OnDestroy {

  public form : FormGroup

  totalAmount = "$0.00";
  platformFeeAlert = "A 5% platform fee will apply.";
  platformFeeTipAlert = "Platform Fee is not part of tip."

  paymentInfo : any;

  constructor() {
    this.form = new FormGroup({
      tip: new FormControl('0.00')
    })

    this.form.valueChanges.subscribe(v => {
      let unformatted = (v.tip) ? (v.tip +'').replace(/,/g, '').replace(/\$/g, '') : '0';
      this.formatAmount(unformatted);
    });

  }

  @Input() paymentIntent : Subject<any>;

  @Output() tipAmount : EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.subscribeToPaymentIntent();
  }

  ngOnDestroy():void {
    this.paymentIntent.unsubscribe();
  }

  //format amount to display currency
  formatAmount(unformatted:string){
    let addedPlatFormFee = this.addFivePercent(parseFloat(unformatted));
    this.totalAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(addedPlatFormFee);
  }

  setFiveDollars(){
    this.form.controls['tip'].setValue(0.00);
    this.formatAmount('5.00');
  }

  setTenDollars(){
    this.form.controls['tip'].setValue(0.00);
    this.formatAmount('10.00');
  }

  setFifteenDollars(){
    this.form.controls['tip'].setValue(0.00);
    this.formatAmount('15.00');
  }

  leaveTip(){
    let unformatted = this.totalAmount.replace(/,/g, '').replace(/\$/g, '').replace(/\./g,'');
    let totalTip = parseInt(unformatted);
    console.log('stripeFormat',totalTip);
    if(totalTip && totalTip > 0){
      this.tipAmount.emit(totalTip);
    }
  }

  //adds five percent platform fee
  addFivePercent(v:number){
    return ((.05 * v) + v);
  }

  subscribeToPaymentIntent(){
    this.paymentIntent.subscribe(paymentInfo => {
        this.paymentInfo = paymentInfo;
    })
  }
}
