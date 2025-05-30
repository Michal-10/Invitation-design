import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    console.log("in service");
    
    return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders());
  }

  addCategory(category: { name: string }): Observable<any> {
    return this.http.post(this.apiUrl, category, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }
}
