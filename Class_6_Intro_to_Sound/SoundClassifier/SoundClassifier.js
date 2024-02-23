let soundClassifier;
let resultsPara;

function preload(){
  // Options for the SpeechCommands18w model, the default probabilityThreshold is 0
  let options = { probabilityThreshold: 0.7 };
  soundClassifier=ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
  createCanvas(400, 400);
  console.log('ml5 version:', ml5.version);
  resultPara = createP('waiting...');
  resultPara.style('font-size', '32pt');
  soundClassifier.classify(gotResults);
}

function gotResults(error, results){
  if(error) {
    console.log("We got an error");
    console.error(error);
} else {
    resultPara.html(results[0].label+","+results[0].confidence);
  }
}
