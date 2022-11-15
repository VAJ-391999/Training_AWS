export class WebsocketChat {
  userEmail!: string;
  message!: string;

  constructor(userEmail: string, message: string) {
    this.userEmail = userEmail;
    this.message = message;
  }
}
