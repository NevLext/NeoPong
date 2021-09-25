class CenterLine extends Object2D
{
    constructor()
    {
        super();
        this.x = 0;
        this.y = 0;
        this.color = "#404040";
        this.thickness = 4;
        this.space = 20;
        this.length = 20;
        this.blur = 6;
        this.height = 0;
    }

    draw()
    {
        let h = this.height / (this.space + this.length);

        for(let i = 0; i < h; i++)
        {
            let y = (this.space + this.length) * i;
            this.drawSingle(y);
        }
    }

    drawSingle(y)
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x - this.thickness/2, y, this.thickness, this.length);
    }
}