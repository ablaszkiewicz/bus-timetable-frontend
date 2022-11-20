export interface User {
  email: string;
  token: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}
