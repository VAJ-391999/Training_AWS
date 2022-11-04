import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  @select('isAuthenticated') authStore!: Observable<boolean>;

  constructor(private readonly authService: AuthService) {}
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.authSubscription = this.authStore.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }

  onLogout = () => {
    console.log('app logout');
    this.authService.userLogout();
  };
}
