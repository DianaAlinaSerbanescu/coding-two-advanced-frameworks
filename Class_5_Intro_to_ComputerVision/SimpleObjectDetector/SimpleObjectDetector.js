let img;
let detector;

// step 1. load image
// pre-load function allows me to load images and pre-trained models without callbacks and everything is ready to go for the setup function
function preload() {
    img = loadImage("./images/cat and dog.jpg");
    // step 2. load the object detector model by using a ObjectDetector method
    detector = ml5.objectDetector('cocossd');
}

// step 4. get results, error first, in case there's an error
function gotDetections(error, results){
    if(error) {
        console.error(error);
    }
    console.log(results);
    // step 5. draw the boxes around the objects
    for(let i = 0; i < results.length; i++){
        let object = results[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        // step 6. add teh labels
        noStroke();
        fill(0);
        textSize(24);
        text(object.label, object.x + 10, object.y - 10);
    }
}

function setup() { 
    createCanvas(1040, 580);
    // logging always helps yo to debug
    console.log(detector);
    image(img, 0, 0);
    // step3. call predict
    detector.detect(img, gotDetections);
}


function draw() {
    // background(220);
}
