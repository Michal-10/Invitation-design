

import { Component, OnInit } from '@angular/core';
import { Template } from '../../models/template';
import { CategoryService } from '../../services/categories/category.service';
import { TemplatesService } from '../../services/templates/templates.service';import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  selectedCategory!: Category
  templates: Template[] = [];

  constructor(
    private categoryService: CategoryService,
    private templateService: TemplatesService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data,
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
      next: (data) =>{
        this.templates = data,
        this.templates.forEach(async template => {
          template.imageUrl = await this.templateService.getDownloadURL(template.name);
        });
        console.log(data);
        
        
      },
      error: (err) => console.error('שגיאה בטעינת תבניות:', err)
    });
  }
}
