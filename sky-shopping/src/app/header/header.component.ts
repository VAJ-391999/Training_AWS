import { select } from '@angular-redux/store';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserTokenPayload } from '../shared/types/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  logout = new EventEmitter();

  @select('user') user!: Observable<UserTokenPayload>;

  role!: string;
  userEmail!: string;
  userSubscription!: Subscription;

  constructor(private readonly router: Router) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((response) => {
      console.log('redux user', response);
      this.role = response ? response.role : '';
      this.userEmail = response ? response.email : '';
    });
  }

  onLogout = () => {
    console.log('Logout');
    this.router.navigate(['login']);
    this.logout.emit();
  };
}
