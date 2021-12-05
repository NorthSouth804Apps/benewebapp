import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GratuityComponent } from './gratuity/gratuity.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { TipamountComponent } from './shared/tipamount/tipamount.component';
import { PaymentComponent } from './shared/payment/payment.component';
import { ThankyouComponent } from './shared/thankyou/thankyou.component';

import { ApiService } from './services/api.service';
import { RouterExtService } from './services/router.service'
import { ErrorInterceptor } from './services/error.service';
import { CurrencyformatterDirective } from './common/directives/currencyformatter.directive';
import { NotfoundComponent } from './shared/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    GratuityComponent,
    ProfileComponent,
    TipamountComponent,
    PaymentComponent,
    ThankyouComponent,
    CurrencyformatterDirective,
    NotfoundComponent
  ],
  imports: [
    NgxStripeModule.forRoot('pk_test_4bYHi3AuP5PNZXw1WFZUsaDX00qy7g55AY'),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService,RouterExtService,{provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private routerExtService: RouterExtService){}
}
