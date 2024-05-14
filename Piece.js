class Piece
{
    constructor(image, relativeX, relativeY, widthNorm, heightNorm)
    {
        this.wholeImage = image;
        this.relativeX = relativeX;
        this.relativeY = relativeY;

        this.widthNorm = widthNorm;
        this.heightNorm = heightNorm;

        this.neighbors = {
            up: null,
            down: null,
            left: null,
            right: null
        };

        this.buffer = this.widthNorm/4
        this.imagePiece = createImage(this.widthNorm + this.buffer*2, this.heightNorm + this.buffer*2);
        this.imagePiece.loadPixels();

        this.upperCornerX = random(0, width) - this.buffer;
        this.upperCornerY = random(0, height) - this.buffer;

        this.midX = random(0, width) - this.buffer - this.widthNorm/2;
        this.midY = random(0, height) - this.buffer - this.heightNorm/2;

        // visualisering af buffer
        // for (let i = 0; i < this.imagePiece.pixels.length; i += 4) 
        // {
        //     this.imagePiece.pixels[i] = 255;
        //     this.imagePiece.pixels[i + 1] = 0;
        //     this.imagePiece.pixels[i + 2] = 0;
        //     this.imagePiece.pixels[i + 3] = 255;
        // }

        this.assignPixels();

    }

    draw() 
    {
        image(this.imagePiece, this.upperCornerX - this.buffer, this.upperCornerY - this.buffer);
    }

    // assign the pixels on the new piece to the according pixels on the whole image
    assignPixels()
    {
        for (let y = 0; y < this.heightNorm; y += 1) 
        {
            for (let x = 0; x < this.widthNorm * 4; x += 4) 
            {
                // pixels from the top of piece (with the buffer) down to the start of the picture (without the buffer)
                let topBuffer = this.imagePiece.width * this.buffer * 4;

                // pixels from the side of piece (with the buffer) to the start of the picture on hte x-axis (without the buffer)
                let sideBuffer = this.buffer * 4;

                // pixels from the start of the whole image to the start of the piece on the x-axis
                let wholeImageStartSide = this.relativeX * this.widthNorm * 4;

                // pixels from the start of the whole image to the start of the piece on the y-axis
                let wholeImageStartTop = this.relativeY * this.heightNorm * this.wholeImage.width * 4;

                // assign the pixels on the new piece to the according pixels on the whole image
                this.imagePiece.pixels[topBuffer + sideBuffer + x + y * this.imagePiece.width * 4] = this.wholeImage.pixels[x + y * this.wholeImage.width * 4 + wholeImageStartSide + wholeImageStartTop];
                this.imagePiece.pixels[topBuffer + sideBuffer + x + y * this.imagePiece.width * 4 + 1] = this.wholeImage.pixels[x + 1 + y * this.wholeImage.width * 4 + wholeImageStartSide + wholeImageStartTop];
                this.imagePiece.pixels[topBuffer + sideBuffer + x + y * this.imagePiece.width * 4 + 2] = this.wholeImage.pixels[x + 2 + y * this.wholeImage.width * 4 + wholeImageStartSide + wholeImageStartTop];
                this.imagePiece.pixels[topBuffer + sideBuffer + x + y * this.imagePiece.width * 4 + 3] = 255;
            }
        }
        this.imagePiece.updatePixels();
    }

    // set the image's coordinates to a new posistion
    move(x,y) 
    {
        this.upperCornerX = x - this.widthNorm / 2;
        this.upperCornerY = y - this.heightNorm / 2;
    }

    // return whether the mouse is over the piece
    mouseIsOver() 
    {
        if (mouseX > this.upperCornerX && mouseX < this.upperCornerX + this.widthNorm && mouseY > this.upperCornerY && mouseY < this.upperCornerY + this.heightNorm)
        {
            return true;
        } else
        {
            return false;
        }
    }

    snap(puzzleObj)
    {
        //Snaps the piece to a grid
        this.upperCornerX = round((this.upperCornerX - puzzleObj.getBoardValues().x) / this.widthNorm) * this.widthNorm + puzzleObj.getBoardValues().x;
        this.upperCornerY = round((this.upperCornerY - puzzleObj.getBoardValues().y) / this.heightNorm) * this.heightNorm + puzzleObj.getBoardValues().y;
    }

    // returns whether a piece is inside a puzzle
    isInsideBoard(puzzleObj)
    {
        let boardPos = puzzleObj.getBoardValues();
        if (boardPos.x < (this.upperCornerX + this.widthNorm/2) && 
            boardPos.x + boardPos.width > (this.upperCornerX + this.widthNorm/2) && 
            boardPos.y < (this.upperCornerY + this.heightNorm/2) && 
            boardPos.y + boardPos.height > (this.upperCornerY + this.heightNorm/2)
        )
        {
            return true;
        } else
        {
            return false
        }
    }
}