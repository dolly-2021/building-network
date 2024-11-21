import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserResponse } from '../model/user-response';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private apiUrl = environment.apiUrl;
	private jwtService = new JwtHelperService();

	constructor(private httpClient: HttpClient) { }

    forgotPassword(email: string): Observable<any | HttpErrorResponse> {
		const reqParams = new HttpParams().set('email', email);
		return this.httpClient.post<any | HttpErrorResponse>(`${this.apiUrl}/forgot-password`, null, { params: reqParams });
	}

}