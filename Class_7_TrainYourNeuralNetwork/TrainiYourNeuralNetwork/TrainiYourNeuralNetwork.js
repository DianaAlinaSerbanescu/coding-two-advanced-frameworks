let model;
let state = 'collection';

let notes = {
  C: 261.6256,
  D: 293.6648,
  E: 329.6276
}

let env, wave;

function setup() {
  createCanvas(400, 400);
  stroke(1);
  noFill();
  rect(0, 0, 400, 400);
  
  // for sound to be added at the end
  
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);

  wave =  new p5.Oscillator();
  
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(env);
  
  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
  };

  model = ml5.neuralNetwork(options);
}

function keyPressed(){
  if(key == 't'){
      state = 'training';
      console.log('starting training');
      model.normalizeData();
      let options = {
        epochs: 100
      }
      model.train(options, whileTraining, finishedTraining);
  } else{
    outputLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log('finished training.');
  state = 'prediction';
}

function mousePressed(){
  
  let inputs = {
    x: mouseX, 
    y: mouseY
  }
  
  if(state == 'collection') {
    
    let outputs = {
      label: outputLabel 
    }
    
    model.addData(inputs, outputs);
    
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(outputLabel, mouseX, mouseY);
    
    wave.freq(notes[outputLabel]);
    env.play();
    
  } else if (state == 'prediction') {
      model.classify(inputs, gotResults);
  }
}

function gotResults(error, results){
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  stroke(0);
  fill(0, 0 , 255, 100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(results[0].label, mouseX, mouseY);
  
   wave.freq(notes[results[0].label]);
   env.play();
    
}
