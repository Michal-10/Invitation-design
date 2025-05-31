import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AnalyticsService } from '../../services/analytics/analytics.service';

import { NgChartsModule } from 'ng2-charts';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  templatesByCategoryLabels: string[] = [];
  templatesByCategoryData: number[] = [];
  dailyLoginsLabels: string[] = [];
  dailyLoginsData: number[] = [];
  dailyActiveUsersLabels: string[] = [];
  dailyActiveUsersData: number[] = [];
  selectedChart: 'pie' | 'bar' | 'line' = 'pie'; 


  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {

    this.analyticsService.getTemplatesByCategory().subscribe(data => {
      this.templatesByCategoryLabels = data.map(d => d.categoryName); 
      this.templatesByCategoryData = data.map(d => d.count);
    });
    this.analyticsService.getDailyLogins().subscribe(data => {
      this.dailyLoginsLabels = data.map(d => new Date(d.date).toLocaleDateString('he-IL'));  
      this.dailyLoginsData = data.map(d => d.count);
    });
    
    this.analyticsService.getDailyActiveUsers().subscribe(data => {
      this.dailyActiveUsersLabels = data.map(d => new Date(d.date).toLocaleDateString('he-IL')); 
      this.dailyActiveUsersData = data.map(d => d.count); 
    });
  }

  selectChart(type: 'pie' | 'bar' | 'line') {
    this.selectedChart = type;
  }
}
