let img, hej;

function preload() {
  img = loadImage("Images\\Cameleon.png");
}

function setup() 
{
  createCanvas(1920, 1080);

  img.loadPixels();

  
  puzzle = new Puzzle(img, 5, 5);

  // pice = new Piece(img,0,0,img.width/4,img.height/4);
}

function draw()
{
  background(220);
  image(img,100,100);
  image(puzzle.pieces[4][3].imagePiece,100 - puzzle.pieces[0][0].buffer,100 - puzzle.pieces[0][0].buffer);
  // image(pice.imagePiece,100 - pice.buffer + pice.relativeX * pice.widthNorm,100 - pice.buffer + pice.relativeY * pice.heightNorm);
}
