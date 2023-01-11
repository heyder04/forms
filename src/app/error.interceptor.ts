import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response:HttpErrorResponse)=>{
        let message="error"
        if(response.error.error){
          if(response.status===401){
               message="yetki yok"
               return throwError(message)
          }
        }
         
          if(!navigator.onLine){
           message="no connection"
           return throwError(message)
          }


         if(response.error.error){
    switch(response.error.error.message){
      case "EMAIL_EXISTS":
        message="exist"
        break;
      case "EMAIL_NOT_FOUND":
        message="NOT found"
        break;

    }
        }
       return throwError(message)
      })
    );
  }
}
