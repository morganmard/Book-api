import { Component, inject, OnInit } from '@angular/core';
import { ApiBackend } from '../../Services/api-backend';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [ReactiveFormsModule],
})
export class Login implements OnInit {
  private backend = inject(ApiBackend);
  private router = inject(Router);

  public isRegister: boolean = false;

  errorMessage: string = 'Empty';

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['books']);
    }
  }

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(): void {
    this.errorMessage = 'Empty';
    if (this.loginForm.value.name === '' || this.loginForm.value.password === '') {
      this.errorMessage = 'Invalid';
    } else {
      if (this.isRegister) {
        this.backend.Register(this.loginForm.value).subscribe({
          next: (v) => (this.isRegister = false),
          error: (e) => (this.errorMessage = JSON.stringify(e)),
        });
        this.loginForm.reset();
      } else {
        this.backend.Login(this.loginForm.value).subscribe({
          next: (v) => {
            sessionStorage.setItem('token', v.token), this.router.navigate(['books']);
          },
          error: (e) => (this.errorMessage = JSON.stringify(e)),
        });
        this.loginForm.reset();
      }
    }
  }
}
