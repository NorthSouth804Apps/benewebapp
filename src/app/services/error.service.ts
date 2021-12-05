import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // fancy pipe-able operators

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept',httpRequest)
    return next.handle(httpRequest).pipe(
      tap(
          response => console.log("Oh boy we got an answer"), 
          error => console.log("Something might be burning back there")
      ));
  }
}
