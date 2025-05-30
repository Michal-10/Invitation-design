import { Component } from '@angular/core';
import { MarketingService } from '../../services/marketing/marketing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marketing-email',
  standalone: true,
  imports: [FormsModule, QuillModule, ReactiveFormsModule, CommonModule],
  templateUrl: './marketing-email.component.html',
  styleUrl: './marketing-email.component.css'
})
export class MarketingEmailComponent {
  emailList: string[] = [];
  emailContent: string = '';
  statusMessage: string = '';
  showAll: boolean = false;
  quillEditor: any;

  constructor(private marketingService: MarketingService, private sanitizer: DomSanitizer) { }

  editorCreated(quill: any): void {
    this.quillEditor = quill;
  }

  contentChanged(event: any): void {
    this.emailContent = event.html;
  }

  generateMarketingText(): void {

    this.statusMessage = 'מייצר תוכן שיווקי...';
    this.marketingService.generateMarketingText().subscribe({
      next: (res) => {

        this.emailContent = res.text;
        this.statusMessage = 'נוצר תוכן שיווקי!';
        
        if (this.quillEditor) {
          this.quillEditor.root.innerHTML = res.text;
        }
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
        this.statusMessage = res.message || 'המיילים נשלחו בהצלחה!';
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
    return this.sanitizer.bypassSecurityTrustHtml(this.emailContent || '<p>אין תוכן להצגה</p>');
  }
}