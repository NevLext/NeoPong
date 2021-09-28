class Ball extends Object2D
{
    constructor()
    {
        super();
        this.x = 0;
        this.y = 0;
        this.startingSpeed = 15;
        this.speed = this.startingSpeed;
        this.a = 1;

        this.vect = {
            x: -1,
            y: -1
        };
        this.arenaCenter = { 
            x: 0, 
            y: 0 
        }

        this.color = "#0ff";
        this.radius = 30;
        this.thickness = 2;
        this.blur = 6;
    }

    draw()
    {
        this.drawGradient(this.x, this.y);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.thickness;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawGradient(x, y)
    {
        let grd = this.ctx.createRadialGradient(
            x, 
            y, 
            this.radius - this.thickness - this.blur, 
            x, 
            y, 
            this.radius + this.thickness + this.blur - 2
        );

        grd.addColorStop(0, "transparent");
        grd.addColorStop(0.5, this.color);
        grd.addColorStop(1, "transparent");

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(
            this.x - this.radius - this.blur, 
            this.y - this.radius - this.blur, 
            this.radius*2 + this.blur*2, 
            this.radius*2 + this.blur*2
        );
    }


    bounce(a)
    {
        this.vect.y = a;
        this.vect.x = -this.vect.x;
    }

    stop()
    {
        this.speed = 0;
    }

    score()
    {
        this.x = this.arenaCenter.x;
        this.y = this.arenaCenter.y;
        this.stop();

        let countdown = 3;

        let interval = setInterval(() => {
            countdown--;

            if(countdown == 1)
            {
                this.speed = this.startingSpeed;
                clearInterval(interval);
            }
        }, 1000);
    }
}