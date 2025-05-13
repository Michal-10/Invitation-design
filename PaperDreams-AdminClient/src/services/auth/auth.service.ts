// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5077/api/user';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log("in authService before login");

    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  getRole(): string[] {
    console.log("in authService before getRole");
    
    const token = localStorage.getItem('token');
    console.log("in authService before getRole token: " + token);
    console.log(token);
    
    if (!token) return [];

    const decoded: any = jwtDecode(token);
    console.log("---------- decoded token ---");
    
    console.log(decoded);
    console.log(decoded.role);
    console.log( decoded['roles']);
    
    console.log("---------- decoded token ---");
    
    const roles = decoded['roles'] || [];
    return Array.isArray(roles) ? roles : [roles];
  }

  getAdminEmail():string{
    console.log("in authService before getRole");
    
    const token = localStorage.getItem('token');
    console.log("in authService before getRole token: " + token);
    console.log(token);
    
    if (!token) return '';

    const decoded: any = jwtDecode(token);
    console.log("---------- decoded token ---");
    
    console.log(decoded);
    console.log(decoded.role);
    console.log( decoded['email']);
    
    console.log("---------- decoded token ---");
    return decoded['email'];
  }
  isAdmin(): boolean {
    return this.getRole().includes('admin') || this.getRole().includes('Admin');
  }
}
