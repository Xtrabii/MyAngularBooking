import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-activity',
  templateUrl: './register.component.html',
  styleUrls: ['../../style.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], // Reactive forms module imported
})
export class RegisterComponent {
  registerForm: FormGroup;

  
  
  constructor(private fb: FormBuilder, public http: HttpClient ,private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }
  

  // Custom validator for matching passwords
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onRegister() {
    if (this.registerForm.invalid) {
      console.error('Form is invalid', this.registerForm.errors);
      
      
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          console.error(`${key} is invalid`);
        }
      });
  
      alert('Please fill out the form correctly.');
      return;
    }
  
    console.log('Form Data:', this.registerForm.value);
    
    this.http.post('http://127.0.0.1:5000/register', this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registerForm.reset();
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Error occurred:', error);
        alert(`Registration failed: ${error.error?.message || 'Unknown error'}`);
      },
    });
  }
  
  
}
