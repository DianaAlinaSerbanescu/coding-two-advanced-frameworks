let model;
let targetLabel;
let state = 'collection';


let notes = {
  A: 220.0000,
  B: 246.9417,
  C: 130.8128,
  D: 293.6648
}

let envelope; 
let default_freq = 440;


function setup() {
  createCanvas(400, 400);
   stroke(1);
   noFill();
   rect(0, 0, 400, 400);
  
  // define a piano note
  envelope = new p5.Envelope();
  envelope.setADSR(0.05, 0.1, 0.5, 1);
  envelope.setRange(1.2, 0);
  
  wave = new p5.Oscillator();
  
  wave.setType('sine');
  wave.start();
  wave.freq(default_freq);
  wave.amp(envelope);
  
  // default piano_note ends
  
  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
}
  
  model = ml5.neuralNetwork(options);
}

function keyPressed() {
  targetLabel = key.toUpperCase();
}

function mousePressed(){
 let inputs = {
   x: mouseX,
   y: mouseY
  }
  
  if(state == 'collection') {
    let outputs = {
        label: targetLabel
    }
     stroke(0);
     noFill();
     ellipse(mouseX, mouseY, 25);
     // writing the label 
     fill(0);
     noStroke();
     textAlign(CENTER, CENTER);
     text(targetLabel, mouseX, mouseY);
     
     wave.freq(notes[targetLabel]);
     evelope.play();
  }

}
