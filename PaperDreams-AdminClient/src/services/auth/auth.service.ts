import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/user';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  getRole(): string[] {
    
    const token = localStorage.getItem('token');
    
    if (!token) return [];

    const decoded: any = jwtDecode(token);
    const roles = decoded['roles'] || [];
    return Array.isArray(roles) ? roles : [roles];
  }

  getAdminEmail():string{
    
    const token = localStorage.getItem('token');
    if (!token) return '';
    const decoded: any = jwtDecode(token);
    return decoded['email'];
  }
  isAdmin(): boolean {
    return this.getRole().includes('admin') || this.getRole().includes('Admin');
  }
}
