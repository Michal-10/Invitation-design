

// import { Component, OnInit } from '@angular/core';
// import { Template } from '../../models/template';
// import { CategoryService } from '../../services/categories/category.service';
// import { TemplatesService } from '../../services/templates/templates.service';import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { FormsModule } from '@angular/forms';
// import Category from '../../models/Category';

// @Component({
//   selector: 'app-template-list',
//   imports: [
//     MatCardModule,
//     MatFormFieldModule,
//     FormsModule,
//     MatInputModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatButtonModule,
//     MatToolbarModule,
//   ],
//   templateUrl: './templates-list.component.html',
//   styleUrls: ['./templates-list.component.css']
// })
// export class TemplatesListComponent implements OnInit {
//   categories: any[] = [];
//   selectedCategory!: Category
//   templates: Template[] = [];

//   constructor(
//     private categoryService: CategoryService,
//     private templateService: TemplatesService
//   ) {}

//   ngOnInit(): void {
//     this.loadCategories();
//   }

//   loadCategories() {
//     this.categoryService.getCategories().subscribe({
//       next: (data) => {
//         this.categories = data,
//         console.log("categories: in loadCategories template-list");
        
//         console.log(data);
        
//       },
//       error: (err) => console.error('שגיאה בטעינת קטגוריות:', err)
//     });
//   }

//   loadTemplates() {
//     console.log("in loadTemplates template-list");
//     console.log(this.selectedCategory);
    
//     if (!this.selectedCategory) return;

//     this.templateService.getTemplatesByCategory(this.selectedCategory.id).subscribe({
//       next: (data) =>{
//         this.templates = data,
//         this.templates.forEach(async template => {
//           template.imageUrl = await this.templateService.getDownloadURL(template.name);
//         });
//         console.log(data);
        
        
//       },
//       error: (err) => console.error('שגיאה בטעינת תבניות:', err)
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Template } from '../../models/template';
import { CategoryService } from '../../services/categories/category.service';
import { TemplatesService } from '../../services/templates/templates.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import Category from '../../models/Category';

@Component({
  selector: 'app-template-list',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})
export class TemplatesListComponent implements OnInit {
  categories: any[] = [];
  selectedCategory!: Category;
  templates: Template[] = [];
  previewTemplate: Template | null = null;
  isPreviewOpen = false;
new: any;

  constructor(
    private categoryService: CategoryService,
    private templateService: TemplatesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log("categories: in loadCategories template-list");
        console.log(data);
      },
      error: (err) => console.error('שגיאה בטעינת קטגוריות:', err)
    });
  }

  loadTemplates() {
    console.log("in loadTemplates template-list");
    console.log(this.selectedCategory);
    
    if (!this.selectedCategory) return;

    this.templateService.getTemplatesByCategory(this.selectedCategory.id).subscribe({
      next: (data) => {
        this.templates = data;
        this.templates.forEach(async template => {
          template.imageUrl = await this.templateService.getDownloadURL(template.name);
        });
        console.log(data);
      },
      error: (err) => console.error('שגיאה בטעינת תבניות:', err)
    });
  }

  /**
   * פתיחת תצוגה מקדימה של התבנית
   */
  viewTemplate(template: Template) {
    this.previewTemplate = template;
    
    // כאן אפשר להשתמש ב-MatDialog לפתיחת חלון מודאלי עם תצוגה מקדימה
    // לדוגמה:
    // const dialogRef = this.dialog.open(TemplatePreviewComponent, {
    //   width: '80%',
    //   data: { template: template }
    // });
    
    // במקום זה, נציג הודעה פשוטה
    this.snackBar.open(`צפייה בתבנית: ${template.name}`, 'סגור', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  /**
   * בחירת תבנית לשימוש
   */
  useTemplate(template: Template) {
    // כאן תוכל להוסיף את הלוגיקה לשימוש בתבנית
    // לדוגמה: ניווט לעמוד עריכה עם התבנית הנבחרת
    
    this.snackBar.open(`נבחרה תבנית: ${template.name}`, 'סגור', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    
    // דוגמה לקריאה לשירות
    // this.templateService.selectTemplate(template.id).subscribe({
    //   next: (response) => {
    //     // טיפול בתגובה מוצלחת
    //   },
    //   error: (err) => console.error('שגיאה בבחירת תבנית:', err)
    // });
  }
}