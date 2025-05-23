
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  // private apiUrl = 'http://localhost:5077/api/statistics';

  // constructor(private http: HttpClient) {}

  // getTotalTemplates(): Observable<number> {
  //   return this.http.get<number>(`${this.apiUrl}/total-templates`);
  // }

  // getTotalFields(): Observable<number> {
  //   return this.http.get<number>(`${this.apiUrl}/total-fields`);
  // }

  // getTemplatesByCategory(): Observable<{ category: string, count: number }[]> {
  //   return this.http.get<{ category: string, count: number }[]>(`${this.apiUrl}/templates-by-category`);
  // }

  // getDailyLogins(): Observable<{ date: string, count: number }[]> {
  //   return this.http.get<{ date: string, count: number }[]>(`${this.apiUrl}/daily-logins`);
  // }

  private apiUrl = `${environment.apiUrl}/Statistics`;

  constructor(private http: HttpClient) {}

  // getTotalTemplates(): Observable<number> {
  //   console.log("getTotalTemplates");
    
  //   return this.http.get<number>(`${this.apiUrl}/total-templates`);
  // }

  // getTotalFields(): Observable<number> {
  //   console.log("getTotalFields");
    
  //   return this.http.get<number>(`${this.apiUrl}/total-fields`);
  // }

  getDailyActiveUsers(): Observable<{ date: string, count: number }[]> {
    console.log("getDailyActiveUsers");
    
    return this.http.get<{ date: string, count: number }[]>(`${this.apiUrl}/active-users-daily`);
  }

  getTemplatesByCategory(): Observable<{ categoryName: string, count: number }[]> {
    console.log("getTemplatesByCategory");
    
    return this.http.get<{ categoryName: string, count: number }[]>(`${this.apiUrl}/templates-by-category`);
  }

  getDailyLogins(): Observable<{ date: string, count: number }[]> {
    console.log("getDailyLogins");
    
    return this.http.get<{ date: string, count: number }[]>(`${this.apiUrl}/daily-logins`);
  }
}