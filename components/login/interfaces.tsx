export interface IEnterEmailParams {
  handleEmail(e: any): void;
  handleLogin(): void;
  emailErrorMsg: string;
}

export interface IEmailSent {
  email: string,
  showModal(): void,
  getBack(): void,
}

export interface ISignUp {
  handleName(e: any): void,
  handleSurname(e: any): void,
  handleHowDoyouKnowUs(e: any): void,
  handleRegisterInfo(): void,
  nameEmpty: string,
  surnameEmpty: string,
}

export interface IAlreadyHasAccount {
  surname: string,
  name: string,
  email: string,
}