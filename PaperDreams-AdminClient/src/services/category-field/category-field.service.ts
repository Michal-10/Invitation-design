// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryFieldService {

//   constructor(private http: HttpClient) {}

//   getFieldsByCategory(categoryId: number) {
//     return this.http.get<any[]>(`http://localhost:5077/api/CategoryField/category/${categoryId}`);
//   }
// }




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryFieldService {
  constructor(private http: HttpClient) {}

  getFieldsByCategory(categoryId: number) {
    console.log("in categoryFieldService before getFieldsByCategory");
    return this.http.get<any[]>(`http://localhost:5077/api/CategoryField/category/${categoryId}`);
  }
}
