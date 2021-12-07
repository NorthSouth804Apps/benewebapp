import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

 /** A router wrapper, adding extra functions. */
@Injectable()
export class RouterExtService {

  private previousUrl: string = '';
  private currentUrl: string = '';
  private userID: number = 0;

  constructor(private router : Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        console.log('router', event.url);   
        //retrieving the userID of the serviceProvider for application use.
        if(event.url.includes('?userID=')){
          let ind = event.url.indexOf('=');
          this.userID = parseInt(event.url.substring(ind+1));
        }    
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl(){
    return this.previousUrl;
  }    

  public getID() {
    return this.userID;
  }
}