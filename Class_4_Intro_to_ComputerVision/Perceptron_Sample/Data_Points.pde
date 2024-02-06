class Points {
  float x;
  float y;
  int label;
  
  // constructor
  Points(){
    x = random(width);
    y = random(height);
  
    if (x > y){
      label = 1;
    } else {
      label = -1;
    }
  }
 
   void show(){
    // thickness of a drawing line
    stroke(255, 0, 0);
    
    if (label > 0) {
      fill(255, 0, 0);
    } else {
      fill(0, 0, 255);
    }
    // centred on x and y and has radius 8
    ellipse(x, y, 8, 8);
  }
}
