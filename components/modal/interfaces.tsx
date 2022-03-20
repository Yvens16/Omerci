export interface IInfoModal {
  children: React.ReactNode,
  show: boolean,
  closeModal: (whenOpeningOnly?:boolean) => void,
  titleHtml: React.ReactNode,
}

export interface IModal {
  children: React.ReactNode,
  show: boolean,
  closeModal(): void,
  customClass: string,
  whichIcon?: string,
}