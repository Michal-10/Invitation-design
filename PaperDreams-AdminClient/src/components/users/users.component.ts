import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  isLoadingSave: boolean = false;
  userForm!: FormGroup;
  add_user: boolean = false;
  hidePassword: boolean = true;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.usersService.users$.subscribe(users => {
      this.users = users;
      this.isLoading = false;
    });

    this.usersService.getAllUsers().subscribe({
      error: () => {
        Swal.fire({
          title: 'שגיאה בהתחברות',
          text: 'מנהל לא מחובר',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        }).then(() => {
          localStorage.setItem('isLoggedIn', 'false');
          this.router.navigate(['/']);
        });
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  getUserInitials(user: User): string {
    return (user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '');
  }

  openAddUserDialog(): void {
    this.add_user = true;
    this.userForm.reset();
    this.openDialog();
  }

  addUser() {
    if (this.userForm.invalid) return;

    const user: User = {
      ...this.userForm.value,
      role: 'User',
      updatedAt: new Date()
    };

    this.usersService.addUser(user).subscribe({
      next: () => {
        this.dialogRef.close();
        Swal.fire({
          title: 'הצלחה',
          text: 'המשתמש נוסף בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          title: 'שגיאה',
          text: 'ארעה שגיאה בהוספת משתמש, ייתכן שהמשתמש כבר קיים',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });
      }
    });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.editDialog, {
      width: '500px',
      direction: 'rtl',
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.add_user = false;
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: 'פעולה זו תמחק את המשתמש לצמיתות',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53935',
      cancelButtonColor: '#757575',
      confirmButtonText: 'כן, מחק',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'נמחק!',
              text: 'המשתמש נמחק בהצלחה',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: () => {
            Swal.fire({
              title: 'שגיאה',
              text: 'אירעה שגיאה במחיקת המשתמש',
              icon: 'error',
              confirmButtonText: 'אישור',
              confirmButtonColor: '#5c6bc0'
            });
          }
        });
      }
    });
  }
}
