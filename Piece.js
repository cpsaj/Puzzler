class Piece
{
    constructor(image,relativeX, relativeY, widthNorm, heightNorm)
    {
        this.wholeImage = image;
        this.relativeX = relativeX;
        this.relativeY = relativeY;

        this.widthNorm = widthNorm;
        this.heightNorm = heightNorm;

        this.curPosX = random(0, width);
        this.curPosY = random(0, height);
        this.movingPiece = false;

        this.neighbors = {
            up: null,
            down: null,
            left: null,
            right: null
        };

        this.buffer = this.widthNorm/4
        this.imagePiece = createImage(this.widthNorm + this.buffer*2, this.heightNorm + this.buffer*2);
        this.imagePiece.loadPixels();

        // visualisering af buffer
        for (let i = 0; i < this.imagePiece.pixels.length; i += 4) 
        {
            this.imagePiece.pixels[i] = 255;
            this.imagePiece.pixels[i + 1] = 0;
            this.imagePiece.pixels[i + 2] = 0;
            // this.imagePiece.pixels[i + 3] = 255;
        }


        this.assignPixels();
    }

    draw() 
    {
        image(this.imagePiece, this.curPosX, this.curPosY);

        //Check if this object is moving. If yes set position to mouse position
        if(this.movingPiece)
        {
            this.curPosX = mouseX;
            this.curPosY = mouseY;
        }

        //Check if any object is moving. If not set this object to not be moving.
        if(movingPiece == false)
        {
            this.movingPiece = false;
        }
    }

    assignPixels()
    {
        for (let y = 0; y < this.heightNorm; y += 1) 
        {
            for (let x = 0; x < this.widthNorm * 4; x += 4) 
            {
                this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + this.buffer * 4 + this.imagePiece.width * this.buffer * 4] = this.wholeImage.pixels[x + y * this.wholeImage.width * 4 + this.relativeX * this.widthNorm * 4 + this.relativeY * this.heightNorm * this.wholeImage.width * 4];
                this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + 1 + this.buffer * 4 + this.imagePiece.width * this.buffer * 4] = this.wholeImage.pixels[x + 1 + y * this.wholeImage.width * 4 + this.relativeX * this.widthNorm * 4 + this.relativeY * this.heightNorm * this.wholeImage.width * 4];
                this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + 2 + this.buffer * 4 + this.imagePiece.width * this.buffer * 4] = this.wholeImage.pixels[x + 2 + y * this.wholeImage.width * 4 + this.relativeX * this.widthNorm * 4 + this.relativeY * this.heightNorm * this.wholeImage.width * 4];
                this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + 3 + this.buffer * 4 + this.imagePiece.width * this.buffer * 4] = 255;
            }
        }
        this.imagePiece.updatePixels();
    }

    move(x,y) 
    {
        //Check if mouse hovers over this object
        //if(mouseX < (this.curPosX + this.widthNorm) && mouseX > (this.curPosX) && mouseY < (this.curPosY + this.heightNorm) && mouseY > (this.curPosY) && movingPiece == false)
        if(mouseX < (this.curPosX + this.widthNorm) && mouseX > (this.curPosX + this.buffer) && mouseY < (this.curPosY + this.heightNorm) && mouseY > (this.curPosY + this.buffer) && movingPiece == false)
        {
            //Setting this object and any object to be moving
            movingPiece = true;
            this.movingPiece = true;
        }
    }    
}


