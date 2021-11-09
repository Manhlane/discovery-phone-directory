import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Contact } from "../models/contact";
import { User } from "../models/user";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddContactDialogComponent } from "../add-contact-dialog/add-contact-dialog.component";
import { EditContactDialogComponent } from "../edit-contact-dialog/edit-contact-dialog.component";
import { DeleteContactDialogComponent } from "../delete-contact-dialog/delete-contact-dialog.component";
import { UserStorage } from "../storage/user-storage";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-home-directory-page",
  templateUrl: "./home-directory-page.component.html",
  styleUrls: ["./home-directory-page.component.scss"],
})
export class HomeDirectoryPageComponent implements OnInit {
  searchText: string = "";
  displayedColumns: string[] = [
    "icon",
    "name",
    "email",
    "phoneNumber",
    "edit",
    "delete",
  ];
  data: Contact[] = [
    {
      name: "manhlane",
      surname: "mamabolo",
      email: "mamabolo.m32@gmail.com",
      phoneNumber: "0658023006",
    },
    {
      name: "maureen",
      surname: "makgolane",
      email: "maureen.makgolane@gmail.com",
      phoneNumber: "0832004419",
    },
    {
      name: "sibusio",
      surname: "masemola",
      email: "sbulink@gmail.com",
      phoneNumber: "0746253384",
    },
    {
      name: "Given",
      surname: "Hlanganiso",
      email: "gwengiven@gmail.com",
      phoneNumber: "0849673505",
    },
    {
      name: "justinus",
      surname: "Bokaba",
      email: "justinusjay@gmail.com",
      phoneNumber: "0780955965",
    },
  ];
  dataSource = new MatTableDataSource();
  firstname: String = "";
  lastname: String = "";
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userStorage: UserStorage,
    private httpClient: HttpClient
  ) {
    this.firstname = this.userStorage.getName();
    this.lastname = this.userStorage.getSurname();
    this.httpClient
      .get(`${environment.apiURL}/contacts?userId=` + this.userStorage.getId())
      .subscribe((x: any) => {
        console.log(x);
        this.dataSource = new MatTableDataSource(x);
      });
  }

  ngOnInit(): void {}

  public doLogout() {
    this.router.navigate(["/"]);
  }

  public delete(): void {
    console.log("delete");
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addContact(): void {
    console.log("addContact");
    var dialogRef = this.dialog.open(AddContactDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.httpClient
        .get(
          `${environment.apiURL}/contacts?userId=` + this.userStorage.getId()
        )
        .subscribe((x: any) => {
          console.log(x);
          this.dataSource = new MatTableDataSource(x);
        });
    });
  }

  public editContact(element: any): void {
    var dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: {
        name: element.name,
        surname: element.surname,
        email: element.email,
        phoneNumber: element.phoneNumber,
        id: element.id,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        this.httpClient
          .get(
            `${environment.apiURL}/contacts?userId=` + this.userStorage.getId()
          )
          .subscribe((x: any) => {
            console.log(x);
            this.dataSource = new MatTableDataSource(x);
          });
      }
    });
  }

  public deleteContact(element: any): void {
    console.log(element);
    var dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      data: {
        name: element.name,
        surname: element.surname,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        this.httpClient
          .delete(`${environment.apiURL}/contacts/` + element.id)
          .subscribe((x) => {
            this.httpClient
              .get(
                `${environment.apiURL}/contacts?userId=` +
                  this.userStorage.getId()
              )
              .subscribe((x: any) => {
                console.log(x);
                this.dataSource = new MatTableDataSource(x);
              });
          });
      }
    });
  }
}
