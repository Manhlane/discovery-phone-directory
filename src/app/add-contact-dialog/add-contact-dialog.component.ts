import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { environment } from "src/environments/environment.prod";
import { User } from "../models/user";
import { UserStorage } from "../storage/user-storage";

@Component({
  selector: "app-add-contact-dialog",
  templateUrl: "./add-contact-dialog.component.html",
  styleUrls: ["./add-contact-dialog.component.scss"],
})
export class AddContactDialogComponent implements OnInit {
  newContactForm: any = this.formBuilder.group({
    name: ["", [Validators.required]],
    surname: ["", [Validators.required]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
      ],
    ],
    phoneNumber: [
      "",
      [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
    ],
  });
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userStorage: UserStorage
  ) {}

  ngOnInit(): void {}

  public errorHandling = (control: string, error: string) => {
    return this.newContactForm.controls[control].hasError(error);
  };

  public submitForm() {
    console.log("submit form");
    this.httpClient
      .post(`${environment.apiURL}/contacts`, {
        name: this.newContactForm.get("name").value,
        surname: this.newContactForm.get("surname").value,
        email: this.newContactForm.get("email").value,
        phoneNumber: this.newContactForm.get("phoneNumber").value,
        userId: this.userStorage.getId(),
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
