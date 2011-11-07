/* global console, Audio, chrome, localStorage */

var audioQueue = [];
var stopped = true;

function playNextAudio(){
  console.log('----- playNextAudio');
  var audio = audioQueue.shift();
  if(audio != undefined){
    audio.addEventListener('ended', function(){
      playNextAudio();
    });
    audio.addEventListener('error', function(){
      console.log('[ERROR] audio Error');
      playNextAudio();
    });
    audio.play();
    stopped = false;
  } else {
    stopped = true;
  }
}

function playWithQueue(src){
  var audio = new Audio();
  audio.src = src;
  audio.load();
  audioQueue.push(audio);
  if(stopped){
    playNextAudio();
  }
}

function playAudio() {
  playWithQueue("audio/happykids.wav");
}

function playText(text) {
  console.log('------- playText(): ' + text);
  var encodeText = encodeURI(text);
  var url = "http://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeText + "&tl=ja";
  playWithQueue(url);
}

function getRSS(rss){
  var res;
  var xhr = new XMLHttpRequest();
  var url = localStorage.getItem('rss-url');
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    console.log('---- callback');

    var xml;
    xml = xhr.responseXML;

    if(xml){
      var items = xml.getElementsByTagName('item');
      var matches = getMatchedElements(items);

      cheerItems(matches);
    }
  };
  xhr.send();
}

function clickButton(){
  playAudio();
  playText("Hi");
}

function getMatchedElements(items){
  var matchItems = [];
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var desc = item.getElementsByTagName('description')[0];
    var targetWord = localStorage.getItem('select-regex');
    if (desc.textContent.match(targetWord)) {
      matchItems.push(item);
    }
  }
  return matchItems;
}

function getTextFromItem(item){
  return item.getElementsByTagName('title')[0].textContent;
}

function cheerItems(items){
  for (var i = 0; i < items.length; i++){
    var item = items[i];
    playAudio();
    playText(getTextFromItem(item));
  }
}


chrome.browserAction.onClicked.addListener(clickButton);
