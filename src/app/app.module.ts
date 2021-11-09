import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterUserPageComponent } from "./register-user-page/register-user-page.component";
import { HomeDirectoryPageComponent } from "./home-directory-page/home-directory-page.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { AddContactDialogComponent } from "./add-contact-dialog/add-contact-dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { EditContactDialogComponent } from "./edit-contact-dialog/edit-contact-dialog.component";
import { DeleteContactDialogComponent } from "./delete-contact-dialog/delete-contact-dialog.component";
import { UserStorage } from "./storage/user-storage";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterUserPageComponent,
    HomeDirectoryPageComponent,
    AddContactDialogComponent,
    EditContactDialogComponent,
    DeleteContactDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [UserStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
