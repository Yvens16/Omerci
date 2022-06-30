export interface Information {
  handleInputs: (e:  React.ChangeEvent<HTMLInputElement>) => void,
  handlePhoto: () => void,
  name: string,
  email: string,
}

export interface IEmailSettings {
  handleInputs: (event: React.ChangeEvent<HTMLInputElement>) => void,
  settings: {
    [key: string]: boolean,
  },
}