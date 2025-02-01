import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  standalone: false,
  styleUrls: ['./authentication-form.component.css'],
})
export class AuthenticationFormComponent implements OnInit {
  authenticationForm: FormGroup = new FormGroup({});
  isLoginForm: boolean = true;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoginForm = this.router.url === '/login';

    this.authenticationForm = this.formBuilder.group({
      name: [
        { value: '', disabled: this.isLoginForm },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z\s'-]+$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
          ),
        ],
      ],
    });

    if (this.isLoginForm) {
      this.authenticationForm.get('name')?.disable();
    }
  }

  onSubmit(): void {
    if (this.authenticationForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { email, password, name } = this.authenticationForm.value;
      const authObservable = this.isLoginForm
        ? this.authService.loginUser(email, password)
        : this.authService.registerUser(name, email, password);

      authObservable.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['']);
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage =
            error.error.message || 'An unexpected error occurred.';
        },
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
