
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { MatCardModule } from '@angular/material/card';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatDatepickerModule } from '@angular/material/datepicker';
// // import { MatNativeDateModule } from '@angular/material/core';
// // import { MatInputModule } from '@angular/material/input';
// // import { ReactiveFormsModule } from '@angular/forms';
// // import { Chart, registerables } from 'chart.js';
// // import ChartDataLabels from 'chartjs-plugin-datalabels';
// // import { AnalyticsService } from '../../services/analytics/analytics.service';

// // // Register Chart.js components + plugin
// // Chart.register(...registerables);
// // Chart.register(ChartDataLabels);

// // @Component({
// //   selector: 'app-analytics',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     MatCardModule,
// //     MatButtonModule,
// //     MatIconModule,
// //     MatFormFieldModule,
// //     MatDatepickerModule,
// //     MatNativeDateModule,
// //     MatInputModule,
// //     ReactiveFormsModule
// //   ],
// //   templateUrl: './analytics.component.html',
// //   styleUrls: ['./analytics.component.css']
// // })
// // export class AnalyticsComponent implements OnInit {
// //   totalTemplates = 0;
// //   totalFields = 0;
// //   dailyActiveUsers: number = 0;

// //   templatesByCategory: { categoryId: number, count: number }[] = [];

// //   constructor(private analyticsService: AnalyticsService) { }

// //   ngOnInit(): void {
// //     this.analyticsService.getTotalTemplates().subscribe(data => {
// //       this.totalTemplates = data;
// //       this.tryRenderBarChart();
// //     });

// //     this.analyticsService.getTemplatesByCategory().subscribe(data => {
// //       this.templatesByCategory = data;
// //       this.tryRenderPieChart();
// //       this.tryRenderBarChart();
// //     });

// //     this.analyticsService.getDailyActiveUsers().subscribe({
// //       next: (count) => this.dailyActiveUsers = count,
// //       error: (err) => console.error('Error fetching daily active users:', err)
// //     });
// //   }

// //   tryRenderBarChart(): void {
// //     if (this.totalTemplates && this.templatesByCategory.length) {
// //       const labels = this.templatesByCategory.map(c => `קטגוריה ${c.categoryId}`);
// //       const values = this.templatesByCategory.map(c => c.count);

// //       const ctx = document.getElementById('categoryBarChart') as HTMLCanvasElement;
// //       if (!ctx) return;

// //       new Chart(ctx, {
// //         type: 'bar',
// //         data: {
// //           labels,
// //           datasets: [{
// //             label: 'מספר תבניות',
// //             data: values,
// //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
// //             borderColor: 'rgba(75, 192, 192, 1)',
// //             borderWidth: 1
// //           }]
// //         },
// //         options: {
// //           responsive: true,
// //           scales: {
// //             y: {
// //               beginAtZero: true,
// //               ticks: { precision: 0 }
// //             }
// //           }
// //         }
// //       });
// //     }
// //   }

// //   tryRenderPieChart(): void {
// //     if (this.totalTemplates && this.templatesByCategory.length) {
// //       const labels = this.templatesByCategory.map(c => `קטגוריה ${c.categoryId}`);
// //       const values = this.templatesByCategory.map(c => c.count);
// //       const total = values.reduce((a, b) => a + b, 0);

// //       const ctx = document.getElementById('categoryPieChart') as HTMLCanvasElement;
// //       if (!ctx) return;

// //       new Chart(ctx, {
// //         type: 'pie',
// //         data: {
// //           labels,
// //           datasets: [{
// //             data: values,
// //             backgroundColor: [
// //               'rgba(255, 99, 132, 0.6)',
// //               'rgba(54, 162, 235, 0.6)',
// //               'rgba(255, 206, 86, 0.6)',
// //               'rgba(75, 192, 192, 0.6)',
// //               'rgba(153, 102, 255, 0.6)'
// //             ],
// //             borderColor: 'rgba(255, 255, 255, 0.8)',
// //             borderWidth: 1
// //           }]
// //         },
// //         options: {
// //           responsive: true,
// //           plugins: {
// //             legend: {
// //               position: 'top'
// //             },
// //             tooltip: {
// //               callbacks: {
// //                 label: (tooltipItem) => {
// //                   const value = tooltipItem.raw as number;
// //                   const percentage = ((value / total) * 100).toFixed(2);
// //                   return `${tooltipItem.label}: ${percentage}%`;
// //                 }
// //               }
// //             },
// //             datalabels: {
// //               color: '#fff',
// //               font: {
// //                 weight: 'bold' as const
// //               },
// //               formatter: (value: number) => {
// //                 const percentage = (value / total) * 100;
// //                 return `${percentage.toFixed(1)}%`;
// //               }
// //             }
// //           }
// //         },
// //         plugins: [ChartDataLabels]
// //       });
// //     }
// //   }
// // }
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
// import { Chart, registerables } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { AnalyticsService } from '../../services/analytics/analytics.service';

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
//     ReactiveFormsModule
//   ],
//   templateUrl: './analytics.component.html',
//   styleUrls: ['./analytics.component.css']
// })
// export class AnalyticsComponent implements OnInit {
//   totalTemplates = 0;
//   totalFields = 0;
//   dailyActiveUsers: number = 0;

//   templatesByCategory: { categoryId: number, count: number }[] = [];
//   userLoginsByDay: { day: string, count: number }[] = [];

//   constructor(private analyticsService: AnalyticsService) {}

//   ngOnInit(): void {
//     this.analyticsService.getTotalTemplates().subscribe(data => {
//       this.totalTemplates = data;
//       this.tryRenderBarChart();
//     });

//     this.analyticsService.getTemplatesByCategory().subscribe(data => {
//       this.templatesByCategory = data;
//       this.tryRenderPieChart();
//       this.tryRenderBarChart();
//     });

//     this.analyticsService.getDailyActiveUsers().subscribe({
//       next: (count) => this.dailyActiveUsers = count,
//       error: (err) => console.error('Error fetching daily active users:', err)
//     });

//     this.analyticsService.getDailyActiveUsers().subscribe(data => {
//       this.userLoginsByDay = data;
//       this.tryRenderUserLoginsLineChart();
//     });
//   }

//   tryRenderBarChart(): void {
//     if (this.totalTemplates && this.templatesByCategory.length) {
//       const labels = this.templatesByCategory.map(c => `קטגוריה ${c.categoryId}`);
//       const values = this.templatesByCategory.map(c => c.count);

//       const ctx = document.getElementById('categoryBarChart') as HTMLCanvasElement;
//       if (!ctx) return;

//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels,
//           datasets: [{
//             label: 'מספר תבניות',
//             data: values,
//             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: { precision: 0 }
//             }
//           }
//         }
//       });
//     }
//   }

//   tryRenderPieChart(): void {
//     if (this.totalTemplates && this.templatesByCategory.length) {
//       const labels = this.templatesByCategory.map(c => `קטגוריה ${c.categoryId}`);
//       const values = this.templatesByCategory.map(c => c.count);
//       const total = values.reduce((a, b) => a + b, 0);

//       const ctx = document.getElementById('categoryPieChart') as HTMLCanvasElement;
//       if (!ctx) return;

//       new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels,
//           datasets: [{
//             data: values,
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.6)',
//               'rgba(54, 162, 235, 0.6)',
//               'rgba(255, 206, 86, 0.6)',
//               'rgba(75, 192, 192, 0.6)',
//               'rgba(153, 102, 255, 0.6)'
//             ],
//             borderColor: 'rgba(255, 255, 255, 0.8)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: { position: 'top' },
//             tooltip: {
//               callbacks: {
//                 label: (tooltipItem) => {
//                   const value = tooltipItem.raw as number;
//                   const percentage = ((value / total) * 100).toFixed(2);
//                   return `${tooltipItem.label}: ${percentage}%`;
//                 }
//               }
//             },
//             datalabels: {
//               color: '#fff',
//               font: { weight: 'bold' },
//               formatter: (value: number) => {
//                 const percentage = (value / total) * 100;
//                 return `${percentage.toFixed(1)}%`;
//               }
//             }
//           }
//         },
//         plugins: [ChartDataLabels]
//       });
//     }
//   }

//   tryRenderUserLoginsLineChart(): void {
//     if (!this.userLoginsByDay.length) return;

//     const labels = this.userLoginsByDay.map(item => item.day);
//     const values = this.userLoginsByDay.map(item => item.count);

//     const ctx = document.getElementById('userLoginsLineChart') as HTMLCanvasElement;
//     if (!ctx) return;

//     new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels,
//         datasets: [{
//           label: 'מספר התחברויות',
//           data: values,
//           fill: false,
//           borderColor: 'rgba(255, 99, 132, 1)',
//           tension: 0.3
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: { precision: 0 }
//           }
//         }
//       }
//     });
//   }
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
import { Chart, registerables } from 'chart.js';
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

  totalTemplates: number = 0;
  totalFields: number = 0;
  activeUsersToday: number = 0;

  templatesByCategoryLabels: string[] = [];
  templatesByCategoryData: number[] = [];
  dailyLoginsLabels: string[] = [];
  dailyLoginsData: number[] = [];
  dailyActiveUsersLabels: string[] = [];
  dailyActiveUsersData: number[] = [];

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    // Fetch total templates
    // this.analyticsService.getTotalTemplates().subscribe(count => {
    //   this.totalTemplates = count;
    // });
    // console.log("after getTotalTemplates");
    

    // Fetch total fields
//     this.analyticsService.getTotalFields().subscribe(count => {
//       this.totalFields = count;
//     });
// console.log("after getTotalFields");

    // Fetch templates by category
    this.analyticsService.getTemplatesByCategory().subscribe(data => {
      console.log("in getTemplatesByCategory");

      this.templatesByCategoryLabels = data.map(d => d.categoryName); // Use categoryName or fallback
      console.log("templatesByCategoryLabels");
      console.log(this.templatesByCategoryLabels);

      this.templatesByCategoryData = data.map(d => d.count);
      console.log("in subscribe in getTemplatesByCategory");
      
    });
    console.log("after getTemplatesByCategory");
    

    // Fetch daily logins
    this.analyticsService.getDailyLogins().subscribe(data => {
      this.dailyLoginsLabels = data.map(d => new Date(d.date).toLocaleDateString('he-IL')); // Display only the date
      this.dailyLoginsData = data.map(d => d.count);
    });

    console.log("after getDailyLogins");
    
    // Fetch daily active users
    this.analyticsService.getDailyActiveUsers().subscribe(data => {
      this.dailyActiveUsersLabels = data.map(d => new Date(d.date).toLocaleDateString('he-IL')); // Display date
      this.dailyActiveUsersData = data.map(d => d.count); // Active users count
    });
    console.log("after getDailyActiveUsers");
    
  }
}
