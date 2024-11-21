import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  markAllSeen(): Observable<any | HttpErrorResponse> {
    return this.httpClient.post<any | HttpErrorResponse>(`${this.apiUrl}/notifications/mark-seen`, null);
  }

  // getNotifications(page:number, size:number) : Observable<Notification[] | HttpErrorResponse> {
  //   const reqParams = new HttpParams().set('page', page).set('size', size);
  //   return this.httpClient.get<Notification[] | HttpErrorResponse>(`${this.apiUrl}/notifications`, {params: reqParams});
  // }

  getNotifications(page: number, size: number): Observable<Notification[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<Notification[] | HttpErrorResponse>(`${this.apiUrl}/notifications`, { params: reqParams });
	}

}
