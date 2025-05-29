import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CategoryFieldService } from '../../services/category-field/category-field.service';
import { TemplateFieldService } from '../../services/template-field/template-field.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../models/template';
import { TemplatesService } from '../../services/templates/templates.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-field-placement',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './field-positioner.component.html',
  styleUrls: ['./field-positioner.component.css']
})
export class FieldPlacementComponent implements OnInit {
  fields: any[] = [];
  templateId: number = 0;
  template!: Template;
  templateImageUrl!: string;
  positions: { [key: number]: { x: number, y: number, templateFieldId?: number } } = {};
  draggingField: any = null;
  dragOffset = { x: 0, y: 0 };
  unsavedChanges: boolean = false;
  isPlacingFields: boolean = false;


  @ViewChild('templateImage') templateImageRef!: ElementRef;
  @ViewChild('imageContainer') imageContainerRef!: ElementRef;

  constructor(
    private templatesService: TemplatesService,
    private templateFieldService: TemplateFieldService,
    private categoryFieldService: CategoryFieldService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const templateData = sessionStorage.getItem('template');
    this.template = templateData ? JSON.parse(templateData) : {} as Template;
    this.templateId = Number(this.route.snapshot.paramMap.get('id')) || Number(sessionStorage.getItem('templateId'));

    this.loadFieldsFromCategory();
    this.loadTemplateImage();
  }

  loadFieldsFromCategory(): void {
    this.isPlacingFields = true;
    const categoryId = Number(sessionStorage.getItem('categoryId'));
    if (categoryId >= 0) {
      this.categoryFieldService.getFieldsByCategory(categoryId).pipe(finalize(() => this.isPlacingFields = false)) 
      .subscribe({
        next: (res) => {
          this.fields = res;
          console.log('Fields loaded:', this.fields);
        },
        error: (err) => {
          Swal.fire({
            title: 'שגיאה',
            text: 'לא ניתן לטעון את השדות מהקטגוריה',
            icon: 'error',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#5c6bc0'
          });
          console.error('Error loading fields from category:', err);
        }
      });
    }
  }

  loadTemplateImage(): void {
    if (!this.template.name) {
      Swal.fire({
        title: 'שגיאה',
        text: 'לא נמצאו פרטי תבנית',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
      return;
    }

    this.templatesService.getDownloadURL(this.template.name).then(res => {
      this.templateImageUrl = res;
    }).catch(err => {
      Swal.fire({
        title: 'שגיאה',
        text: 'לא ניתן לטעון את תמונת התבנית',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
      console.error('Error loading template image URL:', err);
    });
  }

  // זו הפונקציה שנקראת כאשר התמונה סיימה להיטען ב-DOM
  onTemplateImageLoad(): void {
    console.log('Template image has finished loading in the DOM. Proceeding to place fields.');
      this.addFieldsOnTEmplates();
  }

  async addFieldsOnTEmplates(): Promise<void> {
    const categoryId = Number(sessionStorage.getItem('categoryId'));
    if (categoryId < 0) {
      console.warn('No category ID found to place fields.');
      return;
    }

    if (this.fields.length === 0) {
      console.warn('Fields array is empty. Cannot place fields.');
      return;
    }

    if (!this.templateImageRef || !this.templateImageRef.nativeElement) {
      console.error("Error: templateImageRef.nativeElement is undefined. Cannot calculate positions for initial placement.");
      Swal.fire({
        title: 'שגיאה במיקום',
        text: 'אירעה שגיאה בטעינת התמונה. ייתכן ששדות לא ימוקמו אוטומטית. נסה לרענן את הדף.',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
      return;
    }

    try {
      const imgElement = this.templateImageRef.nativeElement;
      const imgRect = imgElement.getBoundingClientRect();//get the size of image
      let currentY = 50; 
      const startX = imgRect.width / 2;
      const lineHeight = 30; 

      for (const field of this.fields) {
        if (!this.positions[field.field.id]) {
          const payload = {
            fieldId: field.field.id,
            templateId: this.templateId,
            x: Math.round(startX),
            y: Math.round(currentY)
          };

          try {
            console.log(`Placing new field: ${field.field.name} at (${payload.x}, ${payload.y}) relative to image.`);
            const response = await this.templateFieldService.addFieldToTemplate(payload).toPromise();
            this.positions[field.field.id] = {
              x: response.x,
              y: response.y,
              templateFieldId: response.id
            };
            this.unsavedChanges = true;
          } catch (err) {
            console.error(`שגיאה במיקום אוטומטי ובשמירת השדה ${field.field.name}:`, err);
          }
          currentY += lineHeight;
        }
      }
      console.log('All fields placed or loaded. Final positions:', this.positions);

    } catch (err) {
      Swal.fire({
        title: 'שגיאה',
        text: 'לא ניתן לטעון או למקם את השדות באופן אוטומטי.',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
      console.error('Error in addFieldsOnTEmplates:', err);
    }
  }

  getFieldPosition(fieldId: number): { top: string, left: string } | null {
    const pos = this.positions[fieldId];
    if (!pos || !this.templateImageRef || !this.templateImageRef.nativeElement || !this.imageContainerRef || !this.imageContainerRef.nativeElement) {
      return null;
    }

    const imgElement = this.templateImageRef.nativeElement;
    const imgRect = imgElement.getBoundingClientRect();
    const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();

    const imageOffsetX = imgRect.left - containerRect.left;
    const imageOffsetY = imgRect.top - containerRect.top;

    const finalX = pos.x + imageOffsetX;
    const finalY = pos.y + imageOffsetY;

    return { top: `${finalY}px`, left: `${finalX}px` };
  }

  startDrag(event: MouseEvent, field: any): void {
    event.stopPropagation();
    this.draggingField = field;

    const element = event.target as HTMLElement;
    const fieldLabel = element.closest('.field-label') as HTMLElement;

    if (fieldLabel) {
      this.dragOffset.x = event.clientX - fieldLabel.getBoundingClientRect().left;
      this.dragOffset.y = event.clientY - fieldLabel.getBoundingClientRect().top;

      fieldLabel.style.cursor = 'grabbing';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent): void {
    if (!this.draggingField || !this.templateImageRef || !this.templateImageRef.nativeElement || !this.imageContainerRef || !this.imageContainerRef.nativeElement) return;

    const imgElement = this.templateImageRef.nativeElement;
    const imgRect = imgElement.getBoundingClientRect();
    const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();

    const imageOffsetX = imgRect.left - containerRect.left;
    const imageOffsetY = imgRect.top - containerRect.top;

    let newXInContainer = event.clientX - containerRect.left - this.dragOffset.x;
    let newYInContainer = event.clientY - containerRect.top - this.dragOffset.y;

    const fieldId = this.draggingField.field.id;
    const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;

    if (element) {
      const fieldWidth = element.offsetWidth;
      const fieldHeight = element.offsetHeight;

      let xRelativeToImage = newXInContainer - imageOffsetX;
      let yRelativeToImage = newYInContainer - imageOffsetY;

      xRelativeToImage = Math.max(0, Math.min(xRelativeToImage, imgRect.width - fieldWidth));
      yRelativeToImage = Math.max(0, Math.min(yRelativeToImage, imgRect.height - fieldHeight));

      element.style.left = `${xRelativeToImage + imageOffsetX}px`;
      element.style.top = `${yRelativeToImage + imageOffsetY}px`;
    }
  }

  @HostListener('document:mouseup')
  stopDrag(): void {
    if (!this.draggingField || !this.templateImageRef || !this.templateImageRef.nativeElement || !this.imageContainerRef || !this.imageContainerRef.nativeElement) return;

    const fieldId = this.draggingField.field.id;
    const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;

    if (element) {
      element.style.cursor = 'grab';

      const imgElement = this.templateImageRef.nativeElement;
      const imgRect = imgElement.getBoundingClientRect();
      const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();

      const imageOffsetX = imgRect.left - containerRect.left;
      const imageOffsetY = imgRect.top - containerRect.top;

      const finalXInContainer = parseFloat(element.style.left || '0');
      const finalYInContainer = parseFloat(element.style.top || '0');

      const xToSave = finalXInContainer - imageOffsetX;
      const yToSave = finalYInContainer - imageOffsetY;

      const templateFieldId = this.positions[fieldId]?.templateFieldId;
      if (templateFieldId) {
        this.updateFieldPosition(templateFieldId, xToSave, yToSave);
      }
    }
    this.draggingField = null;
  }

  updateFieldPosition(templateFieldId: number, x: number, y: number): void {
    const payload = {
      templateId: this.templateId,
      fieldId: this.draggingField.field.id, 
      x: Math.round(x),
      y: Math.round(y)
    };

    this.templateFieldService.updateTemplateFieldPosition(templateFieldId, payload).subscribe({
      next: () => {
        console.log('Position updated:', payload);
        const fieldId = this.draggingField.field.id;
        this.positions[fieldId] = {
          x: Math.round(x),
          y: Math.round(y),
          templateFieldId
        };
        this.unsavedChanges = true;
        this.draggingField = null;

      },
      error: (err) => {
        console.error('שגיאה בעדכון מיקום:', err);
        Swal.fire({
          title: 'שגיאה',
          text: 'לא ניתן לעדכן את מיקום השדה',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });

        const fieldId = this.draggingField.field.id;
        const oldPos = this.positions[fieldId];
        if (oldPos) {
          const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;
          if (element) {
            const imgElement = this.templateImageRef.nativeElement;
            const imgRect = imgElement.getBoundingClientRect();
            const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
            const imageOffsetX = imgRect.left - containerRect.left;
            const imageOffsetY = imgRect.top - containerRect.top;

            element.style.left = `${oldPos.x + imageOffsetX}px`;
            element.style.top = `${oldPos.y + imageOffsetY}px`;
          }
        }
        this.draggingField = null; 
      }
    });
  }

  isFieldPlaced(fieldId: number): boolean {
    return !!this.positions[fieldId];
  }

  saveTemplate(){
    Swal.fire({
      title: 'שמירת מיקומים',
      text: 'האם אתה בטוח שברצונך לשמור את כל המיקומים?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#5c6bc0',
      cancelButtonColor: '#757575',
      confirmButtonText: 'שמור',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'נשמר בהצלחה!',
          text: 'כל המיקומים נשמרו בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.unsavedChanges = false;
          this.router.navigate(['/']); // ✅ הניווט מתבצע רק אחרי סיום ההודעה
        });
      }
    });
    
  }
}