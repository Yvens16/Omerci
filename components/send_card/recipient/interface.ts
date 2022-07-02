export interface IRecipient {
  recipient: string | undefined | string[],
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  confirmEmail: () => void
}