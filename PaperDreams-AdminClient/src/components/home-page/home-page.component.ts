import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  implements OnInit, OnDestroy {
  animatedNumbers: number[] = [0, 0, 0];
  private animationIntervals: any[] = [];

  stats = [
    { number: 50000, label: 'הזמנות נוצרו', suffix: '+' },
    { number: 15000, label: 'לקוחות מרוצים', suffix: '+' },
    { number: 500, label: 'תבניות זמינות', suffix: '+' }
  ];

  features = [
    {
      icon: '🎨',
      title: 'עיצוב מקצוני',
      description: 'תבניות מעוצבות וכלים מתקדמים לעיצוב אישי'
    },
    {
      icon: '⚡',
      title: 'מהירות וקלות',
      description: 'ממשק פשוט ליצירת הזמנות תוך דקות'
    },
    {
      icon: '📱',
      title: 'חוויה דיגיטלית',
      description: 'הזמנות אינטראקטיביות עם אנימציות מדהימות'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animateNumbers();
    }, 500);
  }

  ngOnDestroy(): void {
    this.animationIntervals.forEach(interval => {
      if (interval) {
        clearInterval(interval);
      }
    });
  }

  private animateNumbers(): void {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    this.stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.number / steps;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(interval);
        }
        
        this.animatedNumbers[index] = Math.floor(current);
      }, stepDuration);

      this.animationIntervals.push(interval);
    });
  }

  onGetStarted(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/analytics']); // הנתיב שאת רוצה שיפתח למשתמש מחובר
    } else {
      this.router.navigate(['/login']);
    }
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}