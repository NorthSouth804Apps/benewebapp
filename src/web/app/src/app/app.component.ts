import { Component } from '@angular/core';
import {Injectable, Inject, PLATFORM_ID, Optional} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {TransferState, makeStateKey} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bene Tipping';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  @Optional() @Inject('serviceProviderID') public message: string, private readonly transferState: TransferState)
  {         
    const storeKey = makeStateKey<string>('serviceProviderID');
    if(isPlatformBrowser(this.platformId))//get message from transferState if browser side
    {
        this.message = this.transferState.get(storeKey, 'defaultMessageValue');
    }
    else //server side: get provided message and store in in transfer state
    {
        this.transferState.set(storeKey, this.message);
    }
  }
}
