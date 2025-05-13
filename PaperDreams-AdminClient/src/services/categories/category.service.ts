// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5077/api/Category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
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
