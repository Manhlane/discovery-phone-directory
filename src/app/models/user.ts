import { Contact } from "./contact";

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  contacts: Contact[];
}
