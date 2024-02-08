//this file is canvas                                                                                                 Perceptron p; //change easy name

Perceptron brain; //change a eesy name

Point[] points = new Point[100];

//setting up the sketh
void setup(){
  size(800,800);
  brain = new Perceptron ();
  

  
  for (int i = 0; i < points.length; i++) {
    points[i] = new Point();
  }
  
  
  float[] inputs = {-1,0.5};
  int guess = brain.guess(inputs);
  println(guess);
}


void mousePressed() {
  for (Point pt : points) {
    float[] inputs = {pt.x, pt.y};
    int target = pt.label;
    brain.train(inputs, pt.label); //the train funtion
  }
}

void draw(){
  background(255); //R,G,B (0..255)
  stroke(0);
  line(0,0,width,height);
  
  //no need this loop on train process
  //for (Point pt : points) {
  //  pt.show();
  //}
  
  //train the perception, sent in every piont as input and label
  for (Point pt : points) {
    float[] inputs = {pt.x, pt.y};
    int target = pt.label;
    brain.train(inputs, pt.label); //the train funtion
    
    int guess = brain.guess(inputs);
    if (guess == target) {
      fill(0,255,0);
    } else{
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(pt.x, pt.y, 16 ,16);
    }
    
  //  //pt.show();
  }
  
