
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/Statistics`;

  constructor(private http: HttpClient) {}

  getDailyActiveUsers(): Observable<{ date: string, count: number }[]> {
    return this.http.get<{ date: string, count: number }[]>(`${this.apiUrl}/active-users-daily`);
  }

  getTemplatesByCategory(): Observable<{ categoryName: string, count: number }[]> {
    return this.http.get<{ categoryName: string, count: number }[]>(`${this.apiUrl}/templates-by-category`);
  }

  getDailyLogins(): Observable<{ date: string, count: number }[]> {
    return this.http.get<{ date: string, count: number }[]>(`${this.apiUrl}/daily-logins`);
  }
}