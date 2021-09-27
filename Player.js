class Player extends Object2D
{
    constructor()
    {
        super();
        this.x = 0;
        this.y = 0;
        this.speed = 15;
        this.color = "#0ff";
        this.lightColor = "blue";
        this.width = 150;
        this.height = 30;
        this.thickness = 3;
        this.blur = 10;

        this.points = 0;
    }

    draw()
    {
        this.drawGradient();
        this.ctx.lineWidth = this.thickness;
        this.ctx.strokeStyle = this.color;

        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.height, this.width);
        this.ctx.stroke();
    }

    drawGradient()
    {
        this.drawGradientLine(this.x + this.height, this.y, this.width);
        this.drawGradientLine(this.x, this.y, this.width);

        this.drawGradientLine2(this.x, this.y, this.height);
        this.drawGradientLine2(this.x, this.y + this.width, this.height);
    }

    drawGradientLine(x, y, width)
    {
        let lineThickness = this.thickness * this.blur;
        let grd = this.ctx.createLinearGradient(x - lineThickness/2, y, x - lineThickness/2 + lineThickness, y);
        grd.addColorStop(0, "transparent");
        grd.addColorStop(0.5, this.lightColor);
        grd.addColorStop(1, "transparent");

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(x - lineThickness/2, y, lineThickness, width);
    }

    drawGradientLine2(x, y, width)
    {

        let lineThickness = this.thickness * this.blur;
        let grd = this.ctx.createLinearGradient(x, y - lineThickness/2, x, y - lineThickness/2 + lineThickness);
        grd.addColorStop(0, "transparent");
        grd.addColorStop(0.5, this.lightColor);
        grd.addColorStop(1, "transparent");

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(x, y - lineThickness/2, width, lineThickness);
    }

    checkMovement(canvasHeight, ball)
    {
        if(this.downPressed)
        {
            if(this.y <= canvasHeight - this.width - this.speed)
                this.y += this.speed;
        }
        else if(this.upPressed)
        {
            if(this.y > this.speed)
                this.y -= this.speed;
        }

        let hitPoint = this.getHitPoint(ball.x, ball.y, ball.radius);

        if(hitPoint)
        {
            let center = this.y + this.width / 2;
            let a = (hitPoint - center) / 50;
            ball.bounce(a);
            this.lightUp();
        }
    }

    lightUp()
    {
        this.blur = 15;
        setTimeout(() => this.blur = 10, 50);
    }

    getHitPoint(x, y, r)
    {
        let left = this.x;
        let right = this.x + this.height;
        let top = this.y;
        let bottom = this.y + this.width;

        if(left < x + r && x - r < right && top < y + r && y - r < bottom)
            return y;
        return null;
    }
}