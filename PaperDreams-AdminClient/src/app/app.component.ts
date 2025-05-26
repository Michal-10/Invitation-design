
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatMenuModule,
    MatButtonModule,
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'invitatonLine';
  sidebarCollapsed = false;
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  getPageTitle(): string {
    if (this.currentRoute.includes('/users')) return 'ניהול משתמשים';
    if (this.currentRoute.includes('/templates')) return 'העלאת תבניות';
    if (this.currentRoute.includes('/templates-list')) return 'רשימת תבניות';
    if (this.currentRoute.includes('/analytics')) return 'דוחות ואנליטיקה';
    if (this.currentRoute.includes('/login')) return 'התחברות';
    return 'לוח בקרה';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}