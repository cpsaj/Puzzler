class Puzzle
{
    constructor(image, piecesX, piecesY)
    {
        this.image = image;
        this.piecesX = piecesX;
        this.piecesY = piecesY;

        this.pieces = []

        for(let x = 0; x < this.piecesX; x++)
        {
            this.pieces[x] = [];
        }

        this.calculatePieceSize();
        this.generatePieces();
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
                this.pieces[x][y] = new Piece(this.image, x, y, this.piecesWidthNorm, this.piecesHeightNorm);
            }
        }
    }
}