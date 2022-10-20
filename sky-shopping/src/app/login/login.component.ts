import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX_PATTERN } from '../shared/common/regex-pattern';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: boolean = false;
  message: string = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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
    console.log('Login form', form);
    this.authService
      .userLogin({
        email: form.value.email,
        password: form.value.password,
      })
      .subscribe({
        next: (data) => {
          this.error = data.error;
          this.message = data.message;
          console.log('DAta', data.data);
        },
        error: (error) => {
          window.alert(error);
        },
        complete: () => {
          this.router.navigate(['/products']);
        },
      });
  };

  onHome = () => {
    this.router.navigate(['']);
  };
}
