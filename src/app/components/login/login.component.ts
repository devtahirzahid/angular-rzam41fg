import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  message = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.message = response.message;
        console.log('Login success:', response);
      },
      error: (error) => {
        this.message = error;
        console.error('Login error:', error);
      },
    });
  }
}
