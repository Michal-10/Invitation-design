// // // // import { Component } from '@angular/core';

// // // // @Component({
// // // //   selector: 'app-templates',
// // // //   imports: [],
// // // //   templateUrl: './templates.component.html',
// // // //   styleUrl: './templates.component.css'
// // // // })
// // // // export class TemplatesComponent {

// // // // }
















// // // import { Component, OnInit } from '@angular/core';
// // // import { TemplatesService } from '../../services/templates/templates.service';
// // // import { CategoryService } from '../../services/categories/category.service';
// // // import { MatCardModule } from '@angular/material/card';
// // // import { MatInputModule } from '@angular/material/input';
// // // import { FormsModule } from '@angular/forms';
// // // import { MatSelectModule } from '@angular/material/select';

// // // @Component({
// // //   selector: 'app-templates',
// // //   imports: [
// // //     MatCardModule,
// // //     MatInputModule,
// // //     FormsModule,
// // //     MatSelectModule,
// // //     MatInputModule,
// // //   ],
// // //   templateUrl: './templates.component.html',
// // //   styleUrls: ['./templates.component.css']
// // // })
// // // export class TemplatesComponent implements OnInit {
// // //   templateName = '';
// // //   selectedCategory! : number;
// // //   selectedFile?: File;

// // //   categories: any[] = [];
// // //   newCategoryName = '';

// // //   constructor(
// // //     private templateService: TemplatesService,
// // //     private categoryService: CategoryService
// // //   ) {}

// // //   ngOnInit(): void {
// // //     this.loadCategories();
// // //   }
// // //   /*
  
// // //         public string Name { get; set; }
// // //         public string Description { get; set; }
// // //         public string ImageUrl { get; set; }
// // //         public int CategoryId { get; set; }
// // //   */

// // //   loadCategories() {
// // //     this.categoryService.getCategories().subscribe({
// // //       next: (data) => this.categories = data,
// // //       error: (err) => console.error('שגיאה בטעינת קטגוריות:', err)
// // //     });
// // //   }

// // //   onFileSelected(event: any) {
// // //     this.selectedFile = event.target.files[0];
// // //   }

// // //   uploadTemplate() {
// // //     if (!this.templateName || !this.selectedCategory || !this.selectedFile) {
// // //       alert('יש למלא את כל השדות');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('templateName', this.templateName);
// // //     formData.append('category', this.selectedCategory.toString());
// // //     formData.append('file', this.selectedFile);

// // //     this.templateService.uploadTemplate(formData).subscribe({
// // //       next: (res) => {
// // //         alert('התבנית הועלתה בהצלחה!');
// // //         formData.append('imageUrl', res); // res זה כבר ה־URL מה-AWS
// // //       },
// // //       error: (err) => alert('שגיאה בהעלאה: ' + err.error)
// // //     });
// // //   //התבנית הועלתה ל AWS בהצלחה 
// // //   //אך עדיין לא לDB כי עדיין אין את המיקומים
// // //   }













// // //   addCategory() {
// // //     if (!this.newCategoryName) {
// // //       alert('הזן שם קטגוריה');
// // //       return;
// // //     }
// // //     //כשמוסיפים קטגוריה צריך להוסיף גם את כל השדות שצריכות להיות בה 

// // //     this.categoryService.addCategory({ name: this.newCategoryName }).subscribe({
// // //       next: () => {
// // //         this.newCategoryName = '';
// // //         this.loadCategories();
// // //         alert('קטגוריה נוספה בהצלחה');
// // //       },
// // //       error: (err) => alert('שגיאה בהוספת קטגוריה: ' + err.error)
// // //     });
// // //   }
// // // }










// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { CategoryService } from '../../services/categories/category.service';
// // import { TemplatesService } from '../../services/templates/templates.service';

// // @Component({
// //   selector: 'app-templates',
// //   imports: [ReactiveFormsModule], // Add necessary imports here
// //   templateUrl: './templates.component.html', // Ensure this file exists
// // })
// // export class TemplatesComponent implements OnInit {
// //   templateForm: FormGroup;
// //   categories: any[] = [];
// //   imageUrl: string = '';

// //   constructor(
// //     private fb: FormBuilder,
// //     private templateService: TemplatesService,
// //     private categoryService: CategoryService
// //   ) {
// //     this.templateForm = this.fb.group({
// //       name: ['', Validators.required],
// //       description: ['', Validators.required],
// //       categoryId: [null, Validators.required],
// //       imageUrl: ['', Validators.required],
// //     });
// //   }

// //   ngOnInit(): void {
// //     this.categoryService.getCategories().subscribe((data) => {
// //       this.categories = data;
// //     });
// //   }

// //   submit(): void {
// //     if (this.templateForm.valid) {
// //       this.templateService.createTemplate(this.templateForm.value).subscribe((res) => {
// //         alert('Template created!');
// //         localStorage.setItem('templateId', res.id); // Save template ID for later use
// //       });
// //     }
// //   }
// // }






// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CategoryService } from '../../services/categories/category.service';
// import { TemplatesService } from '../../services/templates/templates.service';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { Router, RouterModule } from '@angular/router';
// import { MatIcon } from '@angular/material/icon';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// @Component({
//   selector: 'app-templates',
//   imports:[
//     ReactiveFormsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//   ],
//   templateUrl: './templates.component.html',
//   styleUrls: ['./templates.component.css']
// })
// export class TemplatesComponent implements OnInit {
//   templateForm: FormGroup;
//   isUploading: boolean = false;
//   categories: any[] = [];
//   selectedFile!: File;

//   constructor(
//     private fb: FormBuilder,
//     private templateService: TemplatesService,
//     private categoryService: CategoryService,
//     private router: Router // הוספה

//   ) {
//     this.templateForm = this.fb.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       categoryId: [null, Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.categoryService.getCategories().subscribe((data) => {
//       console.log("in ngOnInit template component");
//       console.log("categories: ");
      
//       console.log(data);
//       this.categories = data;
//     });
//   }

//   onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0];
//   }

//   async submit(): Promise<void> {
//     this.isUploading = true; // Set the uploading state to true
//     console.log("in submit function in template component");
//     console.log("this.selectedFile: before rename" );
    
//     if (this.templateForm.invalid || !this.selectedFile) {
//       alert('יש למלא את כל השדות כולל קובץ');
//       return;
//     }

//     try {
//       const timestamp = new Date().getTime();
//       const originalFile = this.selectedFile!;
//       const extension = originalFile.name.split('.').pop(); // סיומת הקובץ
//       const newFileName = originalFile.name.split('.')[0] + '_' + timestamp + '.' + extension;
      
//       // יצירת קובץ חדש עם שם חדש
//       const renamedFile = new File([originalFile], newFileName, {
//         type: originalFile.type,
//       });
      
//       // שמירת הקובץ החדש במקום הישן
//       this.selectedFile = renamedFile;
//       console.log("this.selectedFile: after rename" );
//       console.log(this.selectedFile);
      
      
//       // this.selectedFile.name = this.selectedFile.name + new Date().getTime() +'.png'; // עדכון שם הקובץ שנשמר ב-AWS
//       console.log("in submit function in template component");
//       const presignedUrl = await this.templateService.uploadFileToAWS(this.selectedFile);
//       console.log('presignedUrl', presignedUrl);
      
//       await this.templateService.uploadToS3(this.selectedFile, presignedUrl);

//       const templateData = {
//         ...this.templateForm.value,
//         name:this.selectedFile.name,
//         imageUrl: presignedUrl, // שמירת ה-URL ללא הפרמטרים
//       };

//       console.log("templateData: ");
//       console.log(templateData);
        
//       sessionStorage.setItem('categoryId', this.templateForm.value.categoryId);
//       console.log("categoryId: **************" + this.templateForm.value.categoryId);
      
//       this.templateService.createTemplate(templateData).subscribe(async (res) => {
//         alert('התבנית נשמרה בהצלחה!');
//         console.log("in template component in createTemplate subscribe");
//         console.log("templateData: " + templateData);
//         console.log("res: ");
//         console.log(res);
//         sessionStorage.setItem('template',JSON.stringify(res));
        
//         const updatedFileName = res.name; // עדכון שם הקובץ שנשמר ב-AWS
      
//         const presignedUrl = await this.templateService.uploadFileToAWS(this.selectedFile);
//         console.log('presignedUrl', presignedUrl);
        
//         await this.templateService.uploadToS3(this.selectedFile, presignedUrl);

// this.isUploading = false; // Set the uploading state to false after the upload is complete
//         // sessionStorage.setItem('templateId', res.id);
//         this.router.navigate(['/positions', res.id]);
//       });
//     } catch (err) {
//       if ((err as any).status === 401) {
//         alert('שגיאה בהעלאה: משתמש לא מחובר למערכת');
//         return;
//       }
//       alert('שגיאה בהעלאה: ' + err);
//     }
//   }
// }




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
      console.log("in ngOnInit template component");
      console.log("categories: ");
      
      console.log(data);
      this.categories = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async submit(): Promise<void> {
    this.isUploading = true; // Set the uploading state to true
    console.log("in submit function in template component");
    console.log("this.selectedFile: before rename" );
    
    if (this.templateForm.invalid || !this.selectedFile) {
      alert('יש למלא את כל השדות כולל קובץ');
      this.isUploading = false;
      return;
    }

    try {
      const timestamp = new Date().getTime();
      const originalFile = this.selectedFile!;
      const extension = originalFile.name.split('.').pop(); // סיומת הקובץ
      const newFileName = originalFile.name.split('.')[0] + '_' + timestamp + '.' + extension;
      
      // יצירת קובץ חדש עם שם חדש
      const renamedFile = new File([originalFile], newFileName, {
        type: originalFile.type,
      });
      
      // שמירת הקובץ החדש במקום הישן
      this.selectedFile = renamedFile;
      console.log("this.selectedFile: after rename" );
      console.log(this.selectedFile);
      
      
      // this.selectedFile.name = this.selectedFile.name + new Date().getTime() +'.png'; // עדכון שם הקובץ שנשמר ב-AWS
      console.log("in submit function in template component");
      const presignedUrl = await this.templateService.uploadFileToAWS(this.selectedFile);
      console.log('presignedUrl', presignedUrl);
      
      await this.templateService.uploadToS3(this.selectedFile, presignedUrl);

      const templateData = {
        ...this.templateForm.value,
        name:this.selectedFile.name,
        imageUrl: presignedUrl, // שמירת ה-URL ללא הפרמטרים
      };

      console.log("templateData: ");
      console.log(templateData);
        
      sessionStorage.setItem('categoryId', this.templateForm.value.categoryId);
      console.log("categoryId: **************" + this.templateForm.value.categoryId);
      
      this.templateService.createTemplate(templateData).subscribe(async (res) => {
        alert('התבנית נשמרה בהצלחה!');
        console.log("in template component in createTemplate subscribe");
        console.log("templateData: " + templateData);
        console.log("res: ");
        console.log(res);
        sessionStorage.setItem('template',JSON.stringify(res));
        
        const updatedFileName = res.name; // עדכון שם הקובץ שנשמר ב-AWS
      
        const presignedUrl = await this.templateService.uploadFileToAWS(this.selectedFile);
        console.log('presignedUrl', presignedUrl);
        
        await this.templateService.uploadToS3(this.selectedFile, presignedUrl);

        this.isUploading = false; // Set the uploading state to false after the upload is complete
        // sessionStorage.setItem('templateId', res.id);
        this.router.navigate(['/positions', res.id]);
      }, error => {
        console.error('Error creating template:', error);
        this.isUploading = false;
        alert('שגיאה בשמירת התבנית');
      });
    } catch (err) {
      this.isUploading = false;
      if ((err as any).status === 401) {
        alert('שגיאה בהעלאה: משתמש לא מחובר למערכת');
        return;
      }
      alert('שגיאה בהעלאה: ' + err);
    }
  }
}





