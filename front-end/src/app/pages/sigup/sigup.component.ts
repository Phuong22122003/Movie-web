import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-sigup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sigup.component.html',
  styleUrl: './sigup.component.scss'
})
export class SigupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.signupForm.get('username')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const payload = this.signupForm.value;
      console.log('Signup Payload:', payload);
      // TODO: Send payload to backend (e.g., via HttpClient)
      this.authService.sigup(this.signupForm.value).subscribe((res) => {
        localStorage.removeItem('jwt');
        this.router.navigateByUrl('/login');
      })
    }
  }
}
