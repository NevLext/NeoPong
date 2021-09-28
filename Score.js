class Score extends Object2D
{
    constructor(color, width, height, space)
    {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
        this.space = space;
        this.digit = 0;
        this.colorPattern = [];
    }

    init()
    {
        this.colorPattern = this.convertPatternToColors();
    }

    draw()
    {
        let on = this.colorPattern;
        let m = this.width + this.space*2;
        let x = this.x;
        let y = this.y;
        let w = this.width;
        let s = this.space;
        
        //top
        this.drawElement(on[0], x, y, 0);
        this.drawElement(on[1], x + w + s, y + s, 90);
        this.drawMiddleElement(on[2], x, y + w + s*2);
        this.drawElement(on[3], x - s, y + w + s , 270);

        //bottom
        this.drawElement(on[4], x + w + s, y + s + m, 90);
        this.drawElement(on[5], x + w, y + w + s*2  + m, 180);
        this.drawElement(on[6], x - s, y + w + s + m , 270);


    }

    drawElement(color, x, y, rotation)
    {
        this.ctx.strokeStyle = color;
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation * Math.PI/180);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.width, 0);
        this.ctx.lineTo(this.width - this.height, this.height);
        this.ctx.lineTo(this.height, this.height);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.rotate(-rotation * Math.PI/180);
        this.ctx.translate(-x, -y);
    }

    drawMiddleElement(color, x, y)
    {
        let h = this.height
        this.ctx.strokeStyle = color;
        this.ctx.translate(x, y);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(h, -h/2);
        this.ctx.lineTo(this.width - h, -h/2);
        this.ctx.lineTo(this.width, 0);
        this.ctx.lineTo(this.width - h, h/2);
        this.ctx.lineTo(h, h/2);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.translate(-x, -y);
    }



    convertPatternToColors()
    {
        let pattern = this.getDigitPattern(); 
        let c = ["transparent", this.color];
        let colors = [];

        for(let i = 0; i < pattern.length; i++)
            colors.push(c[pattern[i]]);

        return colors;
    }

    getDigitPattern()
    {
        let patterns = [
            [1, 1, 0, 1, 1, 1, 1],   //0
            [0, 1, 0, 0, 1, 0, 0],   //1
            [1, 1, 1, 0, 0, 1, 1],   //2
            [1, 1, 1, 0, 1, 1, 0],   //3
            [0, 1, 1, 1, 1, 0, 0],   //4
            [1, 0, 1, 1, 1, 1, 0],   //5
            [1, 0, 1, 1, 1, 1, 1],   //6
            [1, 1, 0, 0, 1, 0, 0],   //7
            [1, 1, 1, 1, 1, 1, 1],   //8
            [1, 1, 1, 1, 1, 1, 0]    //9
        ];

        return patterns[this.digit];
    }

    //use this instead of assigning to this.digit 
    change(digit) 
    {
        this.digit = digit;
        this.colorPattern = this.convertPatternToColors();
    }
}