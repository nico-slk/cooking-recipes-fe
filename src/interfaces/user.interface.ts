export interface User {
  user: UserClass;
  token: string;
}

export interface UserClass {
  id: string;
  name: string;
  lastname: string;
  email: string;
}
