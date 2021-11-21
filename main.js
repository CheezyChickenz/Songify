scoreLeftWrist = 0;
scoreRightWrist = 0;
music = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function setup(){
    canvas = createCanvas(800, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 800, 600);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        music.setVolume(volume);
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            music.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            music.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            music.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            music.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            music.rate(2.5);
        }
        else if(rightWristY > 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 3x";
            music.rate(3);
        }
    }
}

function preload(){
    music = loadSound("timelapse.mp3");
}

function Start(){
   music.play();
   music.setVolume(1);
   music.rate(1);
}

function modelLoaded(){
    console.log("MODEL LOADED!");
}

function gotPoses(result){
    if (result.length > 0) {
        scoreRightWrist = result[0].pose.keypoints[10].score;
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreLeftWrist);
        console.log("Left Wrist X: "+leftWristX+". Left Wrist Y: "+leftWristY);
        console.log("Right Wrist X: "+rightWristX+". Right Wrist Y: "+rightWristY);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
    }
}



