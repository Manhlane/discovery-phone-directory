import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Component({
  selector: "app-register-user-page",
  templateUrl: "./register-user-page.component.html",
  styleUrls: ["./register-user-page.component.scss"],
})
export class RegisterUserPageComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordIcon: string = "visibility";
  confirmPasswordIcon: string = "visibility";
  spinner: boolean = false;
  error: boolean = false;
  success: boolean = false;
  errorMessage: String = "";
  successMessage: String = "";
  registrationForm: any = this.formBuilder.group({
    name: ["", [Validators.required]],
    surname: ["", [Validators.required]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
      ],
    ],
    password: ["", [Validators.required]],
    confirmPassword: ["", [Validators.required]],
  });

  constructor(
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public registerUser(): void {
    this.spinner = true;
    this.error = false;
    if (
      this.registrationForm.get("password").value !=
      this.registrationForm.get("confirmPassword").value
    ) {
      this.error = true;
      this.spinner = false;
      this.errorMessage = "Please ensure the passwords match";
    } else {
      //Get users in the mock db to check if the user already exists, using the email as the unique field
      this.getUsers().subscribe((users: User[]) => {
        console.log(users);
        users.forEach((user: User) => {
          if (user.email == this.registrationForm.get("email").value) {
            this.spinner = false;
            this.error = true;
            this.errorMessage = "User already exists";
          }
        });

        //Add user to the db
        if (!this.error) {
          this.addUser().subscribe(
            (x) => {
              console.log(x);
              this.spinner = false;
              this.success = true;
              this.successMessage = "User successfully registered";
            },
            (err) => {
              this.spinner = false;
              this.error = true;
              this.errorMessage = "An error has occured, please try again";
            }
          );
        }
      });
    }
  }

  public getUsers() {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`);
  }

  public addUser() {
    return this.httpClient.post<User>(`${environment.apiURL}/users`, {
      name: this.registrationForm.get("name").value,
      surname: this.registrationForm.get("surname").value,
      email: this.registrationForm.get("email").value,
      password: this.registrationForm.get("password").value, //Not enough time
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.registrationForm.controls[control].hasError(error);
  };

  public changePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordIcon =
      this.passwordIcon == "visibility" ? "visibility_off" : "visibility";
  }

  public changeConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.confirmPasswordIcon =
      this.confirmPasswordIcon == "visibility"
        ? "visibility_off"
        : "visibility";
  }

  public gotoLogin(): void {
    this.router.navigate(["/"]);
  }
}
