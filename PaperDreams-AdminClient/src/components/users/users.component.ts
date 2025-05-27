
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/users/users.service';
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
import { ParseDatePipe } from '../../pipes/parse-date.pipe';

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
    // ParseDatePipe
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  isLoadingSave: boolean = false;
  editingUserId: number | null = null;
  userForm!: FormGroup;
  add_user: boolean = false;
  hidePassword: boolean = true;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;
  new: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.users$.subscribe(users => {
      console.log("Users received from service:", users);
      console.log(users);


      this.users = users;
      this.isLoading = false;
    });

    // טוען פעם ראשונה את המשתמשים
    this.userService.refreshUsers();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
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

    this.userService.addUser(user).subscribe({
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
          text: 'אירעה שגיאה בהוספת המשתמש',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });
      }
    });
  }

  startEdit(user: User) {
    this.editingUserId = user.id;
    this.add_user = false;

    this.userForm.reset();
    this.userForm.patchValue({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    this.openDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.editDialog, {
      width: '500px',
      direction: 'rtl',
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.cancelEdit();
    });
  }

  cancelEdit() {
    this.editingUserId = null;
    this.add_user = false;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  saveUser() {
    this.isLoadingSave = true;
    if (!this.editingUserId || this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const updatedUser: User = {
      ...formValue,
      password: formValue.password || ''
    };

    this.userService.updateUser(this.editingUserId, updatedUser).subscribe({
      next: () => {
        this.isLoadingSave = false;
        this.dialogRef.close();
        Swal.fire({
          title: 'הצלחה',
          text: 'המשתמש עודכן בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          title: 'שגיאה',
          text: 'אירעה שגיאה בעדכון המשתמש',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });
      }
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
        this.userService.deleteUser(id).subscribe({
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