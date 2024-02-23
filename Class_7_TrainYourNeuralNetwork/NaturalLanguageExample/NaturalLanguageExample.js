let speech;

function setup() {
  noCanvas();
  speech = new p5.Speech(voiceReady);
  speech.speak('One upon a time there was a robot.');
}

function voiceReady(){
  console.log('ready!');
}
