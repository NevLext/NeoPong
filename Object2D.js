class Object2D
{
    constructor()
    {
        this.canvas = document.getElementById("display");
        this.ctx = this.canvas.getContext("2d");
    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
}