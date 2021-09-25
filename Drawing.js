class Drawing
{
    constructor()
    {
        this.canvas = document.getElementById("display");
        this.ctx = this.canvas.getContext("2d");
        this.objects = [];
    }

    init(objects, backgroundColor)
    {
        this.objects = objects;
        this.setBackground(backgroundColor);
        this.resize();
    }

    draw()
    {
        this.clear();

        for(let i = 0; i < this.objects.length; i++)
            this.objects[i].draw();
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize()
    {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
    }

    setBackground(color)
    {
        this.canvas.style.backgroundColor = color;
    }
}