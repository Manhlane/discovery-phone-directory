import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { User } from "../models/user";
import { UserStorage } from "../storage/user-storage";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  icon: string = "visibility";
  showPassword: boolean = false;
  errorMessage: String = "";
  error: boolean = false;
  spinner: boolean = false;
  userExists: boolean = false;
  success: boolean = false;

  loginForm: any = this.formBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
      ],
    ],
    password: ["", [Validators.required]],
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userStorage: UserStorage
  ) {}

  ngOnInit(): void {}

  public changeVisibility(): void {
    this.showPassword = !this.showPassword;
    this.icon = this.icon == "visibility" ? "visibility_off" : "visibility";
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };

  public logIn() {
    this.spinner = true;

    //fetch users in the db
    this.getUsers().subscribe((users: User[]) => {
      if (users.length == 0) {
        this.spinner = false;
        this.error = true;
        this.errorMessage = "User does not exist";
      }

      users.forEach((user) => {
        if (user.email == this.loginForm.get("email").value) {
          this.userExists = true;
          if (user.password == this.loginForm.get("password").value) {
            this.error = false;
            this.success = true;
            this.userStorage.setName(user.name);
            this.userStorage.setSurname(user.surname);
            this.userStorage.setPassword(user.password);
            this.userStorage.setEmail(user.email);
            this.userStorage.setId(user.id);
            this.router.navigate(["/home"]);
          }
          this.spinner = false;
          this.error = true;
          this.errorMessage = "Invalid email/password";
        }
        if (!this.error) {
          this.spinner = false;
          this.error = true;
          this.errorMessage = "User does not exist";
        }
      });
    });
  }

  public getUsers() {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`);
  }

  public registerUser(): void {
    this.router.navigate(["/register-user"]);
  }
}
