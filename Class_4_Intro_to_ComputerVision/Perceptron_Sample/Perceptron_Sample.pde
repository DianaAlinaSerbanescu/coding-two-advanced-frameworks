Perceptron perceptron;

Points[] train_points = new Points[1000];

New_Points[] new_points = new New_Points[100];

// setting up the sketch
void setup(){
  size(800, 800);
  perceptron = new Perceptron();
  println("weight0=" + perceptron.weights[0]);
  println("weight1=" + perceptron.weights[1]);
  // generate our training set
  for(int i=0; i<train_points.length; i++) {
    train_points[i] = new Points();
  }
   for(int j=0; j<new_points.length; j++) {
    new_points[j] = new New_Points();
  }
}

// for drawing
void draw(){
  
  // R, G, B (0..255)
 background(0, 255, 0);
 
 for(int i=0; i<train_points.length; i++) {
   //train_points[i].show(); 
   float[] inputs = new float[2];
   inputs[0] = train_points[i].x;
   inputs[1] = train_points[i].y;
   int label = train_points[i].label;
   perceptron.train(inputs,label);
 }
 
 for(int j=0; j<new_points.length; j++) {
   new_points[j].show();
   float[] inputs = new float[2];
   inputs[0] = new_points[j].x;
   inputs[1] = new_points[j].y;
   int current_guess = perceptron.guess(inputs);
   
   if(current_guess > 0) {
     fill(255, 0, 0);
   } else {
     fill(0, 0, 255);
   }
   ellipse(inputs[0], inputs[1], 8, 8);
 }
 saveFrame();
}
