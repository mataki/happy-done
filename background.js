var audio = new Audio();
audio.src = "audio/happykids.wav";
audio.load();

function playAudio() {
  console.log('------- playAudio()');
  audio.play();
}

chrome.browserAction.onClicked.addListener(playAudio);
