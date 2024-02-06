let mobilenet;
let input;
let label ='';

function modelReady(){
  console.log('Model is ready!!!!');
  mobilenet.predict(gotResults);
}

function gotResults(error, results){
  if(error){
    console.error(error);
  } else {
    // console.log(results);
    label = results[0].label;
    let probability = results[0].confidence;
    // createP(label);
    // createP(probability);
    mobilenet.classify(gotResults);
  }
}

// function imageReady(){
//   image(input, 0, 0, width, height);
// }

function setup() {
  createCanvas(640, 550);
  input = createCapture(VIDEO);
  input.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', input, modelReady);
}


function draw() {
  background(0);
  image(input, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
