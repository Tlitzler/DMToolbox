export interface IUserObject {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    id?: number; // This is optional because the id will be assigned by the database
  };