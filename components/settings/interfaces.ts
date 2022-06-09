export interface Information {
  handleInputs: () => void,
  handlePhoto: () => void,
  name: string,
  email: string,
}

export interface IEmailSettings {
  handleInputs: () => void,
  settings: {
    [key: string]: boolean,
  },
}