export function playSound() {
    console.log("Trying to play sound");
    const audio = new Audio('/assets/sounds/notification.mp3');
    audio.play();
  }
  