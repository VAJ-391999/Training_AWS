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
  roleSubscription!: Subscription;
  isLoggedIn!: boolean;

  constructor(private readonly authService: AuthService) {}
  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.roleSubscription = this.authService.role.subscribe({
      next: (response) => {
        console.log('role', response);
        this.role = response;
      },
    });
  }

  onLogout = () => {
    this.logout.emit();
  };
}
