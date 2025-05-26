
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatInputModule } from '@angular/material/input';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { AnalyticsService } from '../../services/analytics/analytics.service';

// import { NgChartsModule } from 'ng2-charts';

// Chart.register(...registerables);
// Chart.register(ChartDataLabels);

// @Component({
//   selector: 'app-analytics',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     MatIconModule,
//     MatFormFieldModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatInputModule,
//     ReactiveFormsModule,
//     NgChartsModule
//   ],
//   templateUrl: './analytics.component.html',
//   styleUrls: ['./analytics.component.css']
// })
// export class AnalyticsComponent implements OnInit {
//   templatesByCategoryLabels: string[] = [];
//   templatesByCategoryData: number[] = [];
//   dailyLoginsLabels: string[] = [];
//   dailyLoginsData: number[] = [];
//   dailyActiveUsersLabels: string[] = [];
//   dailyActiveUsersData: number[] = [];

//   constructor(private analyticsService: AnalyticsService) { }

//   ngOnInit(): void {

//     this.analyticsService.getTemplatesByCategory().subscribe(data => {
//       console.log("in getTemplatesByCategory");

//       this.templatesByCategoryLabels = data.map(d => d.categoryName); // Use categoryName or fallback
//       console.log("templatesByCategoryLabels");
//       console.log(this.templatesByCategoryLabels);

//       this.templatesByCategoryData = data.map(d => d.count);
//       console.log("in subscribe in getTemplatesByCategory");
      
//     });
//     console.log("after getTemplatesByCategory");
    

//     // Fetch daily logins
//     this.analyticsService.getDailyLogins().subscribe(data => {
//       this.dailyLoginsLabels = data.map(d => new Date(d.date).toLocaleDateString('he-IL')); // Display only the date
//       this.dailyLoginsData = data.map(d => d.count);
//     });

//     console.log("after getDailyLogins");
    
//     // Fetch daily active users
//     this.analyticsService.getDailyActiveUsers().subscribe(data => {
//       this.dailyActiveUsersLabels = data.map(d => new Date(d.date).toLocaleDateString('he-IL')); // Display date
//       this.dailyActiveUsersData = data.map(d => d.count); // Active users count
//     });
//     console.log("after getDailyActiveUsers");
    
//   }





//   selectedChart: 'pie' | 'bar' | 'line' | null = null;

// openChart(chart: 'pie' | 'bar' | 'line') {
//   this.selectedChart = chart;
// }

// getChartData(chart: string):ChartConfiguration['data'] {
//   switch (chart) {
//     case 'pie':
//       return {
//         labels: this.templatesByCategoryLabels,
//         datasets: [{
//           data: this.templatesByCategoryData,
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#AB47BC', '#FF7043', '#42A5F5', '#66BB6A'],
//         }]
//       };
//     case 'bar':
//       return {
//         labels: this.dailyLoginsLabels,
//         datasets: [{
//           label: 'מספר התחברויות',
//           data: this.dailyLoginsData,
//           backgroundColor: '#4f46e5'
//         }]
//       };
//     case 'line':
//       return {
//         labels: this.dailyActiveUsersLabels,
//         datasets: [{
//           label: 'משתמשים פעילים',
//           data: this.dailyActiveUsersData,
//           borderColor: '#ff5733',
//           backgroundColor: 'rgba(255, 87, 51, 0.5)',
//           fill: true
//         }]
//       };
//   }
//       return { labels: [], datasets: [] };
// }

// getChartOptions(chart: string)  {
//   return {
//     responsive: true,
//     scales: {
//       x: { title: { display: true, text: chart === 'line' ? 'תאריך' : 'שעה' } },
//       y: { beginAtZero: true, title: { display: chart !== 'pie', text: chart === 'line' ? 'מספר משתמשים' : 'כמות' } }
//     }
//   };
// }

// get selectedChartType() : ChartType {
//   if (this.selectedChart === 'pie') return 'pie';
//   if (this.selectedChart === 'bar') return 'bar';
//   if (this.selectedChart === 'line') return 'line';
//   return 'bar'; // Default to bar chart
// }

// }








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
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
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

  selectedChart: 'pie' | 'bar' | 'line' | null = null;

  constructor(private analyticsService: AnalyticsService) {}

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

  openChart(chart: 'pie' | 'bar' | 'line') {
    this.selectedChart = chart;
  }

  closeChart() {
    this.selectedChart = null;
  }
}
