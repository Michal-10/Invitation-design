import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class TemplateFieldService {
  private apiUrl = `${environment.apiUrl}/TemplateField`; 

  constructor(private http: HttpClient) {}

  addFieldToTemplate(data: any): Observable<any>  {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  updateTemplateFieldPosition(id:number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }
  
  getTemplateFieldsByTemplateId(templateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${templateId}`);
  }

  deleteTemplateField(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}