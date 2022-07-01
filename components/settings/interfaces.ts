export interface Information {
  handleInputs: (e:  React.ChangeEvent<HTMLInputElement>) => void,
  handlePhoto: (e: any) => void,
  name: string,
  email: string,
  onFileClick: () => void,
  photoUrl: string,
}

export interface IEmailSettings {
  handleInputs: (event: React.ChangeEvent<HTMLInputElement>) => void,
  settings: {
    [key: string]: boolean,
  },
}