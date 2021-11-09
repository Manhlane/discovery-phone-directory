import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-delete-contact-dialog",
  templateUrl: "./delete-contact-dialog.component.html",
  styleUrls: ["./delete-contact-dialog.component.scss"],
})
export class DeleteContactDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; surname: string }
  ) {}

  ngOnInit(): void {}
}
