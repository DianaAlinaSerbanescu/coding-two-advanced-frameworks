let video;
let poseNet;
let pose;
let skeleton;


function setup() { 
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
    console.log(poses);
    if(poses.length > 0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded(){
    console.log('poseNet Ready');
}

// the draw function is needed because now teh video will loop and craete a frame in real-time
function draw() {
    image(video, 0, 0);

    if(pose){
        fill(0, 0, 255);
        ellipse(pose.nose.x, pose.nose.y, 24);
        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 24);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 24);

        for(let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 255);
            ellipse(x, y, 16, 16);
        }
        for(let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}
