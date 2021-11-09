import { User } from "../models/user";

export class UserStorage {
  name: string = "";
  surname: string = "";
  password: string = "";
  email: string = "";
  id: number = -9;

  public getName(): String {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getSurname(): String {
    return this.surname;
  }

  public getEmail(): String {
    return this.email;
  }

  public getPassword(): String {
    return this.password;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setSurname(surname: string) {
    this.surname = surname;
  }
}
