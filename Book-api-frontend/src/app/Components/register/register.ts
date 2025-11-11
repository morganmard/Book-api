import { Component, inject, OnInit } from '@angular/core';
import { ApiBackend } from '../../Services/api-backend';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [ReactiveFormsModule],
})
export class Register implements OnInit {
  private backend = inject(ApiBackend);
  public router = inject(Router);

  errorMessage: string = 'Empty';

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['books']);
    }
  }

  registerForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(): void {
    this.errorMessage = 'Empty';
    if (this.registerForm.value.name === '' || this.registerForm.value.password === '') {
      this.errorMessage = 'Invalid';
    } else {
      this.backend.Register(this.registerForm.value).subscribe({
        next: (v) => this.router.navigate(['login']),
        error: (e) => (this.errorMessage = JSON.stringify(e)),
      });
      this.registerForm.reset();
    }
  }
}
