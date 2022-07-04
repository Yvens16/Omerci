export interface IInfoModal {
  children?: React.ReactNode,
  show: boolean,
  closeModal():void,
  titleHtml: React.ReactNode,
  customClass?: string,
  blurClass?: string,
}

export interface IModal {
  children: React.ReactNode,
  show: boolean,
  closeModal(): void,
  customClass: string,
  whichIcon?: string,
}