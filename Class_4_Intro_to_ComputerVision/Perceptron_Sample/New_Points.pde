class New_Points {

  float x;
  float y;
  
  // constructor
  New_Points(){
    x = random(width);
    y = random(height);
  }
 
   void show(){
    // thickness of a drawing line
    stroke(0);
    fill(255, 255, 255);
    // centred on x and y and has radius 8
    ellipse(x, y, 16, 16);
  }
}
