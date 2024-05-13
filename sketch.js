let img, hej;
let movingPiece = false;

function preload() {
  img = loadImage("Images\\Cameleon.png");
}

function setup() 
{
  createCanvas(1920, 1080);

  img.loadPixels();

  
  puzzle = new Puzzle(img, 5, 5);
}

function draw()
{
  background(220);
  image(img,100,100);
  //image(puzzle.pieces[4][3].imagePiece,100 - puzzle.pieces[0][0].buffer,100 - puzzle.pieces[0][0].buffer);
  // image(pice.imagePiece,100 - pice.buffer + pice.relativeX * pice.widthNorm,100 - pice.buffer + pice.relativeY * pice.heightNorm);

  //Drawing pieces and board
  puzzle.draw();
  for(let i = 0; i < puzzle.pieces[0].length; i++)
  {
    for(let j = 0; j < puzzle.pieces.length; j++)
    {
      puzzle.pieces[j][i].draw();
    }
  }
}

function mouseDragged()
{
  for(let i = 0; i < puzzle.pieces[0].length; i++)
  {
    for(let j = 0; j < puzzle.pieces.length; j++)
    {
      if (puzzle.pieces[j][i].mouseIsOver())
      {
        puzzle.pieces[j][i].move(mouseX, mouseY)
      }
    }
  }

}


