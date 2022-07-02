import React from "react";

export interface Header {
  buttonContent: string,
  handleback: () => void,
  title: string,
  subtitle: string,
}

export interface ISection {
  title: string,
  children: JSX.Element,
}
export interface IButtonSet {
  cancel: () => void,
  validate: () => void,
  cancelText: string,
  validateText: string,
  isDisabled: boolean,
}