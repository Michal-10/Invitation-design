// import { HttpClient } from '@angular/common/http';
// import { Component, NgModule, OnInit } from '@angular/core';
// import { MarketingService } from '../../services/marketing/marketing.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { QuillModule } from 'ngx-quill';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// @Component({
//   selector: 'app-marketing-email',
//   imports: [FormsModule, QuillModule, ReactiveFormsModule],
//   templateUrl: './marketing-email.component.html',
//   styleUrl: './marketing-email.component.css'
// })
// export class MarketingEmailComponent {

//   emailList: string[] = [];
//   emailContent: string = '';
//   statusMessage: string = '';
//   showAll: boolean = false;

//   constructor(private marketingService: MarketingService, private  sanitizer: DomSanitizer) { }
 
//   generateMarketingText(): void {
//     console.log("Generating marketing text...");

//     this.statusMessage = 'מייצר תוכן שיווקי...';
//     this.marketingService.generateMarketingText().subscribe({
//       next: (res) => {
//         console.log("after generating marketing text:", res);
        
//         this.emailContent = res.text;

//         // this.emailContent = res.textHTML; // Assign the HTML content directly
//         this.statusMessage = 'נוצר תוכן שיווקי!';
//       },
//       error: () => {
//         this.statusMessage = 'שגיאה ביצירת תוכן.';
//       }
//     });
//   }

//   sendEmails(): void {
//     if (!this.emailContent.trim()) {
//       this.statusMessage = 'אין תוכן לשליחה.';
//       return;
//     }

//     // const payload = {
//     //   // listUsers: this.emailList,
//     //   content: this.emailContent
//     // };

//     this.statusMessage = 'שולח מיילים...';

//     this.marketingService.sendMarketingEmail(this.emailContent).subscribe({
//       next: (res) => {
//         this.statusMessage = res.message;
//       },
//       error: (err) => {
//         console.error(err);
//         this.statusMessage = 'אירעה שגיאה בשליחת המיילים.';
//       }
//     });
//   }

//   getVisibleEmails(): string[] {
//     return this.showAll ? this.emailList : this.emailList.slice(0, 10);
//   }

//   getSanitizedContent(): SafeHtml {
//     return this.sanitizer.bypassSecurityTrustHtml(this.emailContent);
//   }
// }


import { Component } from '@angular/core';
import { MarketingService } from '../../services/marketing/marketing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillEditorComponent } from 'ngx-quill'; // ייבוא הקומפוננטה של העורך

@Component({
  selector: 'app-marketing-email',
  imports: [FormsModule, QuillModule, ReactiveFormsModule],
  templateUrl: './marketing-email.component.html',
  styleUrl: './marketing-email.component.css'
})
export class MarketingEmailComponent {

  emailList: string[] = [];
  emailContent: string = '';
  statusMessage: string = '';
  showAll: boolean = false;
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults and values from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  quillEditor: QuillEditorComponent | undefined;

  constructor(private marketingService: MarketingService, private sanitizer: DomSanitizer) { }

  editorCreated(quill: any): void {
    this.quillEditor = quill;
  }

  contentChanged(event: any): void {
    this.emailContent = event.html; // או event.text אם אתה רוצה רק טקסט
  }

  generateMarketingText(): void {
    console.log("Generating marketing text...");

    this.statusMessage = 'מייצר תוכן שיווקי...';
    this.marketingService.generateMarketingText().subscribe({
      next: (res) => {
        console.log("after generating marketing text:", res);

        this.emailContent = res.text; // או res.textHTML אם ה-API מחזיר HTML
        this.statusMessage = 'נוצר תוכן שיווקי!';
      },
      error: () => {
        this.statusMessage = 'שגיאה ביצירת תוכן.';
      }
    });
  }

  sendEmails(): void {
    if (!this.emailContent.trim()) {
      this.statusMessage = 'אין תוכן לשליחה.';
      return;
    }

    this.statusMessage = 'שולח מיילים...';

    this.marketingService.sendMarketingEmail(this.emailContent).subscribe({
      next: (res) => {
        this.statusMessage = res.message;
      },
      error: (err) => {
        console.error(err);
        this.statusMessage = 'אירעה שגיאה בשליחת המיילים.';
      }
    });
  }

  getVisibleEmails(): string[] {
    return this.showAll ? this.emailList : this.emailList.slice(0, 10);
  }

  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.emailContent);
  }
}