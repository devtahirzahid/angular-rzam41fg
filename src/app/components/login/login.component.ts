import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  credentials = {
    username: "",
    password: "",
  };

  message = "";
  messageType: "success" | "error" | "" = "";

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.showMessage(response.message, "success");
        console.log("Login success:", response);
      },
      error: (error) => {
        const errorMessage = error.error?.error || "Login failed";
        this.showMessage(errorMessage, "error");
        console.error("Login error:", error);
      },
    });
  }

  showMessage(message: string, type: "success" | "error") {
    this.message = message;
    this.messageType = type;

    setTimeout(() => {
      this.message = "";
      this.messageType = "";
    }, 3000); // hide message after 3 seconds
  }
}
