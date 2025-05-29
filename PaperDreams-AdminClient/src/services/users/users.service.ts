import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`, this.getAuthHeaders()).pipe(
      tap(users => {
        const adminEmail = localStorage.getItem('adminEmail');
        const filtered = users.filter(u => u.email !== adminEmail);
        this.usersSubject.next(filtered);
      })
    );
  }

  refreshUsers() {
    this.getAllUsers().subscribe(); 
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/register`, user, this.getAuthHeaders()).pipe(
      tap(() => {
        const current = this.usersSubject.getValue();
        this.refreshUsers();
      })
    );
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/user/update-profile/${id}`, user, this.getAuthHeaders()).pipe(
      tap(() => {
        const current = this.usersSubject.getValue();
        this.refreshUsers();
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`, this.getAuthHeaders()).pipe(
      tap(() => {
        const current = this.usersSubject.getValue();
        this.refreshUsers();
      })
    );
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }
}
