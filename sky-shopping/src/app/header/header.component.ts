import { select } from '@angular-redux/store';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAuthState } from '../shared/redux/auth.store';
import { TokePayload } from '../shared/types/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  logout = new EventEmitter();

  @select('user') user!: Observable<TokePayload>;

  role!: string;
  userSubscription!: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((response) => {
      console.log('redux user', response);
      this.role = response ? response.role : '';
    });
  }

  onLogout = () => {
    this.logout.emit();
  };
}
