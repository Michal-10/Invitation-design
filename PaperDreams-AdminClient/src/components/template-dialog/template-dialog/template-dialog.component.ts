import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/categories/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css']
})
export class TemplateDialogComponent {
  templateForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [null, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submit(): void {
    if (this.templateForm.invalid || !this.selectedFile) {
      Swal.fire({
        title: 'שגיאה',
        text: 'יש למלא את כל השדות כולל קובץ',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
      return;
    }

    const timestamp = new Date().getTime();
    const originalFile = this.selectedFile;
    const extension = originalFile.name.split('.').pop();
    const newFileName = originalFile.name.split('.')[0] + '_' + timestamp + '.' + extension;

    const renamedFile = new File([originalFile], newFileName, {
      type: originalFile.type,
    });

    this.selectedFile = renamedFile;

    const templateData = {
      ...this.templateForm.value,
      name: this.selectedFile.name,
      imageUrl: '', 
    };

    this.dialogRef.close(templateData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
