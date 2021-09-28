class Gameplay
{
    constructor()
    {
        this.isRunning = false;
        this.margin = 50;

        this.drawing = new Drawing();
        this.centerLine = new CenterLine();
        this.topWall = new Wall(false);
        this.bottomWall = new Wall(true);
        this.leftGoal = new Goal(false);
        this.rightGoal = new Goal(true);
        this.ball = new Ball();
        this.leftPlayer = new Player();
        this.rightPlayer = new Player();

        window.addEventListener("resize", () => this.handleResize());
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }

    init()
    {
        this.objects = [
            this.centerLine,
            this.topWall,
            this.bottomWall,
            this.leftGoal,
            this.rightGoal,
            this.ball,
            this.leftPlayer,
            this.rightPlayer
        ];
        
        this.drawing.init(this.objects, "#000");
        this.prepare();
        this.drawing.draw();
    }

    start()
    {
        this.isRunning = true;
        window.requestAnimationFrame(() => this.animate());
    }

    animate()
    {
        let h = this.drawing.canvas.height;
        
        this.checkBallMovement();
        this.leftPlayer.checkMovement(h, this.ball);
        this.rightPlayer.checkMovement(h, this.ball);

        this.drawing.draw();
        window.requestAnimationFrame(() => this.animate());
    }

    checkBallMovement()
    {
        let ball = this.ball;
        ball.x += ball.vect.x * ball.speed;
        ball.y += ball.vect.y * ball.speed;

        if(ball.x < 0)
        {
            this.rightPlayer.points++;
            this.leftGoal.lightUp();
            ball.score();
        }
        else if(ball.x > this.drawing.canvas.width)
        {
            this.leftPlayer.points++;
            this.rightGoal.lightUp();
            ball.score();
        }

        if(ball.y - ball.radius < 0)
        {
            ball.y = ball.radius;
            ball.vect.y = -ball.vect.y;
            this.topWall.lightUp();
        } 
        else if(ball.y + ball.radius > this.drawing.canvas.height)
        {
            ball.y = this.drawing.canvas.height - ball.radius;
            ball.vect.y = -ball.vect.y;
            this.bottomWall.lightUp();
        }
    }


    //event handling 
    handleResize()
    {
        this.drawing.resize();
        this.prepare();
        this.drawing.draw();
    }
    
    handleKeyDown(e)
    {
        // console.log(e.keyCode)
        switch(e.keyCode)
        {
            case 32: //Space
                if(!this.isRunning)
                    this.start();
                break;

            case 87: //W
                this.leftPlayer.upPressed = true;
                break;

            case 83: //S
                this.leftPlayer.downPressed = true;
                break;

            case 38: //arrow up
                this.rightPlayer.upPressed = true;
                break;

            case 40: //arrow down
                this.rightPlayer.downPressed = true;
                break;

        }
    }

    handleKeyUp(e)
    {
        switch(e.keyCode)
        {
            case 87: //W
                this.leftPlayer.upPressed = false;
                break;

            case 83: //S
                this.leftPlayer.downPressed = false;
                break;

            case 38: //arrow up
                this.rightPlayer.upPressed = false;
                break;

            case 40: //arrow down
                this.rightPlayer.downPressed = false;
                break;
        }
    }

    //general
    getCenter()
    {
        return {
            x: this.drawing.canvas.width * 0.5,
            y: this.drawing.canvas.height * 0.5
        }
    }

    getSecondPlayerX()
    {
        return this.drawing.canvas.width - this.margin - this.rightPlayer.height;
    }

    prepare()
    {
        let w = this.drawing.canvas.width;
        let h = this.drawing.canvas.height;

        this.centerLine.height = h;

        this.topWall.width = w;
        this.topWall.secondWallPosition = h;
        this.bottomWall.width = w;
        this.bottomWall.secondWallPosition = h;

        this.leftGoal.height = h
        this.leftGoal.secondGoalPosition = w;

        this.rightGoal.height = h
        this.rightGoal.secondGoalPosition = w;

        this.ball.arenaCenter = this.getCenter();
        this.rightPlayer.x = this.getSecondPlayerX();

        this.setStartingPositions();
    }

    setStartingPositions()
    {
        this.centerLine.setPosition(
            this.getCenter().x,
            0
        );
        this.ball.setPosition(
            this.getCenter().x,
            this.getCenter().y
        );
        this.leftPlayer.setPosition(
            this.margin,
            this.getCenter().y - this.leftPlayer.width / 2
        );
        this.rightPlayer.setPosition(
            this.getSecondPlayerX(),
            this.getCenter().y - this.rightPlayer.width / 2
        );
    }

}