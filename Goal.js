class Goal extends Object2D
{
    constructor(isLeft)
    {
        super();
        this.isLeft = isLeft;
        this.lightColor = "#e5e5e5";
        this.blur = 0;
        this.height = 0;
        this.secondGoalPosition = 0;
    }

    draw()
    {
        let x = this.secondGoalPosition/2;
        let y = this.height/2;

        if(this.isLeft)
        {
            this.ctx.translate(x, y);
            this.ctx.rotate(Math.PI);
            this.ctx.translate(-x, -y);
        }

        this.drawGradient();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawGradient()
    {
        let grd = this.ctx.createLinearGradient(
            0, 
            0, 
            this.blur, 
            0, 
        );

        grd.addColorStop(0, this.lightColor);
        grd.addColorStop(1, "transparent");

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(
            0,
            0,
            this.blur,
            this.height
        );
    }

    lightUp()
    {
        let tmpBlur = this.blur;
        let b = 0;

        let interval = setInterval(() => {
            this.blur = b;
            b += 5;
            if(b > 70)
            {
                this.blur = tmpBlur;
                clearInterval(interval);
            }
        }, 10);
    }
}