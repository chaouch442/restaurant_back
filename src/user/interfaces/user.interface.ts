import { Identifiable } from "src/shared/interfaces/identifiable.interface";

export interface IUser extends Identifiable {
     email: string;
    password: string;
    phoneNumber: string;
    role?: string;
  }
  