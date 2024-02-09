let mobilenet;
let puffin;
let label = '';
let labelConfidence = '';


function imageReady() {
    image(puffin,0 ,0 ,width ,height);
}

function modelReady() {
    console.log('Model is ready!!!');
    mobilenet.predict(puffin, gotResults);
}

function gotResults(error , results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        label = results[0].label;
        labelConfidence = nf(results[0].confidence, 0, 2);
    }
}

function setup() {
    createCanvas(640, 480);
     // Load the image and handle CORS
    puffin = createImg('images/rabbit.jpeg', imageReady);
    puffin.attribute('crossorigin', 'anonymous');
    puffin.hide();
    background(0);
    // Initialize the MobileNet model
    mobilenet = ml5.imageClassifier('MobileNet',modelReady);

}

function draw() {
fill(255); // Set text color to black
textSize(48); // Set text size
text('Label: '+ label, 10, height - 100); 
text('Confidence: '+ labelConfidence, 10, height - 30); 
}