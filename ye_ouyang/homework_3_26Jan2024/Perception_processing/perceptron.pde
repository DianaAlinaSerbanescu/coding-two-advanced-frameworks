//the activation funtion
int sign(float n) {
  if (n >= 0){
    return 1;
  } else {
    return -1;
  }
}

//class write funtion
class Perceptron {
  float [] weights = new float[2]; //deefind weights, there have 2 weight
  float lr = 0.1; //learn rate
  
  //constructor
  Perceptron(){
    //initialize the weights randomly
  for (int i = 0; i < weights.length; i++) {
    weights[i] = random(-1,1); //create random number
    }
  }
  
  int guess(float[] inputs) {
    float sum = 0; //create a variablr called sum and initilize it at zero
    for (int i = 0; i < weights.length; i++) {
      sum += inputs[i]*weights[i];
    }
    int output = sign(sum);
    return output;
  }
  
  //train can receive theres inputs and the known answer so can adjust the weight
  void train(float[] inputs, int target){
    int guess = guess(inputs);
    int error = target - guess;
    
    //tune all the weight
    for (int i = 0; i < weights.length; i++){ //go thought all the weigth
      weights[i] += error * inputs[i] * lr; //all the weight should change
    }
  }
  
}
