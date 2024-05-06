let img, hej;

function preload() {
  img = loadImage("Images\\Cameleon.png");
  img.loadPixels();
}

function setup() 
{
  createCanvas(1920, 1080);
  
  pice = new Piece(img,0,0,img.width/4,img.height/4);
}

function draw()
{
  background(220);
  image(img,100,100);
  image(pice.imagePiece,500,500);
}
