class GameManager
{
    constructor(image, puzzleObj, font)
    {
        this.image = image;
        this.puzzleObj = puzzleObj;
        this.font = font;

        this.showDonePage = false;
        this.finishedTextSize = width - (width/1.15);
    }

    draw()
    {
        if(this.showDonePage)
        {
            textAlign(CENTER);
            textSize(this.finishedTextSize);
            textFont(font);
            text("PUZZLE FINISHED!", width/2, height/2);
        }
    }

    puzzleFinishedPage()
    {
        this.showDonePage = true;
    }

}