class Piece
{
    constructor(image, relativeX, relativeY, widthNorm, heightNorm, puzzleObj)
    {
        this.puzzleObj = puzzleObj;
        this.wholeImage = image;
        this.relativeX = relativeX;
        this.relativeY = relativeY;

        this.widthNorm = widthNorm;
        this.heightNorm = heightNorm;

        this.hasBeenPlacedCorrect = false;
        this.offsetFromCorrectSpotX = 0;
        this.offsetFromCorrectSpotY = 0;
        this.buffer = this.widthNorm/5;
        this.imagePiece = createImage(this.widthNorm + this.buffer*2, this.heightNorm + this.buffer*2);
        this.imagePiece.loadPixels();

        this.boardValues = this.puzzleObj.getBoardValues();
        this.upperCornerX = this.boardValues.x;
        this.upperCornerY = this.boardValues.y;
        while ((this.upperCornerX + this.widthNorm) > this.boardValues.x &&
               this.upperCornerX < (this.boardValues.x + this.boardValues.width) &&
               this.upperCornerY < this.boardValues.y + this.boardValues.height
            )
        {
        this.upperCornerX = random(0, width) - this.buffer;
        this.upperCornerY = random(0, height) - this.buffer;
        }

        this.midX = random(0, width) - this.buffer - this.widthNorm/2;
        this.midY = random(0, height) - this.buffer - this.heightNorm/2;

        this.assignPixels();
    }

    draw() 
    {
        image(this.imagePiece, this.upperCornerX - this.buffer, this.upperCornerY - this.buffer);
        this.checkIfPieceIsCorrect();
    }

    // assign the pixels on the new piece to the according pixels on the whole image
    assignPixels()
    {
        // pixels from the top of piece (with the buffer) down to the start of the picture (without the buffer)
        let topBuffer = this.imagePiece.width * this.buffer * 4;

        // pixels from the side of piece (with the buffer) to the start of the picture on hte x-axis (without the buffer)
        let sideBuffer = this.buffer * 4;

        // pixels from the start of the whole image to the start of the piece on the x-axis
        let wholeImageStartSide = this.relativeX * this.widthNorm * 4;

        // pixels from the start of the whole image to the start of the piece on the y-axis
        let wholeImageStartTop = this.relativeY * this.heightNorm * this.wholeImage.width * 4;

        for (let y = 0; y < this.heightNorm; y += 1) 
        {
            for (let x = 0; x < this.widthNorm * 4; x += 4) 
            {
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

    snap()
    {
        //Snaps the piece to a grid if inside of board
        if(this.isInsideBoard(this.puzzleObj))
        {
            this.upperCornerX = round((this.upperCornerX - this.boardValues.x) / this.widthNorm) * this.widthNorm + this.boardValues.x;
            this.upperCornerY = round((this.upperCornerY - this.boardValues.y) / this.heightNorm) * this.heightNorm + this.boardValues.y;
        }
    }

    // returns whether a piece is inside a puzzle
    isInsideBoard()
    {
        if (this.boardValues.x < (this.upperCornerX + this.widthNorm/2) && 
            this.boardValues.x + this.boardValues.width > (this.upperCornerX + this.widthNorm/2) && 
            this.boardValues.y < (this.upperCornerY + this.heightNorm/2) && 
            this.boardValues.y + this.boardValues.height > (this.upperCornerY + this.heightNorm/2)
        )
        {
            return true;
        } else
        {
            return false
        }
    }

    //Checks if the spot where the piece is placed is correct
    checkIfPieceIsCorrect()
    {
        //Calculates if the spot is correct
        this.offsetFromCorrectSpotX = (this.relativeX * this.widthNorm + this.boardValues.x) - this.upperCornerX;
        this.offsetFromCorrectSpotY = (this.relativeY * this.heightNorm + this.boardValues.y) - this.upperCornerY;
        
        //If it is correct notify the puzzle object
        if(this.puzzleObj.movingPieces.length == 0 && this.offsetFromCorrectSpotX == 0 && this.offsetFromCorrectSpotY == 0)
        {
            return true;
        }
    }

    // adds/removes the side thing that keeps pieces togehter. First input is which side (0: left, 1: right, 2: top, 3: bot), second input is bool of wheter it should add/remove thing
    addSide(side, out)
    {
        sideImgRight.resize(this.buffer, this.imagePiece.height - this.buffer * 2);
        sideImgLeft.resize(this.buffer, this.imagePiece.height - this.buffer * 2);
        sideImgTop.resize(this.widthNorm, this.buffer);
        sideImgBot.resize(this.widthNorm, this.buffer);

        // pixels from the top of piece (with the buffer) down to the start of the picture (without the buffer)
        let topBuffer = this.imagePiece.width * this.buffer * 4;

        // pixels from the top of piece (with the buffer) down to the start of the picture (without the buffer)
        let topBufferWholeImage = this.wholeImage.width * this.buffer * 4;

        // pixels from the start of the whole image to the start of the piece on the x-axis
        let wholeImageStartSide = this.relativeX * this.widthNorm * 4 - this.buffer * 4;

        // pixels from the start of the whole image to the start of the piece on the y-axis
        let wholeImageStartTop = this.relativeY * this.heightNorm * this.wholeImage.width * 4;

        // pixels from the left start of piece (with the buffer) to the right end of the piece (without the buffer)
        let moveRightSideOfPiece = this.widthNorm * 4 + this.buffer * 4;

        // pixels from the left start of piece (with the buffer) to the left start of the piece (without the buffer)
        let moveRightFromBuffer = this.buffer * 4;

        // pixels from the top start of the peice (without the buffer) to the bottom end of the piece (without the buffer)
        let moveToBottomPiece = this.heightNorm * this.imagePiece.width * 4;

        // pixels from the top start of the peice (without the buffer) to the bottom end of the piece (without the buffer) in the whole image
        let moveToBottomWholeImage = this.heightNorm * this.wholeImage.width * 4;
        
        // which side to add/remove the side thing
        switch (side)
        {
            case 0: // Left
                if (out) // outwards poking
                {
                    for (let y = 0; y < sideImgLeft.height; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < sideImgLeft.width * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + topBuffer] =  this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + topBuffer] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + topBuffer] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + topBuffer] = sideImgLeft.pixels[x + 2 + y * sideImgLeft.width * 4];
                        }
                    }
                } else // Inwards poking
                {
                    for (let y = 0; y < sideImgLeft.height; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < sideImgLeft.width * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + topBuffer + moveRightFromBuffer] =  this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + topBuffer + moveRightFromBuffer] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + topBuffer + moveRightFromBuffer] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + topBuffer + moveRightFromBuffer] = (sideImgRight.pixels[x + 2 + y * sideImgLeft.width * 4] < 200) ? 255 : 0;    
                        } 
                    }
                }
                break;
            case 1: // Right
                if (out) // outwards poking
                {
                    for (let y = 0; y < this.widthNorm * 4; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < sideImgRight.width * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + topBuffer + moveRightSideOfPiece] =  this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightSideOfPiece];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + topBuffer + moveRightSideOfPiece] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightSideOfPiece];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + topBuffer + moveRightSideOfPiece] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightSideOfPiece];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + topBuffer + moveRightSideOfPiece] = sideImgRight.pixels[x + 2 + y * sideImgRight.width * 4];
                        }
                    }
                } else // Inwards poking
                {
                    for (let y = 0; y < this.widthNorm * 4; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < sideImgRight.width * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + topBuffer + moveRightSideOfPiece - moveRightFromBuffer] =  this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightSideOfPiece - moveRightFromBuffer];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + topBuffer + moveRightSideOfPiece - moveRightFromBuffer] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightSideOfPiece - moveRightFromBuffer];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + topBuffer + moveRightSideOfPiece - moveRightFromBuffer] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightSideOfPiece - moveRightFromBuffer];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + topBuffer + moveRightSideOfPiece - moveRightFromBuffer] = (sideImgLeft.pixels[x + 2 + y * sideImgLeft.width * 4] < 200) ? 255 : 0;
                        }
                    }
                }
                break;
            case 2: // Top
                if (out) // outwards poking
                {
                    for (let y = 0; y < this.buffer; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < this.widthNorm * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + moveRightFromBuffer] = this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer - topBufferWholeImage];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + moveRightFromBuffer] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer - topBufferWholeImage];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + moveRightFromBuffer] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer - topBufferWholeImage];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + moveRightFromBuffer] = sideImgTop.pixels[x + 2  + y * sideImgTop.width * 4];
                        }
                    }
                } else // Inwards poking
                {
                    for (let y = 0; y < this.buffer; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < this.widthNorm * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + moveRightFromBuffer + topBuffer] = this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + moveRightFromBuffer + topBuffer] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + moveRightFromBuffer + topBuffer] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + moveRightFromBuffer + topBuffer] = (sideImgBot.pixels[x + 2 + y * sideImgBot.width * 4] < 200) ? 255 : 0;
                        }
                    }
                }
                break;
            case 3: // Bot
                if (out) // outwards poking
                {
                    for (let y = 0; y < this.buffer; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < this.widthNorm * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + moveRightFromBuffer + topBuffer + moveToBottomPiece] = this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer + moveToBottomWholeImage];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + moveRightFromBuffer + topBuffer + moveToBottomPiece] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer + moveToBottomWholeImage];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + moveRightFromBuffer + topBuffer + moveToBottomPiece] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer + moveToBottomWholeImage];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + moveRightFromBuffer + topBuffer + moveToBottomPiece] = sideImgBot.pixels[x + 2  + y * sideImgBot.width * 4];
                        
                        }
                    }  
                } else // Inwards poking
                {
                    for (let y = 0; y < this.buffer; y++)
                    {
                        let yMoverPiece = y * this.imagePiece.width * 4;
                        let yMoverWholeImage = y * this.wholeImage.width * 4;
                        for (let x = 0; x < this.widthNorm * 4; x += 4)
                        {
                            this.imagePiece.pixels[x + yMoverPiece + moveRightFromBuffer + moveToBottomPiece] = this.wholeImage.pixels[x + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer + moveToBottomWholeImage - topBufferWholeImage];
                            this.imagePiece.pixels[x + 1 + yMoverPiece + moveRightFromBuffer + moveToBottomPiece] = this.wholeImage.pixels[x + 1 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer + moveToBottomWholeImage - topBufferWholeImage];
                            this.imagePiece.pixels[x + 2 + yMoverPiece + moveRightFromBuffer + moveToBottomPiece] = this.wholeImage.pixels[x + 2 + yMoverWholeImage + wholeImageStartSide + wholeImageStartTop + moveRightFromBuffer + moveToBottomWholeImage - topBufferWholeImage];
                            this.imagePiece.pixels[x + 3 + yMoverPiece + moveRightFromBuffer + moveToBottomPiece] = (sideImgTop.pixels[x + 2 + y * sideImgTop.width * 4] < 200) ? 255 : 0;
                        }
                    }
                }
                break;

        }


        this.imagePiece.updatePixels();
    }
}