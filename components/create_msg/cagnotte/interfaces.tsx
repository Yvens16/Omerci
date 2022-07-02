export interface ICagnotte {
  isCustomAmount: boolean,
  isAmountSelected: boolean,
  commissionValue: number,
  handleCagnotteAmount: (e: any) => void,
  handleCustomAmount: () => void,
  stripeOption?: { clientSecret: string },
  cagnotteAmount: number,
  stripePromise?: any,
  onFileUpload: () => void,
  clientSecret?: string,
  reset: () => void,
  isBtnSelected: {
    [key: string]: boolean,
  }
}
