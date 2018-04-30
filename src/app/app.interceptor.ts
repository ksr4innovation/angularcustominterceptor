import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, 
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpEvent, HttpErrorResponse} from '@angular/common/http';
  import { Observable } from 'rxjs/Observable';

import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});

      console.log(' HttpRequest ---> HttpRequest:', JSON.stringify(authReq));
    }

    return next.handle(authReq).do( 
        (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log(' HttpResponse ---> status:', event.headers.get('Authorization'));
            }
          },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
           
            if (err.status === 401) {
              console.log('---> HttpErrorResponse status:', event);
            }
          }
        }
      );
  }
 

}