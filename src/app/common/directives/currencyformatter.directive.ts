import { Directive, HostListener, Self, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[currencyformatter]'
})
export class CurrencyformatterDirective implements OnDestroy {

  private formatter : Intl.NumberFormat;
  private destroy$ = new Subject();

  constructor(@Self() private ngControl: NgControl) { 
    this.formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.setValue(this.formatPrice(this.ngControl.value));
    
      this.ngControl
      .control!
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.updateValue.bind(this));  
  }

  @HostListener('focus') onFocus() {
    this.setValue(this.unformatValue(this.ngControl.value));
  }

  @HostListener('blur') onBlur(){
    let value = this.ngControl.control!.value || '';
    console.log('blur', value);
    !!value && this.setValue(this.formatPrice(value));
  }

  updateValue(value) {
    console.log('update');
    if(value){
      console.log('updated value', this.formatter.format(value));
    }

    let inputVal = value || '';
    this.setValue(!!inputVal ?
      this.validateDecimalValue(inputVal.replace(/[^0-9.]/g, '')) : '');
  }

  unformatValue(v) {
    return v.replace(/,/g, '');
  }

  formatPrice(v) {
    console.log('formatting',v);
    if(v === '$0.00'){
      return this.formatter.format(0);
    }
    return this.formatter.format(v);
  }

  setValue(v) {
    if(v === 0.00){
      console.log('set value',  'undefined');
    }

    console.log('set value',v);
    this.ngControl.control!.setValue( v, { emitEvent: false });
  }

  validateDecimalValue(v) {
    if(Number.isNaN(Number(v))){
      const strippedValue = v.slice(0,v.length - 1);
      console.log('decimal format');
      console.log(strippedValue);
      return Number.isNaN(Number(strippedValue)) ? '' : strippedValue;
    }
    if(this.ngControl.control!.value > 100){
      const strippedValue = v.slice(0,v.length - 1);
      console.log('decimal format');
      console.log(strippedValue);
      return Number.isNaN(Number(strippedValue)) ? '' : strippedValue;
    }
    return v;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.setValue(this.unformatValue(this.ngControl.value));
  }

}
