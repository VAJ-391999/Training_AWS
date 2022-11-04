import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { REGEX_PATTERN } from '../shared/common/regex-pattern';
import { AuthService } from '../shared/services/auth.service';
import { UserTokenPayload } from '../shared/types/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: boolean = false;
  message: string = '';
  @select('user') user!: Observable<UserTokenPayload>;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
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
        complete: () => {
          this.router.navigate(['/user']);
        },
      });
  };

  onHome = () => {
    this.router.navigate(['']);
  };
}
