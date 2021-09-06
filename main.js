img="";
status="";
objects=[];
function preload(){
    img=loadImage('dog_cat.jpg');
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}
function modelLoaded(){
    console.log("model Loaded");
    status=true;
    
}
function gotResult(error,results){
   if(error){
    console.log(error);
   }
   else{
    console.log(results);
    objects=results;
   }
}
function draw(){
    image(video,0,0,640,420);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : object detected foot bot ";
            document.getElementById("number_of_object").innerHTML="number of objects detected:"+objects.length;
            fill(r,g,b);
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+""+percentage+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
