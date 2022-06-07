export function getWinner (player1, player2) {
  const winningNumber = Math.random()
  return winningNumber < 1 / 3
    ? player1
    : winningNumber < 2 / 3
    ? player2
    : null
}


export async function getVideoDuration(selectedFile) {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = URL.createObjectURL(selectedFile);
  video.onloadedmetadata = () => {
      // Duration of the video is only available here
      window.URL.revokeObjectURL(video.src);
      console.log("Duration : " + video.duration + " seconds");
  }
}