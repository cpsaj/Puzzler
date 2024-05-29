class GameManager
{
    constructor(image, puzzleObj, font)
    {
        this.image = image;
        this.puzzleObj = puzzleObj;
        this.font = font;

        this.showDonePage = false;
        this.finishedTextSize = width - (width/1.15);


        //Little image
        this.imageEdgeDistance = 15;
        this.boardY = puzzleObj.getBoardValues().y;
        this.boardWidth = puzzleObj.getBoardValues().width;
        this.boardX = puzzleObj.getBoardValues().x;

        this.littleImageHeight = this.boardY - this.imageEdgeDistance*2;
        this.littleImageWidth = this.littleImageHeight / this.image.height * this.image.width;

        this.image.resize(this.littleImageWidth, this.littleImageHeight);

        // Time
        this.currentTime = 0;
        this.seconds = 0;
        this.secondsInTotal = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timeTextSize = 100;
    }

    draw()
    {
        // Draws little image
        image(this.image, this.boardX + (this.boardWidth * 3/4) - (this.littleImageHeight/2), this.imageEdgeDistance);

        // Calculates time that has passed
        this.currentTime = millis();
        if(this.currentTime > (this.secondsInTotal + 1) * 1000 && this.showDonePage == false)
        {
            this.secondsInTotal++;
            this.seconds++;
            if(this.seconds > 59)
            {
                this.minutes++;
                this.seconds = 0;
                if(this.minutes > 59)
                {
                    this.hours++;
                    this.minutes = 0;
                }
            }
        }

        // Writes the time
        textSize(this.timeTextSize);
        text(((this.hours < 10) ? ("0" + this.hours) : this.hours) + ":" +
             ((this.minutes < 10) ? ("0" + this.minutes) : this.minutes) + ":" +
             ((this.seconds < 10) ? ("0" + this.seconds) : this.seconds),
            this.boardX + this.boardWidth * 1/4,
            (this.boardY / 2) + this.timeTextSize / 3);



        if(this.showDonePage)
        {
            textSize(this.finishedTextSize);
            text("PUZZLE FINISHED!", width/2, 200);
        }

    }

    puzzleFinishedPage()
    {
        this.showDonePage = true;
    }

}