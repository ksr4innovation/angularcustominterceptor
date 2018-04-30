import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
const TOKEN_KEY = 'AuthToken';

import 'rxjs/add/operator/map';
import { User } from './auth.model';

@Injectable()
export class TokenStorage {

  constructor(private http: HttpClient){
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

   auth() : Observable<User> {
    console.log('   from atuh method ');
    return this.http.get<User>('http://localhost:8080/api/rest/home');
  }

  userDetail() : Observable<User> {
    console.log('   userDetail ');
    return this.http.get<User>('http://localhost:8080/api/rest/user');
  }
}
