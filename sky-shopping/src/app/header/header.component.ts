import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  logout = new EventEmitter();

  role!: string;
  userSubscription!: Subscription;
  isLoggedIn!: boolean;

  constructor(private readonly authService: AuthService) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe({
      next: (response) => {
        console.log('user', response);
        this.role = response ? response.role : '';
      },
    });
  }

  onLogout = () => {
    this.logout.emit();
  };
}
