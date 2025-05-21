import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Template } from '../../models/template';


@Component({
  selector: 'app-template-preview-dialog',
  imports: [],
  templateUrl: './template-preview-dialog.component.html',
  styleUrl: './template-preview-dialog.component.css'
})
export class TemplatePreviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TemplatePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { template: Template }
  ) {}
}

