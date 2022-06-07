import React from "react";

export interface IMessageCreation {
  fileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  showWhichView: (view: "default" | "gify" | "unsplash") => void,
  handleMessage: (e:any) => void,
  messageContent: string,
  mediaUrl: string,
  deleteMediaState: () => void,
  fileUrlToShow: {type: string, url: string}
}

export interface IInfo {
  handleInfo: (e:React.SyntheticEvent) => void,
  messageCreatorInfo: { name: string, familyName: string, email: string }
}