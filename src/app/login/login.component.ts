import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../style.css'],
  standalone: true,
  imports: [ReactiveFormsModule], 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid', this.loginForm.errors);
      alert('Please fill out the form correctly.');
      return;
    }
    console.log('Login Data:', this.loginForm.value);
    this.http.post('http://127.0.0.1:5000/login', this.loginForm.value).subscribe({
      next: (response) => {
        sessionStorage.setItem('User', this.loginForm.value.username);
        sessionStorage.setItem('IsLogin', JSON.stringify(true));
        console.log('Login successful:', response);
        alert('Login successful!');
        this.router.navigate(['/']);
        setTimeout(() => {
          window.location.reload();
        }, 500);
    
      },
      error: (error) => {
        console.error('Error during login:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password. Please try again.';
          alert(this.errorMessage);
        } else {
          this.errorMessage = error.error?.message || 'Unknown error';
          alert(this.errorMessage);
        }
      },
    });
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
