import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { REGEX_PATTERN } from '../shared/common/regex-pattern';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  error: boolean = false;
  message: string = '';
  userSubscription!: Subscription;
  role!: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}
  ngOnDestroy(): void {
    console.log('Login unsubscribe');
    // this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log('Data');
      this.router.navigate(['/user']);
    }
    this.onInit();
  }

  onInit = () => {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(REGEX_PATTERN.password)],
      ],
    });
  };

  onSubmit = (form: FormGroup) => {
    this.authService
      .userLogin({
        email: form.value.email,
        password: form.value.password,
      })
      .subscribe({
        next: (data) => {
          this.error = data.error;
          this.message = data.message;
        },
        error: (error) => {
          window.alert(error);
        },
        complete: () => {
          this.router.navigate(['/user']);
        },
      });
  };

  onHome = () => {
    this.router.navigate(['']);
  };
}
