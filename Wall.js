class Wall extends Object2D
{
    constructor(isBottom)
    {
        super();
        this.isBottom = isBottom;
        this.x = 0;
        this.y = 0;
        this.color = "#0ff";
        this.lightColor = "blue";
        this.thickness = 2;
        this.blur = 30;
        this.width = 0;
        this.secondWallPosition = 0;
    }

    draw()
    {
        let x = this.width/2;
        let y = this.secondWallPosition/2;

        if(this.isBottom)
        {
            this.ctx.translate(x, y);
            this.ctx.rotate(Math.PI);
            this.ctx.translate(-x, -y);
        }

        this.drawSingle();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawSingle()
    {
        this.drawGradient(0);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, 0, this.width, this.thickness);
    }

    drawGradient()
    {
        let b = this.blur + this.thickness;

        let grd = this.ctx.createLinearGradient(
            0, 
            0, 
            0, 
            b, 
        );

        grd.addColorStop(0, this.lightColor);
        grd.addColorStop(1, "transparent");

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(
            this.x,
            0,
            this.width,
            b
        );
    }

    lightUp()
    {
        let tmpBlur = this.blur;
        this.blur = 40;

        setTimeout(() => {
            this.blur = tmpBlur;
        }, 50);
    }
}