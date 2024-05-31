class GameManager
{
    constructor(image, puzzleObj, font, pauseButton)
    {
        this.image = image;
        this.puzzleObj = puzzleObj;
        this.font = font;
        this.pauseButton = pauseButton;

        this.showDonePage = false;
        this.finishedTextSize = 200;
        this.puzzleIsFinished = false;


        //Little image
        this.imageEdgeDistance = 15;
        this.boardY = puzzleObj.getBoardValues().y;
        this.boardWidth = puzzleObj.getBoardValues().width;
        this.boardHeight = puzzleObj.getBoardValues().height;
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
        //Array with position for time text, x at index 0 and y at index 1
        this.timeTextPos = [this.boardX + this.boardWidth * 1/4, (this.boardY / 2) + this.timeTextSize / 3];

        //Pause
        this.pauseButton.resize(120, 120);
        this.pausePos = [(width/2) - (this.pauseButton.width/2), (this.boardY/2) - (this.pauseButton.height/2)];
        this.isPaused = false;
    }

    draw()
    {
        // Draws little image if game is not finished
        if(!this.puzzleIsFinished)
        {
            image(this.image, this.boardX + (this.boardWidth * 3/4) - (this.littleImageHeight/2), this.imageEdgeDistance);
        }

        //Draws pause button
        image(this.pauseButton,this.pausePos[0], this.pausePos[1]);

        // Calculates time that has passed
        this.currentTime = millis();
        if(this.currentTime > (this.secondsInTotal + 1) * 1000 && this.showDonePage == false && this.isPaused == false)
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
            this.timeTextPos[0],
            this.timeTextPos[1]);



        if(this.showDonePage)
        {
            textSize(this.finishedTextSize);
            text("PUZZLE FINISHED!", width/2, this.boardY - 20);
            this.timeTextPos[0] = width/2;
            this.timeTextPos[1] = this.boardY * 1.5 + this.boardHeight + this.timeTextSize / 3;
        }
    }

    pauseTime()
    {
        if(mouseX < this.pausePos[0] + this.pauseButton.width && mouseX > this.pausePos[0] - this.pauseButton.height &&
           mouseY < this.pausePos[1] + this.pauseButton.height && mouseY > this.pausePos[1] - this.pauseButton.height/2)
        {
            if(this.isPaused)
            {
                this.isPaused = false;
            }
            else
            {
                this.isPaused = true;
            }
        }
    }

    isGamePaused()
    {
        console.log(this.isPaused);
        return this.isPaused;
    }

    puzzleFinishedPage()
    {
        this.puzzleIsFinished = true;
        this.showDonePage = true;
    }

}