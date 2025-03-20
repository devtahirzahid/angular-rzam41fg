import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

interface UserDto {
  username: string;
  email: string;
  type: "user" | "admin";
  password: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  isSubmitting: boolean = false;
  message: string = "";
  messageType: "success" | "error" | "" = ""; // <-- Add this line

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      type: ["user", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(24),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,24}$"),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.isSubmitting = true;

    const user: UserDto = this.userForm.value;

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log("✅ User registered successfully:", response);
        this.message = response.message;
        this.userForm.reset({ type: "user" });
        this.messageType = "success"; // <-- Set success type
        this.clearMessageAfterDelay();
      },
      error: (err) => {
        console.error("❌ Registration failed:", err);
        this.message = err.message || "Registration failed. Please try again.";
        this.isSubmitting = false;
        this.messageType = "error"; // <-- Set error type
        this.clearMessageAfterDelay();
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = "";
      this.messageType = "";
    }, 3000); // Clear message after 3 seconds
  }

  get username() {
    return this.userForm.get("username");
  }
  get email() {
    return this.userForm.get("email");
  }
  get type() {
    return this.userForm.get("type");
  }
  get password() {
    return this.userForm.get("password");
  }
}
