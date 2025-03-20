import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, // <<-- Add this

    HttpClientModule,
    AppRoutingModule, // <<-- IMPORTANT!
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
