var audio = new Audio();
audio.src = "audio/happykids.wav";
audio.load();
var trans = new Audio();

function playAudio() {
  console.log('------- playAudio()');
  audio.play();
}

function playText(text) {
  var encodeText = encodeURI(text);
  var url = "http://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeText + "&tl=ja";
  trans.src = url;
  trans.load();
  trans.play();
}

function clickButton(){
  playAudio();
  playText("Hi");
}

chrome.browserAction.onClicked.addListener(clickButton);
