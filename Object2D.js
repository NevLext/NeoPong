class Object2D
{
    constructor()
    {
        this.canvas = document.getElementById("display");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
}