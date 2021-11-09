import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeDirectoryPageComponent } from "./home-directory-page/home-directory-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterUserPageComponent } from "./register-user-page/register-user-page.component";

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent,
  },
  {
    path: "register-user",
    component: RegisterUserPageComponent,
  },
  {
    path: "home",
    component: HomeDirectoryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
