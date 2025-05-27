
// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth/auth.service';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-auth',
//   imports: [
//     FormsModule,
//     HttpClientModule,
//     MatInputModule,
//     MatCardModule,
//     MatButtonModule
//   ],
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.css']
// })
// export class AuthComponent {
//   email = '';
//   password = '';

//   constructor(private authService: AuthService, private router: Router) { }

//   login() {
//     this.authService.login(this.email, this.password).subscribe({
//       next: (res) => {
//         console.log("in auth components in next after login");
//         localStorage.setItem('token', res.token);
//         const isAdmin = this.authService.isAdmin();
//         console.log("isAdmin: " + isAdmin);
//         if(!isAdmin) {
//           alert('אין לך הרשאות גישה למערכת.');
//           localStorage.removeItem('token');
//           return;
//         }
//         localStorage.setItem('isLoggedIn', 'true');
//         console.log("in auth components in next after login 2");

//         this.router.navigate(['/users']);
//       },
//       error: (err) => {
//         alert('שגיאה בהתחברות: ' + err.error);
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email = '';
  password = '';
  hidePassword = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.email || !this.password) {
      Swal.fire({
        title: 'שגיאה',
        text: 'אנא מלא את כל השדות',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#2575fc'
      });
      return;
    }
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        const isAdmin = this.authService.isAdmin();
        
        if(!isAdmin) {
          Swal.fire({
            title: 'אין הרשאה',
            text: 'אין לך הרשאות גישה למערכת.',
            icon: 'warning',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#2575fc'
          });
          localStorage.removeItem('token');
          return;
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        
        Swal.fire({
          title: 'התחברת בהצלחה',
          text: 'ברוך הבא למערכת הניהול',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/']);
        });
        this.isLoading = false;
      },
      error: (err) => {
        Swal.fire({
          title: 'שגיאה בהתחברות',
          text:  'אירעה שגיאה בהתחברות, סיסמא לא תקינה',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        }).then(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }
}