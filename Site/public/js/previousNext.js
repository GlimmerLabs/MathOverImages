
/* This script and many more are available free online at
The JavaScript Source :: http://www.javascriptsource.com
Created by: Solomon, the Sleuth :: http://www.freewebs.com/thesleuth/scripts/ */
var i = 0;

// Create function to load image
function loadImg(){
  document.imgSrc.src = myImgSrc + myImg[i] + myImgEnd;
}

// Create link function to switch image backward
function prev(){
  if(i<1){
    var l = i
  } else {
    var l = i-=1;
  }
  document.imgSrc.src = myImgSrc + myImg[l] + myImgEnd;
}

// Create link function to switch image forward
function next(){
  if(i>2){
    var l = i
  } else {
    var l = i+=1;
  }
  document.imgSrc.src = myImgSrc + myImg[l] + myImgEnd;
}

// Load function after page loads
window.onload=loadImg;

