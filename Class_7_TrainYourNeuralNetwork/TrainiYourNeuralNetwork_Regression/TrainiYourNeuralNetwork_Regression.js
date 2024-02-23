let model;
let state = 'collection';
let outputLabel;

let notes = {
  C: 261.6256,
  D: 293.6648,
  E: 329.6276,
  F: 349.2282,
  G: 391.9954,
  A: 440.0000,
  B: 493.8833
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
    outputs: ['frequency'],
    task: 'regression',
    debug: 'true'
  };

  model = ml5.neuralNetwork(options);
  
  //model.loadData('data/mouse-notes.json', dataLoaded);
  
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
};
  
  model.load(modelInfo, modelLoaded);
  
}


function modelLoaded(){
  console.log('Model was sucessufully Loaded!');
  //this was added only after model load from save
  state = 'prediction';
}


function dataLoaded(){
  console.log('Data was sucessufully Loaded!');
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
  } else if (key == 's') {
    model.saveData('mouse-notes');
  } else if(key == 'm') {
    model.save();
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
  
  //if(state == 'collection') {
  //  let targetFrequency = notes[outputLabel];
  //  let outputs = {
  //    frequency: targetFrequency//outputLabel 
  //  }
    
  //  model.addData(inputs, outputs);
    
  //  stroke(0);
  //  noFill();
  //  ellipse(mouseX, mouseY, 24);
  //  fill(0);
  //  noStroke();
  //  textAlign(CENTER, CENTER);
  //  text(outputLabel, mouseX, mouseY);
    
  //  wave.freq(targetFrequency);
  //  env.play();
    
  //} else 
  
  if (state == 'prediction') {
      model.predict(inputs, gotResults);
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
  text(floor(results[0].value), mouseX, mouseY);
  
   wave.freq(notes[results[0].value]);
   env.play();
    
}
