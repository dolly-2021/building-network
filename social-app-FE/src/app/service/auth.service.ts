import { Injectable } from '@angular/core';
import { UserLogin } from '../model/user-login';
import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { UserSignup } from '../model/user-signup';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  private authToken: String;
  private authUserDetails: User;
  private principal: String;
  private authUser: User;
  logoutSubject = new Subject<boolean>();
  loginSubject = new Subject<User>();
  private jwtService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {}

  signup(
    userSignup: UserSignup
  ): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.url}/signup`,
      userSignup,
      { observe: 'response' }
    );
  }

  login(
    userLogin: UserLogin
  ): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.url}/login`, userLogin, {
      observe: 'response',
    });
  }

  storeTokenInCache(authToken: string) {
    if (authToken != '' || authToken != null) {
      this.authToken = authToken;
      localStorage.setItem('authToken', authToken);
    }
  }

  storeUserDetailsInCache(authUser: User) {
    if (authUser != null) {
      this.authUserDetails = authUser;
      localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    this.loginSubject.next(authUser);
  }

  logout(): void {
		this.authToken = null;
		this.authUser = null;
		this.principal = null;
		localStorage.removeItem('authUser');
		localStorage.removeItem('authToken');
		this.logoutSubject.next(true);
	}

  loadAuthTokenFromCache() {
    this.authToken = localStorage.getItem('authToken');
    console.log(this.authToken);
  }

  isUserLoggedIn(): boolean {
    this.loadAuthTokenFromCache();
    if (this.authToken != null && this.authToken != '') {
      if (this.jwtService.decodeToken(this.authToken.toString()).sub != null || '') {
        if (!this.jwtService.isTokenExpired(this.authToken.toString())) {
          this.principal = this.jwtService.decodeToken(this.authToken.toString()).sub;
          return true;
        }
      }
    }
    this.logout();
    return false;
  }

  getAuthUserFromCache(): User {
		return JSON.parse(localStorage.getItem('authUser'));
	}

}
