import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX_PATTERN } from '../shared/common/regex-pattern';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  error: boolean = false;
  message: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.onInit();
  }

  onInit = () => {
    this.registrationForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATTERN.name),
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATTERN.name),
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
      middleName: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATTERN.name),
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(REGEX_PATTERN.phoneNumber)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATTERN.password),
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATTERN.password),
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  };

  onSubmit = (form: FormGroup) => {
    console.log(form);
    this.userService
      .createUser({
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        middleName: form.value.middleName,
        email: form.value.email,
        phoneNumber: form.value.phoneNumber,
        password: form.value.password,
      })
      .subscribe((res) => {
        this.error = res.error;
        this.message = res.message;
        if (res.data) {
          this.router.navigate(['/login']);
        }
      });
  };

  onHome = () => {
    this.router.navigate(['']);
  };
}
