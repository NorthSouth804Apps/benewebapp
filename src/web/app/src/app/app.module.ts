import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServicesModule } from './services/services.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import {TransferState, makeStateKey} from '@angular/platform-browser';
import { ApiService } from './services/api/api.service';
import { ServerStateInterceptor } from './services/serverstate/serverstate-interceptor.service';
import { BrowserStateInterceptor } from './services/browser-interceptor/browserstate-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServicesModule,
    ComponentsModule,
    
  ],
  providers: [TransferState, ApiService, BrowserStateInterceptor ],
  bootstrap: [AppComponent]
})
export class AppModule { }
