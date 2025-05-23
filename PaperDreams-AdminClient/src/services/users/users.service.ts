// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
  console.log("in userService before getAllUsers");
  
    return this.http.get<User[]>(`${this.apiUrl}/user`, this.getAuthHeaders());
  }
  updateUser(id: number, user: User) {
    console.log("in userService before updateUser");
    return this.http.put(`${this.apiUrl}/user/update-profile/${id}`, user, this.getAuthHeaders());
  }
  addUser( user: User) {
    console.log("in userService before add");
    return this.http.post(`${this.apiUrl}/user/register`, user, this.getAuthHeaders());
  }
  deleteUser(id: number): Observable<any> {
    console.log("in userService before deleteUser");
    return this.http.delete(`${this.apiUrl}/user/${id}`, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }
}
