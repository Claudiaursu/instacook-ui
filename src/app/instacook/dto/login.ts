export class LoginDto {
  username?: string;
  password?: string;

  constructor (username: any, password: any) {
    this.username = username;
    this.password = password
  }
}
