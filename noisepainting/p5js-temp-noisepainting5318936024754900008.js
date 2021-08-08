var strokeLength = 35; 
var strokeThickness = 10;
var noiseScale = 0.005;

var imgNames = ["data/mndl.jpeg"];
var imgs = [];
var imgIndex = -1;

var drawLength = 250;
var frame;


function preload() {
  for (let i = 0; i < imgNames.length; i++) {
    imgs.push(loadImage(imgNames[i]));
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  changeImage();
}


function draw() {
  if (frame > drawLength) {
    return;
  }
  
  let img = imgs[imgIndex];
  
  translate(
    width / 2 - img.width / 2,
    height / 2 - img.height / 2
  );
  
  let count = map(frame, 0, drawLength, 2, 80);
  
  for (let i = 0; i < count; i++) {
    let x = int(random(img.width))
    let y = int(random(img.height))

    let index = (y * img.width + x) * 4;

    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    let a = img.pixels[index + 3];

    stroke(r, g, b, a);
    
    let strokeThickness = map(frame, 0, drawLength, 25, 0);
    strokeWeight(strokeThickness);
    
    push();
      translate(x, y)
      let n = noise(x * noiseScale, y * noiseScale);
      rotate(radians(map(n, 0, 1, -180, 180)));
      
      let lengthVariation = random(0.75, 1.25);
      line(0, 0, strokeLength * lengthVariation, 0);
      
      stroke(min(r * 3, 255), min(g * 3, 255), min(b * 3, 255), random(100));
      strokeWeight(strokeThickness * 0.8);
      line(0, -strokeThickness * 0.15, strokeLength * lengthVariation, -strokeThickness * 0.15);
    pop();
  }
  
  frame++;
}


function changeImage() {
  background(255);
  
  frame = 0;
  
  noiseSeed(int(random(1000)));
  
  imgIndex++;
  if (imgIndex >= imgNames.length) {
    imgIndex = 0;
  }
  
  imgs[imgIndex].loadPixels();
}


function keyPressed() {
  changeImage();
}

function mousePressed (){
  saveCanvas('TGBHcollage_###', 'jpg');
}
