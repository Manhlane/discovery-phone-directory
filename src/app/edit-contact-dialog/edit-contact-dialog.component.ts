import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { UserStorage } from "../storage/user-storage";

@Component({
  selector: "app-edit-contact-dialog",
  templateUrl: "./edit-contact-dialog.component.html",
  styleUrls: ["./edit-contact-dialog.component.scss"],
})
export class EditContactDialogComponent implements OnInit {
  editContactForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userStorage: UserStorage,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      surname: string;
      email: string;
      phoneNumber: string;
      id: number;
    }
  ) {
    this.editContactForm = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
      surname: [this.data.surname, [Validators.required]],
      email: [
        this.data.email,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
        ],
      ],
      phoneNumber: [
        this.data.phoneNumber,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.editContactForm.controls[control].hasError(error);
  };

  public submitForm(): void {
    console.log("submitForm");
    this.httpClient
      .put(`${environment.apiURL}/contacts/` + this.data.id, {
        name: this.editContactForm.get("name").value,
        surname: this.editContactForm.get("surname").value,
        email: this.editContactForm.get("email").value,
        phoneNumber: this.editContactForm.get("phoneNumber").value,
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

  ngOnInit(): void {}
}
