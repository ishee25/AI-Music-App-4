song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_rightWrist = 0;
score_leftWrist = 0;
song_status = "";

function preload(){
    song1 = loadSound("lush_life.mp4");
    song2 = loadSound("fireworks.mp4");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet Is Intialized!");
}

function draw(){
    image(video, 0, 0, 600, 500);

    song_status = song1.isPlaying();

    fill("#fc036f");
    stroke("#fc036f");

    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 25);
        song2.stop();   

        if(song_status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name - Lush Life";
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + score_leftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }
}