import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service' 
import { Observable } from "rxjs";
import { endpoints } from '../common/endpoints.common';
import { Params } from "../common/models/params.class";

@Injectable({
  providedIn: 'root'
})
export class GratuityService implements OnInit, OnDestroy{

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  public fetchServiceProvider(userID: number): Observable<any>{
    let params = new Params();
    params.append('userID', userID+'');
    return this.apiService.callApi(endpoints.GET_SERVICE_PROVIDER,params);
    
  }

  public fetchPaymentIntent(serviceProviderID, amount): Observable<any>{
    let params = new Params();
    params.append('serviceProviderID', serviceProviderID+'');
    params.append('amount', amount+'');
    return this.apiService.callApi(endpoints.FETCH_PAYMENT_INTENT,params);
  }

  
}
