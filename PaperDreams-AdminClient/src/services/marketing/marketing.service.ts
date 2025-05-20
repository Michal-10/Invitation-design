import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private http: HttpClient) { }

  // קריאה ל-AI ליצירת תוכן שיווקי
  generateMarketingText(): Observable<{ text: string }> {
    return this.http.post<{ text: string }>(
      'http://localhost:5000/marketing/generate',
      {},
      { responseType: 'json' }
    );
  }

  // טעינת כתובות האימייל מהשרת
  // loadEmails(): Observable<string[]> {
  //   return this.http.get<string[]>(
  //     `${environment.apiUrl}/api/user/AllEmailsUsers`,
  //     this.getAuthHeaders()
  //   );
  // }

  // שליחת תוכן שיווקי לשרת
  sendMarketingEmail( content: string ): Observable<any> {
    console.log("in marketingService before sendMarketingEmail");
    console.log(content);
    
    return this.http.post(
      `${environment.apiUrl}/Marketing/send`,
      JSON.stringify(content),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        })
      }
    );
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }
}
