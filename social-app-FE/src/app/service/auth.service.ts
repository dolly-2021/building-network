import { Injectable } from '@angular/core';
import { UserLogin } from '../model/user-login';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { UserSignup } from '../model/user-signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;
  private authToken: String;
  private authUserDetails: User
  logoutSubject = new Subject<boolean>();
	loginSubject = new Subject<User>();

  constructor(private httpClient: HttpClient) { }

  signup(userSignup: UserSignup):  Observable<HttpResponse<any> | HttpErrorResponse> {
    return  this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.url}/signup`, userSignup, { observe: 'response' });
  }

  login(userLogin: UserLogin) : Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.url}/login`, userLogin,  { observe: 'response' });
  }

  storeTokenInCache(authToken: string) {
    if(authToken != '' || authToken != null) {
      this.authToken = authToken;
      localStorage.setItem('authToken', authToken);
    }
  }

  storeUserDetailsInCache(authUser: User) {
    if(authUser != null) {
      this.authUserDetails = authUser;
      localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    this.loginSubject.next(authUser);
  }

  logout() {}
}
