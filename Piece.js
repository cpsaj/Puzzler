class Piece
{
    constructor(image,relativeX, relativeY, widthNorm, heightNorm)
    {
        this.wholeImage = image;
        this.relativeX = relativeX;
        this.relativeY = relativeY;

        this.widthNorm = widthNorm;
        this.heightNorm = heightNorm;

        this.curPosX = 0;
        this.curPosY = 0;

        this.neighbors = {
            up: null,
            down: null,
            left: null,
            right: null
        };

        this.buffer = this.widthNorm/4
        this.imagePiece = createImage(this.widthNorm + this.buffer*2, this.heightNorm + this.buffer*2);
        this.imagePiece.loadPixels();

        this.assignPixels();
    }

    draw() 
    {

    }

    assignPixels()
    {
        for (let y = 0; y < this.heightNorm; y += 1) 
        {
            for (let x = 0; x < this.widthNorm * 4; x += 4) 
            {
                // this.imagePiece.pixels[x + y * this.imagePiece.width * 4] = 0;
                // this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + 1] = 0;
                // this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + 2] = 0;
                // this.imagePiece.pixels[x + y * this.imagePiece.width * 4 + 3] = 255;
                this.imagePiece.pixels[this.imagePiece.width * 4 * this.buffer + this.buffer * 4 + x + y * (this.widthNorm + this.buffer)] = this.wholeImage.pixels[x + y * this.wholeImage.width*4];
                this.imagePiece.pixels[this.imagePiece.width * 4 * this.buffer + this.buffer * 4 + x + y * (this.widthNorm + this.buffer) + 1] = this.wholeImage.pixels[x + y * this.wholeImage.width*4 + 1];
                this.imagePiece.pixels[this.imagePiece.width * 4 * this.buffer + this.buffer * 4 + x + y * (this.widthNorm + this.buffer) + 2] = this.wholeImage.pixels[x + y * this.wholeImage.width*4 + 2];
                this.imagePiece.pixels[this.imagePiece.width * 4 * this.buffer + this.buffer * 4 + x + y * (this.widthNorm + this.buffer) + 3] = 255;

            }
        }
        this.imagePiece.updatePixels();
    }

    move(x,y) 
    {
        
    }
}
