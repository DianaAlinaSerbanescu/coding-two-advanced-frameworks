let mobilenet;

let input;

function modelReady(){
  console.log('Model is ready!!!!');
  mobilenet.classify(input, gotResults);
}

function gotResults(error, results){
  if(error){
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let probability = results[0].confidence;
    fill(0);
    textSize(64);
   // text(label, 10, height - 50);
    createP(label);
    createP(probability);
  }
}

function imageReady(){
  image(input, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);
  input = createImg('images/kitten.jpeg', imageReady);
  input.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}


function draw() {

}
