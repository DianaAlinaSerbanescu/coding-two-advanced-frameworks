let mobilenet;

function modelLoaded(){
  console.log('Model is loaded and I can use it!!!!');
}



function setup() {

 // Initialize the Image Classifier method with MobileNet
 mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);
}



function draw() {

}
