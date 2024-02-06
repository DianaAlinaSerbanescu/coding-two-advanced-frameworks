let video;
let detector;
let detections = [];

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
    detections = results;
    detector.detect(video, gotDetections);
}

function setup() { 
    createCanvas(640, 440);
    video = createCapture(VIDEO);
    // set the size of the video the same as teh canvas
    video.size(640, 440);
    video.hide();
    // logging always helps yo to debug
    // console.log(detector);
    // image(img, 0, 0);
    // step3. call predict
    detector.detect(video, gotDetections);
}

// the draw function is needed because now teh video will loop and craete a frame in real-time
function draw() {
    // background(220);
    image(video, 0, 0);
    // step 5. draw the boxes around the objects
    for(let i = 0; i < detections.length; i++){
        let object = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
         // 255 means 100% opacity.
        fill(0, 255,0,55);
        rect(object.x, object.y, object.width, object.height);
        // step 6. add teh labels
        noStroke();
        fill(0);
        textSize(24);
        text(object.label + ", " + object.confidence, object.x + 10, object.y - 10);
    }
}
