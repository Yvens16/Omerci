import { IInfoModal } from "@components/modal/interfaces";


// enum EditRight {
//   ADMIN = "canDelete",
//   PARTICIPANT = "nothing",
//   GOD = "GOD"
// }
export interface IMessage {
  media: {type: string, url: string},
  editRight: "modifyAndDelete" | "delete" | "nothing" | "",
  owner: { familyName: string, name: string, email: string },
  createdDate: string,
  message: string,
  toggleModal: () => void,
  toggleDeleteModal: () => void,
  messageId: string,
  children?: React.ReactElement,
  showDesktopOption?: boolean,
}

export interface IParams {
  isAdmin: boolean,
  photoUrl: string,
  backgroundUrl: string,
  cardTitle: string,
  receiverName: string,
  messageNumber: number,
  moneyCount: number,
  teamName: string,
  goToCreateMessage: () => void,
  toggleParamsModal: () => void,
}

export interface IAddNewMessage {
  children: React.ReactNode,
  borderType: string,
}

export interface IShareLinkModal {
  url: string,
  show: boolean,
  closeModal: () => void,
}

export interface IModalParams {
  show: boolean,
  closeModal: () => void,
  photoUrl: string,
  backgrounds: string[],
  cardTitle: string,
  receiverName: string,
  teamName: string,
  expirationDay: string,
  expirationMonth: string,
  expirationYear: string,
  handleChangeInput: React.ChangeEventHandler<HTMLInputElement>,
  handleSelectChange: any,
  dates: any,
  values: any,
  handlePhotoCLick?: () => void,
  fileChange?: (e: any) => void,
  selectedPhotoFile: string,
  cancel: () => void,
  validate: () => void
}

export interface IOnboardingModal extends IInfoModal {
  cardCreator: string,
  cardTitle: string,
  numberOfMsg: number,
  moneyCount: number,
  isAdmin: boolean,
  photoUrl: string,
  recipientName: string,
}

export interface IHeader {
  goTo : () => void,
  goBack: () => void,
  isAdmin: boolean,
}