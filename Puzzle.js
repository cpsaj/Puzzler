class Puzzle
{
    constructor(image, piecesX, piecesY)
    {
        this.image = image;
        this.piecesX = piecesX;
        this.piecesY = piecesY;
        this.correctPieces = 0;

        this.pieces = []
        this.movingPieces = [];

        this.boardWidth = image.width;
        this.boardHeight = image.height;
        this.boardX = (width - image.width) / 2;
        this.boardY = (height - image.height) / 2;

        for(let x = 0; x < this.piecesX; x++)
        {
            this.pieces[x] = [];
        }

        this.calculatePieceSize();
        this.generatePieces();
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

    pieceIsCorrect(addToCorrectPieces)
    {
        this.correctPieces++;
        console.log(this.correctPieces);

        if(this.correctPieces == this.piecesX * this.piecesY)
        {
            console.log("Puzzle finished!!!");
        }
    }
}