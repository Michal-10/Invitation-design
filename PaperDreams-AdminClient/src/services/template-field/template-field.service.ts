

// // 🟢 template.service.ts
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class TemplateFieldService {
  
//   constructor(private http: HttpClient) {}

//   addFieldToTemplate(data: any) {
//     return this.http.post('http://localhost:5077/api/TemplateField/add', data);
//   }
// }




// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class TemplateFieldService {
//   constructor(private http: HttpClient) {}

//   addFieldToTemplate(data: any) {
//     console.log("in templateFieldService before addFieldToTemplate");
//     console.log(data);
    
//     return this.http.post('http://localhost:5077/api/TemplateField/add', data);
//   }

  
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemplateFieldService {
  private apiUrl = 'http://localhost:5077/api/TemplateField'; // הגדרת כתובת ה-API

  constructor(private http: HttpClient) {}

  addFieldToTemplate(data: any): Observable<any>  {
    console.log("in templateFieldService before addFieldToTemplate");
    console.log(data);
    return this.http.post('http://localhost:5077/api/TemplateField/add', data);
  }

  updateTemplateFieldPosition(id:number, data: any): Observable<any> {
    console.log("in TemplateFieldService before updateTemplateFieldPosition");
    console.log(data);
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }





















  getTemplateFieldsByTemplateId(templateId: number): Observable<any[]> {
    console.log(`in templateFieldService before getTemplateFieldsByTemplateId for templateId: ${templateId}`);
    return this.http.get<any[]>(`${this.apiUrl}/${templateId}`);
  }

  deleteTemplateField(id: number): Observable<any> {
    console.log("in templateFieldService before deleteTemplateField", id);
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}