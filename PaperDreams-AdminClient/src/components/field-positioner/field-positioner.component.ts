// // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // import { CategoryFieldService } from '../../services/category-field/category-field.service';
// // // // // // import { TemplateFieldService } from '../../services/template-field/template-field.service';

// // // // // // @Component({
// // // // // //   selector: 'app-field-placement',
// // // // // //   templateUrl: './field-positioner.component.html', // Updated to match the correct file name
// // // // // // })
// // // // // // export class FieldPlacementComponent implements OnInit {
// // // // // //   fields: any[] = [];
// // // // // //   templateId: number = 0;

// // // // // //   constructor(
// // // // // //     private templateFieldService: TemplateFieldService,
// // // // // //     private categoryFieldService: CategoryFieldService
// // // // // //   ) {}

// // // // // //   ngOnInit(): void {
// // // // // //     const categoryId = Number(localStorage.getItem('categoryId'));
// // // // // //     this.templateId = Number(localStorage.getItem('templateId'));

// // // // // //     if (categoryId) {
// // // // // //       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe((res) => {
// // // // // //         this.fields = res;
// // // // // //       });
// // // // // //     }
// // // // // //   }

// // // // // //   savePosition(fieldId: number, x: number, y: number): void {
// // // // // //     const payload = {
// // // // // //       fieldId,
// // // // // //       templateId: this.templateId,
// // // // // //       x,
// // // // // //       y,
// // // // // //     };

// // // // // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(() => {
// // // // // //       alert('Field saved!');
// // // // // //     });
// // // // // //   }
// // // // // // }














// // // // import { Component, OnInit, HostListener } from '@angular/core';
// // // // import { CategoryFieldService } from '../../services/category-field/category-field.service';
// // // // import { TemplateFieldService } from '../../services/template-field/template-field.service';
// // // // import { ActivatedRoute } from '@angular/router';
// // // // import { Template } from '../../models/template';
// // // // import { TemplatesService } from '../../services/templates/templates.service';

// // // // @Component({
// // // //   selector: 'app-field-placement',
// // // //   templateUrl: './field-positioner.component.html',
// // // //   styleUrls: ['./field-positioner.component.css']
// // // // })
// // // // export class FieldPlacementComponent implements OnInit {
// // // //   fields: any[] = [];
// // // //   templateId: number = 0;
// // // //   selectedField: any = null;
// // // //   template!:Template;
// // // //   templateImageUrl!:string;
// // // //   positions: { [key: number]: { x: number, y: number } } = {};

// // // //   constructor(
// // // //     private templatesService:TemplatesService,
// // // //     private templateFieldService: TemplateFieldService,
// // // //     private categoryFieldService: CategoryFieldService,
// // // //     private route: ActivatedRoute
// // // //   ) {}

// // // //   ngOnInit(): void {
// // // //     // this.templateImageUrl = sessionStorage.getItem('templateImageUrl') || '';
// // // //     console.log("ngonInit templateImageUrl: ");
// // // //     // console.log("this.templateImageUrl: ");
// // // //     // console.log(this.templateImageUrl);
// // // //     // console.log("this.templateImageUrl: ");
    
// // // //     const templateData = sessionStorage.getItem('template');

// // // //     console.log("templateData: ");
// // // //     console.log(templateData);
// // // //     console.log("this.template: ");
// // // //     this.template = templateData ? JSON.parse(templateData) as Template : {} as Template;
// // // //     console.log(this.template);
    
// // // //     console.log(this.template.imageUrl);
// // // //     this.templatesService.getDownloadURL(this.template.name).then((res)=>{
// // // //       console.log("in getDownloadURL: in field-positioner.component.ts");
// // // //       console.log("//////////////////////////");
      
// // // //       console.log(res);
      
// // // //       this.templateImageUrl = res; 
// // // //       console.log("this.templateImageUrl: ");
// // // //       console.log(this.templateImageUrl);
       
// // // //     });

// // // //     // this.templateImageUrl = this.templatesService.getDownloadURL(this.template.Name)
// // // //     //   console.log("this.templateImageUrl: ");
// // // //     //   console.log(this.templateImageUrl);

// // // //     console.log("this.templateImageUrl: ");
// // // //     console.log(this.templateImageUrl);

// // // //     this.templateId = Number(this.route.snapshot.paramMap.get('id'));
// // // //     console.log("this.templateId: ");
// // // //     console.log(this.templateId);
    
// // // //     const categoryId = Number(sessionStorage.getItem('categoryId'));
// // // //     console.log("categoryId: ");
// // // //     console.log(categoryId);
// // // //     // this.templateId = Number(sessionStorage.getItem('templateId'));
// // // // console.log("---------------------------------------------------");

// // // //     if (categoryId>=0) {
// // // //       console.log("before getFieldsByCategory categoryId: ");
// // // //       console.log(categoryId);
      
// // // //       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe((res) => {
// // // //         console.log("in subscribe getFieldsByCategory categoryId: ");
// // // //        console.log(res);
// // // //        (res);
// // // //         this.fields = res;
// // // //       });
// // // //     }
// // // //     console.log("this.fields: ");
// // // //     console.log(this.fields);
    
// // // //   }

// // // //   onImageClick(event: MouseEvent): void {
// // // //     if (!this.selectedField) return;

// // // //     const rect = (event.target as HTMLElement).getBoundingClientRect();
// // // //     const x = event.clientX - rect.left;
// // // //     const y = event.clientY - rect.top;

// // // //     this.positions[this.selectedField.id] = { x, y };

// // // //     const payload = {
// // // //       fieldId: this.selectedField.id,
// // // //       templateId: this.templateId,
// // // //       x,
// // // //       y
// // // //     };

// // // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(() => {
// // // //       alert(`השדה "${this.selectedField.name}" נשמר במיקום (${x}, ${y})`);
// // // //     });

// // // //     this.selectedField = null;
// // // //   }

// // // //   selectField(field: any) {
// // // //     this.selectedField = field;
// // // //   }
// // // // }










// // // import { Component, OnInit, HostListener } from '@angular/core';
// // // import { CategoryFieldService } from '../../services/category-field/category-field.service';
// // // import { TemplateFieldService } from '../../services/template-field/template-field.service';
// // // import { ActivatedRoute } from '@angular/router';
// // // import { Template } from '../../models/template';
// // // import { TemplatesService } from '../../services/templates/templates.service';

// // // @Component({
// // //   selector: 'app-field-placement',
// // //   templateUrl: './field-positioner.component.html',
// // //   styleUrls: ['./field-positioner.component.css']
// // // })
// // // export class FieldPlacementComponent implements OnInit {
// // //   fields: any[] = [];
// // //   templateId: number = 0;
// // //   selectedField: any = null;
// // //   template!: Template;
// // //   templateImageUrl!: string;
// // //   positions: { [key: number]: { x: number, y: number } } = {};
// // //   showPrompt: boolean = false;

// // //   constructor(
// // //     private templatesService: TemplatesService,
// // //     private templateFieldService: TemplateFieldService,
// // //     private categoryFieldService: CategoryFieldService,
// // //     private route: ActivatedRoute
// // //   ) {}

// // //   ngOnInit(): void {
// // //     const templateData = sessionStorage.getItem('template');
// // //     console.log("templateData: ");
// // //     console.log(templateData);
    
// // //     this.template = templateData ? JSON.parse(templateData) as Template : {} as Template;
// // //     console.log("this.template: ");
// // //     console.log(this.template);
    
// // //     this.templatesService.getDownloadURL(this.template.name).then((res) => {
// // //       console.log("in getDownloadURL: in field-positioner.component.ts");
// // //       console.log(res);
// // //       this.templateImageUrl = res; 
// // //       console.log("this.templateImageUrl: ");
// // //       console.log(this.templateImageUrl);
// // //     });

// // //     this.templateId = Number(this.route.snapshot.paramMap.get('id'));
// // //     console.log("this.templateId: ");
// // //     console.log(this.templateId);
    
// // //     const categoryId = Number(sessionStorage.getItem('categoryId'));
// // //     console.log("categoryId: ");
// // //     console.log(categoryId);

// // //     if (categoryId >= 0) {
// // //       console.log("before getFieldsByCategory categoryId: ");
// // //       console.log(categoryId);
      
// // //       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe((res) => {
// // //         console.log("in subscribe getFieldsByCategory categoryId: ");
// // //         console.log(res);
// // //         this.fields = res;
        
// // //         // Load existing positions
// // //         this.loadExistingPositions();
// // //       });
// // //     }
// // //   }

// // //   loadExistingPositions(): void {
// // //     // This method can be used to load existing positions from the server if needed
// // //     // For now we'll keep it empty but you can implement it later
// // //   }

// // //   onImageClick(event: MouseEvent): void {
// // //     if (!this.selectedField) return;

// // //     const rect = (event.target as HTMLElement).getBoundingClientRect();
// // //     const x = event.clientX - rect.left;
// // //     const y = event.clientY - rect.top;

// // //     this.positions[this.selectedField.id] = { x, y };

// // //     const payload = {
// // //       fieldId: this.selectedField.id,
// // //       templateId: this.templateId,
// // //       x,
// // //       y
// // //     };

// // //     // Capture field name before resetting selectedField
// // //     const fieldName = this.selectedField.field?.name || this.selectedField.name;

// // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(() => {
// // //       alert(`השדה "${fieldName}" נשמר במיקום (${x}, ${y})`);
// // //     });

// // //     this.selectedField = null;
// // //     this.showPrompt = false;
// // //   }

// // //   selectField(field: any) {
// // //     this.selectedField = field;
// // //     this.showPrompt = true;
// // //   }

// // //   // Helper method to check if a field is selected
// // //   isFieldSelected(field: any): boolean {
// // //     return this.selectedField && this.selectedField.id === field.id;
// // //   }
// // // }



















// // // import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
// // // import { CategoryFieldService } from '../../services/category-field/category-field.service';
// // // import { TemplateFieldService } from '../../services/template-field/template-field.service';
// // // import { ActivatedRoute } from '@angular/router';
// // // import { Template } from '../../models/template';
// // // import { TemplatesService } from '../../services/templates/templates.service';

// // // @Component({
// // //   selector: 'app-field-placement',
// // //   templateUrl: './field-positioner.component.html',
// // //   styleUrls: ['./field-positioner.component.css']
// // // })
// // // export class FieldPlacementComponent implements OnInit {
// // //   fields: any[] = [];
// // //   templateId: number = 0;
// // //   selectedField: any = null;
// // //   template!: Template;
// // //   templateImageUrl!: string;
// // //   positions: { [key: number]: { x: number, y: number } } = {};
// // //   showPrompt: boolean = false;
// // //   @ViewChild('templateImage') templateImageRef!: ElementRef;

// // //   constructor(
// // //     private templatesService: TemplatesService,
// // //     private templateFieldService: TemplateFieldService,
// // //     private categoryFieldService: CategoryFieldService,
// // //     private route: ActivatedRoute
// // //   ) {}

// // //   ngOnInit(): void {
// // //     const templateData = sessionStorage.getItem('template');
// // //     console.log("templateData: ", templateData);
    
// // //     this.template = templateData ? JSON.parse(templateData) as Template : {} as Template;
// // //     console.log("this.template: ", this.template);
    
// // //     // Get template ID from route param
// // //     this.templateId = Number(this.route.snapshot.paramMap.get('id'));
// // //     if (!this.templateId) {
// // //       // Fallback to sessionStorage if route param is not available
// // //       this.templateId = Number(sessionStorage.getItem('templateId'));
// // //     }
// // //     console.log("this.templateId: ", this.templateId);
    
// // //     // Get the template image URL
// // //     this.templatesService.getDownloadURL(this.template.name).then((res) => {
// // //       console.log("Template image URL: ", res);
// // //       this.templateImageUrl = res;
// // //     }).catch(error => {
// // //       console.error("Error loading template image: ", error);
// // //       alert("שגיאה בטעינת תמונת התבנית");
// // //     });
    
// // //     // Get category ID
// // //     const categoryId = Number(sessionStorage.getItem('categoryId'));
// // //     console.log("categoryId: ", categoryId);

// // //     if (categoryId >= 0) {
// // //       // Get fields for this category
// // //       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe(
// // //         (res) => {
// // //           console.log("Fields loaded: ", res);
// // //           this.fields = res;
          
// // //           // Load existing positions
// // //           this.loadExistingPositions();
// // //         },
// // //         (error) => {
// // //           console.error("Error loading fields: ", error);
// // //           alert("שגיאה בטעינת השדות");
// // //         }
// // //       );
// // //     } else {
// // //       console.error("Invalid category ID");
// // //       alert("קטגוריה לא תקינה");
// // //     }
// // //   }

// // //   loadExistingPositions(): void {
// // //     if (!this.templateId) {
// // //       console.error("Cannot load positions - template ID is missing");
// // //       return;
// // //     }
    
// // //     // Load existing field positions for this template
// // //     this.templateFieldService.addFieldToTemplate(this.templateId).subscribe(
// // //       (templateFields) => {
// // //         console.log("Existing template fields loaded: ", templateFields);
        
// // //         if (Array.isArray(templateFields) && templateFields.length > 0) {
// // //           // Map the existing positions to our positions object
// // //           templateFields.forEach(tf => {
// // //             if (tf.fieldId && tf.x !== undefined && tf.y !== undefined) {
// // //               this.positions[tf.fieldId] = { x: tf.x, y: tf.y };
// // //             }
// // //           });
// // //         }
// // //       },
// // //       (error) => {
// // //         console.error("Error loading existing field positions: ", error);
// // //       }
// // //     );
// // //   }

// // //   onImageClick(event: MouseEvent): void {
// // //     if (!this.selectedField) return;

// // //     // Make sure we're getting the position relative to the image
// // //     const rect = (event.target as HTMLElement).getBoundingClientRect();
// // //     const x = event.clientX - rect.left;
// // //     const y = event.clientY - rect.top;

// // //     console.log(`Image clicked at position x:${x}, y:${y}`);
    
// // //     // Update the position in our local state
// // //     this.positions[this.selectedField.id] = { x, y };
// // //     console.log("this.selectedField.field.id: ", this.selectedField.field.id);
    
// // //     const payload = {

// // //       /////////////////////////////////////////////////
// // //       fieldId: this.selectedField.field.id,
// // //       templateId: this.templateId,
// // //       x: Math.round(x),
// // //       y: Math.round(y)
// // //     };

// // //     console.log('Saving field position with payload:', payload);

// // //     // Capture field name before resetting selectedField
// // //     const fieldName = this.selectedField.field?.name || this.selectedField.name;

// // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(
// // //       (response) => {
// // //         console.log('Field position saved successfully:', response);
// // //         alert(`השדה "${fieldName}" נשמר במיקום (${x.toFixed(0)}, ${y.toFixed(0)})`);
        
// // //         // Make sure the field remains visible on the template
// // //         this.positions[this.selectedField.id] = { x, y };
// // //       },
// // //       (error) => {
// // //         console.error('Error saving field position:', error);
// // //         alert(`שגיאה בשמירת השדה "${fieldName}". אנא נסה שוב.`);
// // //       }
// // //     );

// // //     this.selectedField = null;
// // //     this.showPrompt = false;
// // //   }

// // //   selectField(field: any) {
// // //     console.log("Field selected: ", field);

// // //     console.log(field.id);
    
// // //     this.selectedField = field;
// // //     this.showPrompt = true;
// // //   }

// // //   // Helper method to check if a field is selected
// // //   isFieldSelected(field: any): boolean {
// // //     console.log(" in isFieldSelected: ");
// // //     console.log("this.selectedField: ");
    
// // //     // console.log(this.selectedField.id);
    
// // //     return this.selectedField && this.selectedField.id === field.id;
// // //   }
// // // }





















// // // import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
// // // import { CategoryFieldService } from '../../services/category-field/category-field.service';
// // // import { TemplateFieldService } from '../../services/template-field/template-field.service';
// // // import { ActivatedRoute } from '@angular/router';
// // // import { Template } from '../../models/template';
// // // import { TemplatesService } from '../../services/templates/templates.service';

// // // @Component({
// // //   selector: 'app-field-placement',
// // //   templateUrl: './field-positioner.component.html',
// // //   styleUrls: ['./field-positioner.component.css']
// // // })
// // // export class FieldPlacementComponent implements OnInit {
// // //   fields: any[] = [];
// // //   templateId: number = 0;
// // //   selectedField: any = null;
// // //   template!: Template;
// // //   templateImageUrl!: string;
// // //   positions: { [key: number]: { x: number, y: number } } = {};
// // //   showPrompt: boolean = false;
// // //   draggingField: any = null;
// // //   dragOffset = { x: 0, y: 0 };

// // //   @ViewChild('templateImage') templateImageRef!: ElementRef;
// // //   @ViewChild('imageContainer') imageContainerRef!: ElementRef;

// // //   constructor(
// // //     private templatesService: TemplatesService,
// // //     private templateFieldService: TemplateFieldService,
// // //     private categoryFieldService: CategoryFieldService,
// // //     private route: ActivatedRoute
// // //   ) {}

// // //   ngOnInit(): void {
// // //     const templateData = sessionStorage.getItem('template');
// // //     this.template = templateData ? JSON.parse(templateData) : {} as Template;
// // //     this.templateId = Number(this.route.snapshot.paramMap.get('id')) || Number(sessionStorage.getItem('templateId'));

// // //     this.templatesService.getDownloadURL(this.template.name).then(res => {
// // //       this.templateImageUrl = res;
// // //     });

// // //     const categoryId = Number(sessionStorage.getItem('categoryId'));
// // //     if (categoryId >= 0) {
// // //       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe((res) => {
// // //         this.fields = res;
// // //         this.loadExistingPositions();
// // //       });
// // //     }
// // //   }

// // //   trackByFieldId(index: number, field: any): number {
// // //     return field.id;
// // //   }

// // //   loadExistingPositions(): void {
// // //     this.templateFieldService.addFieldToTemplate(this.templateId).subscribe(templateFields => {
// // //       (Array.isArray(templateFields) ? templateFields : Object.values(templateFields)).forEach(tf => {
// // //         if (tf.fieldId && tf.x !== undefined && tf.y !== undefined) {
// // //           this.positions[tf.fieldId] = { x: tf.x, y: tf.y };
// // //         }
// // //       });
// // //     });
// // //   }

// // //   onImageClick(event: MouseEvent): void {
// // //     if (!this.selectedField) return;
// // //     const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
// // //     const x = event.clientX - containerRect.left;
// // //     const y = event.clientY - containerRect.top;

// // //     const payload = {
// // //       fieldId: this.selectedField.field.id,
// // //       templateId: this.templateId,
// // //       x: Math.round(x),
// // //       y: Math.round(y)
// // //     };

// // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(() => {
// // //       this.positions[this.selectedField.id] = { x, y };
// // //       this.selectedField = null;
// // //       this.showPrompt = false;
// // //     });
// // //   }

// // //   selectField(field: any): void {
// // //     this.selectedField = field;
// // //     this.showPrompt = true;
// // //   }

// // //   isFieldSelected(field: any): boolean {
// // //     return this.selectedField && this.selectedField.id === field.id;
// // //   }

// // //   startDrag(event: MouseEvent, field: any): void {
// // //     event.stopPropagation();
// // //     this.draggingField = field;
// // //     const pos = this.positions[field.id];
// // //     this.dragOffset.x = event.offsetX;
// // //     this.dragOffset.y = event.offsetY;
// // //   }

// // //   @HostListener('document:mousemove', ['$event'])
// // //   onDrag(event: MouseEvent): void {
// // //     if (!this.draggingField) return;
// // //     const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
// // //     const x = event.clientX - containerRect.left - this.dragOffset.x;
// // //     const y = event.clientY - containerRect.top - this.dragOffset.y;
// // //     this.positions[this.draggingField.id] = { x, y };
// // //   }

// // //   @HostListener('document:mouseup')
// // //   stopDrag(): void {
// // //     if (!this.draggingField) return;
// // //     const field = this.draggingField;
// // //     const pos = this.positions[field.id];

// // //     const payload = {
// // //       fieldId: field.field.id,
// // //       templateId: this.templateId,
// // //       x: Math.round(pos.x),
// // //       y: Math.round(pos.y)
// // //     };

// // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(() => {
// // //       console.log('Position updated:', payload);
// // //     });

// // //     this.draggingField = null;
// // //   }
// // // }



// // import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
// // import { CategoryFieldService } from '../../services/category-field/category-field.service';
// // import { TemplateFieldService } from '../../services/template-field/template-field.service';
// // import { ActivatedRoute } from '@angular/router';
// // import { Template } from '../../models/template';
// // import { TemplatesService } from '../../services/templates/templates.service';

// // @Component({
// //   selector: 'app-field-placement',
// //   templateUrl: './field-positioner.component.html',
// //   styleUrls: ['./field-positioner.component.css']
// // })
// // export class FieldPlacementComponent implements OnInit {
// //   fields: any[] = [];
// //   templateId: number = 0;
// //   selectedField: any = null;
// //   template!: Template;
// //   templateImageUrl!: string;
// //   positions: { [key: number]: { x: number, y: number, templateFieldId?: number } } = {};
// //   showPrompt: boolean = false;
// //   draggingField: any = null;
// //   dragOffset = { x: 0, y: 0 };

// //   @ViewChild('templateImage') templateImageRef!: ElementRef;
// //   @ViewChild('imageContainer') imageContainerRef!: ElementRef;

// //   constructor(
// //     private templatesService: TemplatesService,
// //     private templateFieldService: TemplateFieldService,
// //     private categoryFieldService: CategoryFieldService,
// //     private route: ActivatedRoute
// //   ) {}

// //   ngOnInit(): void {
// //     const templateData = sessionStorage.getItem('template');
// //     this.template = templateData ? JSON.parse(templateData) : {} as Template;
// //     this.templateId = Number(this.route.snapshot.paramMap.get('id')) || Number(sessionStorage.getItem('templateId'));
// // console.log("in ngOnInit before : templateImageUrl");

// //     this.templatesService.getDownloadURL(this.template.name).then(res => {
// //       this.templateImageUrl = res;
// //       console.log(this.templateImageUrl);
      
// //     });

// //     const categoryId = Number(sessionStorage.getItem('categoryId'));
// //     if (categoryId >= 0) {
// //       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe((res) => {
// //         this.fields = res;
// //         this.loadExistingPositions();
// //       });
// //     }
// //   }

// //   trackByFieldId(index: number, field: any): number {
// //     return field.id;
// //   }

// //   loadExistingPositions(): void {
// //     this.templateFieldService.getTemplateFieldsByTemplateId(this.templateId).subscribe(templateFields => {
// //       (Array.isArray(templateFields) ? templateFields : Object.values(templateFields)).forEach(tf => {
// //         if (tf.fieldId && tf.x !== undefined && tf.y !== undefined) {
// //           this.positions[tf.fieldId] = { x: tf.x, y: tf.y, templateFieldId: tf.id };
// //         }
// //       });
// //     });
// //   }

// // //   onImageClick(event: MouseEvent): void {
// // //     console.log("on imageClick event: ", event);
    
// // //     if (!this.selectedField || this.draggingField) return;
// // //     const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
// // //     const x = event.clientX - containerRect.left;
// // //     const y = event.clientY - containerRect.top;

// // //     const payload = {
// // //       fieldId: this.selectedField.field.id,
// // //       templateId: this.templateId,
// // //       x: Math.round(x),
// // //       y: Math.round(y)
// // //     };
// // // console.log("in imageClick payload: before service");
// // // console.log(payload);

// // // console.log("/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*");
// // //     this.templateFieldService.addFieldToTemplate(payload).subscribe(response => {
// // //       console.log("in addFieldToTemplate response: ");
// // //       console.log(response);
// // //       console.log("response.id: ");
// // //       console.log(response.id);
// // //       console.log("////////////////////////////////////////////////////");
      
// // //       this.positions[this.selectedField.field.id] = { x, y, templateFieldId: response.id };
// // //       this.selectedField = null;
// // //       this.showPrompt = false;
// // //     });
// // //   }
// // onImageClick(event: MouseEvent): void {
// //   console.log("on imageClick event: ", event);

// //   if (!this.selectedField || this.draggingField) return;
// //   const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
// //   const x = event.clientX - containerRect.left;
// //   const y = event.clientY - containerRect.top;

// //   const fieldId = this.selectedField.field.id;
// //   const existingPosition = this.positions[fieldId];
// //   const payload = {
// //     fieldId: fieldId,
// //     templateId: this.templateId,
// //     x: Math.round(x),
// //     y: Math.round(y)
// //   };
// //   console.log("in imageClick payload: before service");
// //   console.log(payload);

// //   console.log("/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*");

// //   if (!existingPosition) {
// //     // מצב: מיקום ראשון של השדה
// //     this.templateFieldService.addFieldToTemplate(payload).subscribe(response => {
// //       console.log("in addFieldToTemplate response: ");
// //       console.log(response);
// //       console.log("response.id: ");
// //       console.log(response.id);
// //       console.log("////////////////////////////////////////////////////");

// //       this.positions[fieldId] = { x, y, templateFieldId: response.id };
// //     });
// //   } else {
// //     // מצב: עריכת מיקום קיים של השדה
// //     const templateFieldIdToUpdate = existingPosition.templateFieldId;
// //     if (templateFieldIdToUpdate) {
// //       this.templateFieldService.updateTemplateFieldPosition(templateFieldIdToUpdate, payload).subscribe(() => {
// //         console.log('Position updated:', payload);
// //         this.positions[fieldId] = { x, y, templateFieldId: templateFieldIdToUpdate };
        
// //       });
// //     } else {
// //       console.error('Error: templateFieldId not found for updating position.');
// //     }
// //     this.selectedField = null;
// //     this.showPrompt = false;
// //   }
// // }
// //   selectField(field: any): void {
// //     this.selectedField = field;
// //     this.showPrompt = true;
// //   }

// //   isFieldSelected(field: any): boolean {
// //     return this.selectedField && this.selectedField.id === field.id;
// //   }

// //   getFieldPosition(fieldId: number): { top: string, left: string } | null {
// //     const pos = this.positions[fieldId];
// //     if (pos) {
// //       return { top: `${pos.y}px`, left: `${pos.x}px` };
// //     }
// //     return null;
// //   }

// //   startDrag(event: MouseEvent, field: any): void {
// //     event.stopPropagation();
// //     this.draggingField = field;
// //     const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
// //     this.dragOffset.x = event.clientX - containerRect.left - this.positions[field.id].x;
// //     this.dragOffset.y = event.clientY - containerRect.top - this.positions[field.id].y;
// //     (event.target as HTMLElement).style.cursor = 'grabbing';
// //   }

// //   // @HostListener('document:mousemove', ['$event'])
// //   // onDrag(event: MouseEvent): void {
// //   //   if (!this.draggingField) return;
// //   //   const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
// //   //   let x = event.clientX - containerRect.left - this.dragOffset.x;
// //   //   let y = event.clientY - containerRect.top - this.dragOffset.y;

// //   //   const element = document.querySelector(`.field-label[data-field-id="${this.draggingField.id}"]`);
// //   //   if (element) {
// //   //     x = Math.max(0, Math.min(x, containerRect.width - (element as HTMLElement).offsetWidth));
// //   //     y = Math.max(0, Math.min(y, containerRect.height - (element as HTMLElement).offsetHeight));
// //   //   }

// //   //   this.positions[this.draggingField.id] = { x, y };
// //   // }

// //   // @HostListener('document:mouseup')
// //   // stopDrag(): void {
// //   //   if (!this.draggingField) return;
// //   //   const field = this.draggingField;
// //   //   const pos = this.positions[field.id];
// //   //   this.draggingField = null;
// //   //   const element = document.querySelector(`.field-label[data-field-id="${field.id}"]`);
// //   //   if (element) {
// //   //     (element as HTMLElement).style.cursor = 'grab';
// //   //   }
// //   //   this.updateFieldPosition(this.positions[field.id].templateFieldId!, pos.x, pos.y);
// //   // }

// //   updateFieldPosition(templateFieldId: number, x: number, y: number): void {
// //     const payload = {
// //       templateId: this.templateId,
// //       fieldId: this.fields.find(f => f.field.id === this.draggingField.id)?.field.id,
// //       x: Math.round(x),
// //       y: Math.round(y)
// //     };

// //     this.templateFieldService.updateTemplateFieldPosition(templateFieldId, payload).subscribe(() => {
// //       console.log('Position updated:', payload);
// //     });
// //   }

// //   isFieldPlaced(fieldId: number): boolean {
// //     return !!this.positions[fieldId];
// //   }

// //   editPlacement(field: any): void {
// //     this.selectedField = field;
// //     this.showPrompt = true;
// //   }
// // }






// import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
// import { CategoryFieldService } from '../../services/category-field/category-field.service';
// import { TemplateFieldService } from '../../services/template-field/template-field.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Template } from '../../models/template';
// import { TemplatesService } from '../../services/templates/templates.service';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-field-placement',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatIconModule,
//     MatButtonModule,
//     MatProgressSpinnerModule
//   ],
//   templateUrl: './field-positioner.component.html',
//   styleUrls: ['./field-positioner.component.css']
// })
// export class FieldPlacementComponent implements OnInit {
//   fields: any[] = [];
//   templateId: number = 0;
//   selectedField: any = null;
//   template!: Template;
//   templateImageUrl!: string;
//   positions: { [key: number]: { x: number, y: number, templateFieldId?: number } } = {};
//   showPrompt: boolean = false;
//   draggingField: any = null;
//   dragOffset = { x: 0, y: 0 };
//   unsavedChanges: boolean = false;

//   @ViewChild('templateImage') templateImageRef!: ElementRef;
//   @ViewChild('imageContainer') imageContainerRef!: ElementRef;

//   constructor(
//     private templatesService: TemplatesService,
//     private templateFieldService: TemplateFieldService,
//     private categoryFieldService: CategoryFieldService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const templateData = sessionStorage.getItem('template');
//     this.template = templateData ? JSON.parse(templateData) : {} as Template;
//     this.templateId = Number(this.route.snapshot.paramMap.get('id')) || Number(sessionStorage.getItem('templateId'));

//     this.loadTemplateImage();
//     this.loadFields();
//   }

//   loadTemplateImage(): void {
//     if (!this.template.name) {
//       Swal.fire({
//         title: 'שגיאה',
//         text: 'לא נמצאו פרטי תבנית',
//         icon: 'error',
//         confirmButtonText: 'אישור',
//         confirmButtonColor: '#5c6bc0'
//       });
//       return;
//     }

//     this.templatesService.getDownloadURL(this.template.name).then(res => {
//       this.templateImageUrl = res;
//     }).catch(err => {
//       Swal.fire({
//         title: 'שגיאה',
//         text: 'לא ניתן לטעון את תמונת התבנית',
//         icon: 'error',
//         confirmButtonText: 'אישור',
//         confirmButtonColor: '#5c6bc0'
//       });
//     });
//   }

//   loadFields(): void {
//     const categoryId = Number(sessionStorage.getItem('categoryId'));
//     if (categoryId >= 0) {
//       this.categoryFieldService.getFieldsByCategory(categoryId).subscribe({
//         next: (res) => {
//           this.fields = res;
//           this.loadExistingPositions();
//         },
//         error: (err) => {
//           Swal.fire({
//             title: 'שגיאה',
//             text: 'לא ניתן לטעון את השדות',
//             icon: 'error',
//             confirmButtonText: 'אישור',
//             confirmButtonColor: '#5c6bc0'
//           });
//         }
//       });
//     }
//   }

//   loadExistingPositions(): void {
//     this.templateFieldService.getTemplateFieldsByTemplateId(this.templateId).subscribe({
//       next: (templateFields) => {
//         (Array.isArray(templateFields) ? templateFields : Object.values(templateFields)).forEach(tf => {
//           if (tf.fieldId && tf.x !== undefined && tf.y !== undefined) {
//             this.positions[tf.fieldId] = { x: tf.x, y: tf.y, templateFieldId: tf.id };
//           }
//         });
//       },
//       error: (err) => {
//         console.error('שגיאה בטעינת מיקומים קיימים:', err);
//       }
//     });
//   }

//   onImageClick(event: MouseEvent): void {
//     if (!this.selectedField || this.draggingField) return;
//     console.log("in onImageClick event: ", event);
    
//     const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
//     const x = event.clientX - containerRect.left;
//     const y = event.clientY - containerRect.top;

//     const fieldId = this.selectedField.field.id;
//     const existingPosition = this.positions[fieldId];
//     const payload = {
//       fieldId: fieldId,
//       templateId: this.templateId,
//       x: Math.round(x),
//       y: Math.round(y)
//     };

//     if (!existingPosition) {
//       // מיקום ראשון של השדה
//       this.templateFieldService.addFieldToTemplate(payload).subscribe({
//         next: (response) => {
//           console.log("in addFieldToTemplate response: ");
//           console.log(response);
          
          
//           this.positions[fieldId] = { x, y, templateFieldId: response.id };
//           console.log('Field position saved successfully:', response);
          
//           console.log(response.id);
          
//           this.unsavedChanges = true;
          
//           Swal.fire({
//             title: 'הצלחה',
//             text: 'השדה מוקם בהצלחה',
//             icon: 'success',
//             timer: 1000,
//             showConfirmButton: false
//           });
//         },
//         error: (err) => {
//           Swal.fire({
//             title: 'שגיאה',
//             text: 'לא ניתן למקם את השדה',
//             icon: 'error',
//             confirmButtonText: 'אישור',
//             confirmButtonColor: '#5c6bc0'
//           });
//         }
//       });
//     } else {
//       console.log("in second edit");
//       console.log(existingPosition);
      
      
//       // עריכת מיקום קיים
//       const templateFieldIdToUpdate = existingPosition.templateFieldId;
//       console.log(templateFieldIdToUpdate);
      
//       if (templateFieldIdToUpdate) {
//         this.templateFieldService.updateTemplateFieldPosition(templateFieldIdToUpdate, payload).subscribe({
//           next: () => {
//             console.log('Position updated:', payload);
//             console.log("this.positions: ", this.positions);
//             this.positions[fieldId] = { x, y, templateFieldId: templateFieldIdToUpdate };
//             this.unsavedChanges = true;
            
//             Swal.fire({
//               title: 'הצלחה',
//               text: 'מיקום השדה עודכן בהצלחה',
//               icon: 'success',
//               timer: 1000,
//               showConfirmButton: false
//             });
//           },
//           error: (err) => {
//             Swal.fire({
//               title: 'שגיאה',
//               text: 'לא ניתן לעדכן את מיקום השדה',
//               icon: 'error',
//               confirmButtonText: 'אישור',
//               confirmButtonColor: '#5c6bc0'
//             });
//           }
//         });
//       }
//     }
    
//     this.selectedField = null;
//     this.showPrompt = false;
//   }

//   selectField(field: any): void {
//     this.selectedField = field;
//     this.showPrompt = true;
//   }

//   isFieldSelected(field: any): boolean {
//     return this.selectedField && this.selectedField.field.id === field.field.id;
//   }

//   getFieldPosition(fieldId: number): { top: string, left: string } | null {
//     const pos = this.positions[fieldId];
//     if (pos) {
//       return { top: `${pos.y}px`, left: `${pos.x}px` };
//     }
//     return null;
//   }

//   startDrag(event: MouseEvent, field: any): void {
//     event.stopPropagation();
//     this.draggingField = field;
//     console.log("in startDrag event: ", event);
//     console.log(this.draggingField);
    
    
//     const element = event.target as HTMLElement;
//     const fieldLabel = element.closest('.field-label') as HTMLElement;
    
//     if (fieldLabel) {
//       const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
//       const fieldRect = fieldLabel.getBoundingClientRect();
      
//       this.dragOffset.x = event.clientX - fieldRect.left;
//       this.dragOffset.y = event.clientY - fieldRect.top;
      
//       fieldLabel.style.cursor = 'grabbing';
//     }
//   }

//   @HostListener('document:mousemove', ['$event'])
//   onDrag(event: MouseEvent): void {
//     if (!this.draggingField) return;
    
//     const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
//     const fieldId = this.draggingField.field.id;
    
//     let x = event.clientX - containerRect.left - this.dragOffset.x;
//     let y = event.clientY - containerRect.top - this.dragOffset.y;
    
//     // מגבלות כדי שהשדה לא יצא מגבולות התמונה
//     const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;
//     if (element) {
//       x = Math.max(0, Math.min(x, containerRect.width - element.offsetWidth));
//       y = Math.max(0, Math.min(y, containerRect.height - element.offsetHeight));
      
//       element.style.left = `${x}px`;
//       element.style.top = `${y}px`;
//     }
//   }

//   @HostListener('document:mouseup')
//   stopDrag(): void {
//     if (!this.draggingField) return;
    
//     const fieldId = this.draggingField.field.id;
//     const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;
    
//     if (element) {
//       element.style.cursor = 'grab';
      
//       const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
//       const fieldRect = element.getBoundingClientRect();
      
//       const x = fieldRect.left - containerRect.left;
//       const y = fieldRect.top - containerRect.top;
      
//       const templateFieldId = this.positions[fieldId]?.templateFieldId;
//       if (templateFieldId) {
//         this.updateFieldPosition(templateFieldId, x, y);
//       }
//     }
    
//     // this.draggingField = null;
//   }

//   updateFieldPosition(templateFieldId: number, x: number, y: number): void {
//     console.log("in updateFieldPosition: ", x, y);
//     console.log(this.draggingField);
    
    
//     const payload = {
//       templateId: this.templateId,
//       fieldId: this.draggingField.field.id,
//       x: Math.round(x),
//       y: Math.round(y)
//     };

//     this.templateFieldService.updateTemplateFieldPosition(templateFieldId, payload).subscribe({
//       next: () => {
//         console.log('Position updated:', payload);
//         console.log("draginField");
        
//         console.log(this.draggingField);
        
//         const fieldId = this.draggingField.field.id;
//         this.positions[fieldId] = { 
//           x: Math.round(x), 
//           y: Math.round(y), 
//           templateFieldId 
//         };
//         this.unsavedChanges = true;
//         this.draggingField = null;

//       },
//       error: (err) => {
//         console.error('שגיאה בעדכון מיקום:', err);
        
//         // שחזור המיקום הקודם
//         const fieldId = this.draggingField.field.id;
//         const oldPos = this.positions[fieldId];
//         if (oldPos) {
//           const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;
//           if (element) {
//             element.style.left = `${oldPos.x}px`;
//             element.style.top = `${oldPos.y}px`;
//           }
//         }
//       }
//     });
//   }

//   isFieldPlaced(fieldId: number): boolean {
//     return !!this.positions[fieldId];
//   }

//   editPlacement(field: any): void {
//     this.selectedField = field;
//     this.showPrompt = true;
//   }

//   // saveAllPlacements(): void {
//   //   Swal.fire({
//   //     title: 'שמירת מיקומים',
//   //     text: 'האם אתה בטוח שברצונך לשמור את כל המיקומים?',
//   //     icon: 'question',
//   //     showCancelButton: true,
//   //     confirmButtonColor: '#5c6bc0',
//   //     cancelButtonColor: '#757575',
//   //     confirmButtonText: 'שמור',
//   //     cancelButtonText: 'ביטול'
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       Swal.fire({
//   //         title: 'נשמר בהצלחה!',
//   //         text: 'כל המיקומים נשמרו בהצלחה',
//   //         icon: 'success',
//   //         timer: 1500,
//   //         showConfirmButton: false
//   //       }).then(() => {
//   //         this.unsavedChanges = false;
//   //       });
//   //     }
//   //   });
//   // }

//   // goBack(): void {
//   //   if (this.unsavedChanges) {
//   //     Swal.fire({
//   //       title: 'שינויים לא שמורים',
//   //       text: 'יש לך שינויים שלא נשמרו. האם אתה בטוח שברצונך לצאת?',
//   //       icon: 'warning',
//   //       showCancelButton: true,
//   //       confirmButtonColor: '#e53935',
//   //       cancelButtonColor: '#757575',
//   //       confirmButtonText: 'צא ללא שמירה',
//   //       cancelButtonText: 'המשך עריכה'
//   //     }).then((result) => {
//   //       if (result.isConfirmed) {
//   //         this.router.navigate(['/templates-list']);
//   //       }
//   //     });
//   //   } else {
//   //     this.router.navigate(['/templates-list']);
//   //   }
//   // }

//   // @HostListener('window:beforeunload', ['$event'])
//   // unloadNotification($event: any): void {
//   //   if (this.unsavedChanges) {
//   //     $event.returnValue = true;
//   //   }
//   // }
// }




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
  // selectedField: any = null; // הוסר כי אין צורך במיקום ידני בלחיצה
  template!: Template;
  templateImageUrl!: string;
  positions: { [key: number]: { x: number, y: number, templateFieldId?: number } } = {};
  // showPrompt: boolean = false; // הוסר
  draggingField: any = null;
  dragOffset = { x: 0, y: 0 };
  unsavedChanges: boolean = false;

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
    const categoryId = Number(sessionStorage.getItem('categoryId'));
    if (categoryId >= 0) {
      this.categoryFieldService.getFieldsByCategory(categoryId).subscribe({
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
    // קודם נטען מיקומים קיימים, ואז נמקם את החדשים
    // this.loadExistingTemplateFields().then(() => {
      this.addFieldsOnTEmplates();
    // });
  }

  // פונקציה לטעינת מיקומים קיימים מה-DB
  // async loadExistingTemplateFields(): Promise<void> {
  //   try {
  //     const existingTemplateFields = await this.templateFieldService.getTemplateFieldsByTemplateId(this.templateId).toPromise();
  //     (Array.isArray(existingTemplateFields) ? existingTemplateFields : Object.values(existingTemplateFields)).forEach(tf => {
  //       if (tf.fieldId && tf.x !== undefined && tf.y !== undefined) {
  //         this.positions[tf.fieldId] = { x: tf.x, y: tf.y, templateFieldId: tf.id };
  //       }
  //     });
  //     console.log('Existing field positions loaded:', this.positions);
  //   } catch (err) {
  //     console.error('Error loading existing template fields:', err);
  //     Swal.fire({
  //       title: 'שגיאה',
  //       text: 'לא ניתן לטעון מיקומים קיימים של שדות.',
  //       icon: 'error',
  //       confirmButtonText: 'אישור',
  //       confirmButtonColor: '#5c6bc0'
  //     });
  //   }
  // }

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
      // Get the actual rendered size of the image (accounting for object-fit: contain)
      const imgRect = imgElement.getBoundingClientRect();

      let currentY = 50; // Initial Y position relative to the image top
      // Place fields horizontally centered on the image
      const startX = imgRect.width / 2;
      const lineHeight = 30; // Vertical spacing between fields

      for (const field of this.fields) {
        // Only add fields that do NOT already have a position
        if (!this.positions[field.field.id]) {
          const payload = {
            fieldId: field.field.id,
            templateId: this.templateId,
            // Store positions relative to the top-left of the image
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

  // --- פונקציות הקשורות למיקום ידני (אם רלוונטי) ---
  // אם אתה לא רוצה לאפשר מיקום ידני בלחיצה, אתה יכול להסיר את הפונקציות האלה.
  // השארתי אותן כי הן היו בקוד שלך, אך הן לא נחוצות למיקום אוטומטי.
  // onImageClick(event: MouseEvent): void {
  //   if (!this.selectedField || this.draggingField) return;

  //   const imgElement = this.templateImageRef.nativeElement;
  //   const imgRect = imgElement.getBoundingClientRect();

  //   const x = event.clientX - imgRect.left;
  //   const y = event.clientY - imgRect.top;

  //   if (x < 0 || x > imgRect.width || y < 0 || y > imgRect.height) {
  //     console.warn("Click outside image bounds. Not placing field.");
  //     return;
  //   }

  //   const fieldId = this.selectedField.field.id;
  //   const existingPosition = this.positions[fieldId];
  //   const payload = {
  //     fieldId: fieldId,
  //     templateId: this.templateId,
  //     x: Math.round(x),
  //     y: Math.round(y)
  //   };

  //   if (existingPosition && existingPosition.templateFieldId) {
  //     this.templateFieldService.updateTemplateFieldPosition(existingPosition.templateFieldId, payload).subscribe({
  //       next: () => {
  //         this.positions[fieldId] = { x, y, templateFieldId: existingPosition.templateFieldId };
  //         this.unsavedChanges = true;
  //         Swal.fire({ title: 'הצלחה', text: 'מיקום השדה עודכן בהצלחה', icon: 'success', timer: 1000, showConfirmButton: false });
  //       },
  //       error: (err) => Swal.fire({ title: 'שגיאה', text: 'לא ניתן לעדכן את מיקום השדה', icon: 'error', confirmButtonText: 'אישור', confirmButtonColor: '#5c6bc0' })
  //     });
  //   } else {
  //     this.templateFieldService.addFieldToTemplate(payload).subscribe({
  //       next: (response) => {
  //         this.positions[fieldId] = { x, y, templateFieldId: response.id };
  //         this.unsavedChanges = true;
  //         Swal.fire({ title: 'הצלחה', text: 'השדה מוקם בהצלחה', icon: 'success', timer: 1000, showConfirmButton: false });
  //       },
  //       error: (err) => Swal.fire({ title: 'שגיאה', text: 'לא ניתן למקם את השדה', icon: 'error', confirmButtonText: 'אישור', confirmButtonColor: '#5c6bc0' })
  //     });
  //   }
  //   this.selectedField = null;
  //   this.showPrompt = false;
  // }

  // selectField(field: any): void {
  //   this.selectedField = field;
  //   this.showPrompt = true;
  // }

  // isFieldSelected(field: any): boolean {
  //   return this.selectedField && this.selectedField.field.id === field.field.id;
  // }
  // --- סוף פונקציות של פאנל צדדי ---

  getFieldPosition(fieldId: number): { top: string, left: string } | null {
    const pos = this.positions[fieldId];
    if (!pos || !this.templateImageRef || !this.templateImageRef.nativeElement || !this.imageContainerRef || !this.imageContainerRef.nativeElement) {
      return null;
    }

    const imgElement = this.templateImageRef.nativeElement;
    const imgRect = imgElement.getBoundingClientRect();
    const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();

    // Calculate the offset of the image's top-left corner relative to the container's top-left corner
    const imageOffsetX = imgRect.left - containerRect.left;
    const imageOffsetY = imgRect.top - containerRect.top;

    // The stored 'pos.x' and 'pos.y' are relative to the image.
    // To display them absolutely within the image-container, we need to add the image's offset.
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
      // Calculate the offset of the mouse click within the field label itself
      // This ensures the field doesn't "jump" when dragging starts.
      this.dragOffset.x = event.clientX - fieldLabel.getBoundingClientRect().left;
      this.dragOffset.y = event.clientY - fieldLabel.getBoundingClientRect().top;

      fieldLabel.style.cursor = 'grabbing';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent): void {
    if (!this.draggingField || !this.templateImageRef || !this.templateImageRef.nativeElement || !this.imageContainerRef || !this.imageContainerRef.nativeElement) return;

    const imgElement = this.templateImageRef.nativeElement;
    const imgRect = imgElement.getBoundingClientRect(); // Actual image dimensions and position
    const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();

    // Calculate the offset of the image's top-left corner relative to the container's top-left corner
    const imageOffsetX = imgRect.left - containerRect.left;
    const imageOffsetY = imgRect.top - containerRect.top;

    // Mouse position relative to the image-container's top-left corner
    let newXInContainer = event.clientX - containerRect.left - this.dragOffset.x;
    let newYInContainer = event.clientY - containerRect.top - this.dragOffset.y;

    const fieldId = this.draggingField.field.id;
    const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;

    if (element) {
      const fieldWidth = element.offsetWidth;
      const fieldHeight = element.offsetHeight;

      // Calculate the field's position relative to the image's top-left corner
      let xRelativeToImage = newXInContainer - imageOffsetX;
      let yRelativeToImage = newYInContainer - imageOffsetY;

      // Clamp the field's position to stay within the image boundaries
      xRelativeToImage = Math.max(0, Math.min(xRelativeToImage, imgRect.width - fieldWidth));
      yRelativeToImage = Math.max(0, Math.min(yRelativeToImage, imgRect.height - fieldHeight));

      // Update the element's style, converting back to container-relative coordinates for display
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

      // Calculate the offset of the image's top-left corner relative to the container's top-left corner
      const imageOffsetX = imgRect.left - containerRect.left;
      const imageOffsetY = imgRect.top - containerRect.top;

      // Get the current position of the field label relative to its container
      const finalXInContainer = parseFloat(element.style.left || '0');
      const finalYInContainer = parseFloat(element.style.top || '0');

      // The position to save in the database must be relative to the image
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
      fieldId: this.draggingField.field.id, // This should be correct
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
        // Revert to previous position in UI if update fails
        const fieldId = this.draggingField.field.id;
        const oldPos = this.positions[fieldId];
        if (oldPos) {
          const element = document.querySelector(`.field-label[data-field-id="${fieldId}"]`) as HTMLElement;
          if (element) {
            // Recalculate container-relative position for display
            const imgElement = this.templateImageRef.nativeElement;
            const imgRect = imgElement.getBoundingClientRect();
            const containerRect = this.imageContainerRef.nativeElement.getBoundingClientRect();
            const imageOffsetX = imgRect.left - containerRect.left;
            const imageOffsetY = imgRect.top - containerRect.top;

            element.style.left = `${oldPos.x + imageOffsetX}px`;
            element.style.top = `${oldPos.y + imageOffsetY}px`;
          }
        }
        this.draggingField = null; // Even if failed, reset dragging field
      }
    });
  }

  isFieldPlaced(fieldId: number): boolean {
    return !!this.positions[fieldId];
  }

  // editPlacement(field: any): void { // הוסר כי אין צורך במיקום ידני
  //   this.selectedField = field;
  //   this.showPrompt = true;
  // }

  // saveAllPlacements(): void {
  //   Swal.fire({
  //     title: 'שמירת מיקומים',
  //     text: 'האם אתה בטוח שברצונך לשמור את כל המיקומים?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#5c6bc0',
  //     cancelButtonColor: '#757575',
  //     confirmButtonText: 'שמור',
  //     cancelButtonText: 'ביטול'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: 'נשמר בהצלחה!',
  //         text: 'כל המיקומים נשמרו בהצלחה',
  //         icon: 'success',
  //         timer: 1500,
  //         showConfirmButton: false
  //       }).then(() => {
  //         this.unsavedChanges = false;
  //       });
  //     }
  //   });
  // }

  // goBack(): void {
  //   if (this.unsavedChanges) {
  //     Swal.fire({
  //       title: 'שינויים לא שמורים',
  //       text: 'יש לך שינויים שלא נשמרו. האם אתה בטוח שברצונך לצאת?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#e53935',
  //       cancelButtonColor: '#757575',
  //       confirmButtonText: 'צא ללא שמירה',
  //       cancelButtonText: 'המשך עריכה'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.router.navigate(['/templates-list']);
  //       }
  //     });
  //   } else {
  //     this.router.navigate(['/templates-list']);
  //   }
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   if (this.unsavedChanges) {
  //     $event.returnValue = true;
  //   }
  // }
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