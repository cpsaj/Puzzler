let img, hej, font;

function preload() {
  img = loadImage("Images\\Cameleon.png");
  font = loadFont("Fonts\\Fishfingers.ttf");
  sideImgLeft = loadImage("Images\\Side\\Left.png");
  sideImgRight = loadImage("Images\\Side\\Right.png");
  sideImgTop = loadImage("Images\\Side\\Top.png");
  sideImgBot = loadImage("Images\\Side\\Bot.png");
}

function setup() 
{
  createCanvas(1920, 1080);

  img.loadPixels();
  sideImgLeft.loadPixels();
  sideImgRight.loadPixels();
  sideImgTop.loadPixels();
  sideImgBot.loadPixels();

  
  puzzle = new Puzzle(img, 4, 4);
  gameManager = new GameManager(img, puzzle, font);
}

function draw()
{
  background(220);
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

  for(let i = 0; i < puzzle.movingPieces.length; i++)
  {
    puzzle.movingPieces[i].draw();
  }
  gameManager.draw();
}


function mouseDragged()
{
  for(let i = 0; i < puzzle.movingPieces.length; i++)
  {
    puzzle.movingPieces[i].move(mouseX, mouseY);
  }

}

function mousePressed()
{
  exit_loops:
  for(let i = 0; i < puzzle.pieces[0].length; i++)
  {
    for(let j = 0; j < puzzle.pieces.length; j++)
    {
      if (puzzle.pieces[j][i].mouseIsOver())
      {
        puzzle.movingPieces.push(puzzle.pieces[j][i])
        break exit_loops;
      }
    }
  }
}

function mouseReleased()
{
  for(let i = 0; i < puzzle.movingPieces.length; i++)
    {
      puzzle.movingPieces[i].snap(puzzle);
    }
  puzzle.movingPieces = [];
  if(puzzle.isSolved())
  {
    gameManager.puzzleFinishedPage();
  }
}


