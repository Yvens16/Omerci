export interface IGifySearch {
  showModal: boolean,
  onClose: () => void,
  selectGif?: (url: string) => void,
  mediaRef: React.RefObject<HTMLDivElement>,
}

export interface IUnsplashSearch extends IGifySearch {
  selectPhoto?: (url: string) => void,
}