import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class CategoryFieldService {
  constructor(private http: HttpClient) {}

  getFieldsByCategory(categoryId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/CategoryField/category/${categoryId}`);
  }
}
