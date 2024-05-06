let img, hej;

function preload() {
  img = loadImage("Images\\Cameleon.png");
}

function setup() 
{
  createCanvas(1920, 1080);

  img.loadPixels();

  
  pice = new Piece(img,2,2,img.width/4,img.height/4);
}

function draw()
{
  background(220);
  image(img,100,100);
  image(pice.imagePiece,100 - pice.buffer + pice.relativeX * pice.widthNorm,100 - pice.buffer + pice.relativeY * pice.heightNorm);
}
