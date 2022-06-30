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