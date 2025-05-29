import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/categories/category.service';
import { TemplatesService } from '../../services/templates/templates.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  templateForm: FormGroup;
  isUploading: boolean = false;
  categories: any[] = [];
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private templateService: TemplatesService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [null, Validators.required],
    });
  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async submit(): Promise<void> {
    this.isUploading = true; 

    if (this.templateForm.invalid || !this.selectedFile) {
         Swal.fire({
              title: 'שגיאה',
              text: 'יש למלא את כל השדות כולל קובץ',
              icon: 'error',
              confirmButtonText: 'אישור',
              confirmButtonColor: '#2575fc'
            });
      this.isUploading = false;
      return;
    }

    try {
      const timestamp = new Date().getTime();
      const originalFile = this.selectedFile!;
      const extension = originalFile.name.split('.').pop(); 
      const newFileName = originalFile.name.split('.')[0] + '_' + timestamp + '.' + extension;

      // יצירת קובץ חדש עם שם חדש
      const renamedFile = new File([originalFile], newFileName, {
        type: originalFile.type,
      });

      // שמירת הקובץ החדש במקום הישן
      this.selectedFile = renamedFile;
      const presignedUrl = await this.templateService.uploadFileToAWS(this.selectedFile);
      await this.templateService.uploadToS3(this.selectedFile, presignedUrl);

      const templateData = {
        ...this.templateForm.value,
        name: this.selectedFile.name,
        imageUrl: presignedUrl, 
      };
      sessionStorage.setItem('categoryId', this.templateForm.value.categoryId);

      this.templateService.createTemplate(templateData).subscribe(async (res) => {
        Swal.fire({
          title: 'הצלחה',
          text: 'התבנית נשמרה בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        sessionStorage.setItem('template', JSON.stringify(res));

        const updatedFileName = res.name; // עדכון שם הקובץ שנשמר ב-AWS

        const presignedUrl = await this.templateService.uploadFileToAWS(this.selectedFile);

        await this.templateService.uploadToS3(this.selectedFile, presignedUrl);

        this.isUploading = false; 
        this.router.navigate(['/positions', res.id]);
      }, error => {
        console.error('Error creating template:', error);
        this.isUploading = false;
        Swal.fire({
          title: 'שגיאה',
          text: 'שגיאה בשמירת התבנית',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });
      });
    } catch (err) {
      this.isUploading = false;
      if ((err as any).status === 401) {
         Swal.fire({
            title: 'שגיאה',
            text: 'שגיאה בהעלאה: משתמש לא מחובר למערכת',
            icon: 'error',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#5c6bc0'
          });
        return;
      }
      Swal.fire({
        title: 'שגיאה',
        text: 'שגיאה בהעלאה: ',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
    }
  }
}





