import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { ServerStateInterceptor } from './serverstate/serverstate-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ApiService,
    ServerStateInterceptor
  ],
  providers: [
    ApiService,
    ServerStateInterceptor
  ]
})
export class ServicesModule { }
