
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
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  editingUserId: number | null = null;
  userForm!: FormGroup;
  add_user: boolean = false;
  hidePassword: boolean = true;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;








  // searchTerm: string = '';
  // sortAscending: boolean = true;
  
  // get filteredUsers(): User[] {
  //   const filtered = this.users.filter(user => {
  //     const name = `${user.firstName} ${user.lastName}`.toLowerCase();
  //     const email = user.email.toLowerCase();
  //     const term = this.searchTerm.toLowerCase();
  //     return name.includes(term) || email.includes(term);
  //   });
  
  //   return filtered.sort((a, b) => {
  //     const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
  //     const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
  //     return this.sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  //   });
  // }
  
  // toggleSortOrder() {
  //   this.sortAscending = !this.sortAscending;
  // }







  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  fetchUsers() {
    console.log("fetchUsers");
    
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        const adminEmail = this.authService.getAdminEmail();
        this.users = data.filter(user => user.email !== adminEmail);
        this.isLoading = false; // סיים טעינה
      },
      error: (err) => {
        this.isLoading = false; // סיים טעינה
        if ( err.status == 401 ){
          Swal.fire({
            title: 'שגיאה',
            text: 'משתמש לא מחובר',
            icon: 'error',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#2575fc'
          });
        }
        console.error('שגיאה בטעינת משתמשים:', err);
        Swal.fire({
          title: 'שגיאה',
          text: 'לא ניתן לטעון את רשימת המשתמשים',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });
      }
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
        this.fetchUsers();
        this.dialogRef.close();
        Swal.fire({
          title: 'הצלחה',
          text: 'המשתמש נוסף בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'שגיאה',
          text:  'אירעה שגיאה בהוספת המשתמש',
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
    if (!this.editingUserId || this.userForm.invalid) return;

    const formValue = this.userForm.value;
    let updatedUser: User = {
      ...formValue,
      password: formValue.password || '',
    }; 
    
    if (formValue.password && formValue.password.trim() !== '') {
      updatedUser.password = formValue.password;
    }

   
console.log("in saveUser before update");
console.log(updatedUser);


    this.userService.updateUser(this.editingUserId, {...updatedUser} as User).subscribe({
      next: () => {
        this.fetchUsers();
        this.dialogRef.close();
        
        Swal.fire({
          title: 'הצלחה',
          text: 'המשתמש עודכן בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'שגיאה',
          text:  'אירעה שגיאה בעדכון המשתמש',
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
            this.fetchUsers();
            // this.users = this.users.filter(u => u.id !== id);
            Swal.fire({
              title: 'נמחק!',
              text: 'המשתמש נמחק בהצלחה',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
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