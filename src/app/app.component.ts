import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      type: ['user', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(24),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,24}$'),
        ],
      ],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.userForm.invalid) return;

    this.isSubmitting = true;

    const user: UserDto = this.userForm.value;

    try {
      const result = await this.createUser(user);
      console.log('User Created:', result);
      this.userForm.reset({ type: 'user' }); // reset form and default type
    } catch (err) {
      console.error(err);
      // No error display required, but we re-enable submission
    } finally {
      this.isSubmitting = false;
    }
  }

  private async createUser(user: UserDto) {
    await new Promise((res) => setTimeout(res, 2500));

    if (Math.random() < 0.5) {
      return Promise.reject('Request Failed');
    }
    return { username: user.username, email: user.email, type: user.type };
  }

  get username() {
    return this.userForm.get('username');
  }
  get email() {
    return this.userForm.get('email');
  }
  get type() {
    return this.userForm.get('type');
  }
  get password() {
    return this.userForm.get('password');
  }
}
