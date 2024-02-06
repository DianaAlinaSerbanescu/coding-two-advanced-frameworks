class Perceptron {
 
  float[] weights = new float[2];
  float lr = 0.1;
 
  // The activation function
  int sign(float n){
    if(n >= 0){
      return 1;
    } else {
      return -1;
    }
}

  float body_sum (float[] inputs){
  
      float sum = 0;
      for (int i = 0; i < weights.length; i++){
        sum += inputs[i]*weights[i];
      }
      
      return sum;
  }
  
  int guess(float[] inputs) {
    int output = sign(body_sum(inputs));
    return output;
  }

    // Constructor
  Perceptron() {
    for (int i = 0; i < weights.length; i++ ){
      weights[i] = random(-1,1);
    }
  }
  
  void train(float[] inputs, int label){
    int guess = guess(inputs);
    int error = label - guess;
   
    for (int i=0; i<weights.length; i++) {
      weights[i] += error*inputs[i]*lr;
      println("weight=" + weights[i]);
    }
  }
}
