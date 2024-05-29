class Puzzle
{
    constructor(image, piecesX, piecesY)
    {
        this.image = image;
        this.piecesX = piecesX;
        this.piecesY = piecesY;

        this.pieces = []
        this.movingPieces = [];

        // Sets the image and board to the same size in every game
        this.image.resize(1280, 720);

        this.calculatePieceSize();

        this.ratio = image.width;
        this.boardWidth = image.width;
        this.boardHeight = image.height;
        this.boardX = (width - image.width) / 2;
        this.boardY = (height - image.height) / 2;

        for(let x = 0; x < this.piecesX; x++)
        {
            this.pieces[x] = [];
        }

        this.generatePieces();

        this.assignDots();
    }

    getBoardValues()
    {
        return {
            x: this.boardX, 
            y: this.boardY,
            width: this.boardWidth,
            height: this.boardHeight
        };
    }

    assignDots()
    {
        for (let x = 0; x < this.piecesX; x++)
        {
            let beforeDownDot = int(random(0,2))
            this.pieces[x][0].addSide(3,beforeDownDot);
            for (let y = 1; y < this.piecesY; y++)
            {
                if (beforeDownDot == 1) 
                {
                    this.pieces[x][y].addSide(2,0);
                } else
                {
                    this.pieces[x][y].addSide(2,1);
                }

                if ((y < this.piecesY - 1))
                {
                    beforeDownDot = int(random(0,2));
                    this.pieces[x][y].addSide(3, beforeDownDot);
                }
            }
        }
        for (let y = 0; y < this.piecesY; y++)
        {
            let beforeRightDot = int(random(0,2));
            this.pieces[0][y].addSide(1,beforeRightDot);
            for (let x = 1; x < this.piecesX; x++)
            {
                if (beforeRightDot == 1) 
                {
                    this.pieces[x][y].addSide(0,0);
                } else
                {
                    this.pieces[x][y].addSide(0,1);
                }

                if ((x < this.piecesX - 1))
                {
                    beforeRightDot = int(random(0,2));
                    this.pieces[x][y].addSide(1, beforeRightDot);
                }
            }
        }
    }

    calculatePieceSize() 
    {
        //Cut off some of the picture if the wished number of pieces doesn't fit the size of the picture
        if(!Number.isInteger(this.image.width / this.piecesX))
        {
            this.image.resize(this.image.width - (this.image.width % this.piecesX), this.image.height);
        }
        
        //Cut off some of the picture if the wished number of pieces doesn't fit the size of the picture
        if(!Number.isInteger(this.image.height / this.piecesY))
        {
            this.image.resize(this.image.width, this.image.height - (this.image.height % this.piecesY));
        }

        //Calculates the size of the pieces and number of pieces
        this.piecesHeightNorm = this.image.height / this.piecesY;
        this.piecesWidthNorm = this.image.width / this.piecesX;
    }

    generatePieces()
    {
        for(let y = 0; y < this.piecesY; y++)
        {
            for(let x = 0; x < this.piecesX; x++)
            {
                this.pieces[x][y] = new Piece(this.image, x, y, this.piecesWidthNorm, this.piecesHeightNorm, this);
            }
        }
    }

    draw()
    {
        //Draws the board
        rect(this.boardX, this.boardY, this.boardWidth, this.boardHeight);
    }

    isSolved()
    {
        for(let x = 0; x < this.pieces.length; x++)
        {
            for(let y = 0; y < this.pieces[0].length; y++)
            {
                if(!this.pieces[x][y].checkIfPieceIsCorrect())
                {
                    return false;
                }
            }
        }
        return true;
    }
}