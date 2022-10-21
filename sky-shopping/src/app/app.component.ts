import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sky-shopping';
  authSubscription!: Subscription;
  isAuthenticated!: boolean;

  constructor(private readonly authService: AuthService) {}
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated.subscribe({
      next: (response) => {
        console.log('isauth', response);
        this.isAuthenticated = response;
      },
    });
  }

  onLogout = () => {
    this.authService.userLogout();
  };
}
