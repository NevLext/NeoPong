class Gameplay
{
    constructor()
    {
        this.isRunning = false;
        this.isSingleplayer = true;
        this.margin = 50;

        this.drawing = new Drawing();
        this.ui = new UserInterface();

        //objects 2d
        this.centerLine = new CenterLine();
        this.topWall = new Wall(false);
        this.bottomWall = new Wall(true);
        this.leftGoal = new Goal(false);
        this.rightGoal = new Goal(true);
        this.ball = new Ball();
        this.leftPlayer = new Player();
        this.rightPlayer = new Player();
        this.leftScore = new Score("cyan", 50, 10, 4);
        this.rightScore = new Score("cyan", 50, 10, 4);
    }

    init()
    {
        window.addEventListener("resize", () => this.handleResize());
        document.addEventListener("keydown", (e) => this.handleKeyDown1(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp1(e));

        this.objects = [
            this.centerLine,
            this.topWall,
            this.bottomWall,
            this.leftGoal,
            this.rightGoal,
            this.ball,
            this.leftPlayer,
            this.rightPlayer,
            this.leftScore,
            this.rightScore,
        ];
        
        this.drawing.init(this.objects, "#000");
        this.prepare();
        this.drawing.draw();
    }

    start()
    {
        this.isRunning = true;

        if(this.isSingleplayer)
        {
            console.log("single");
            this.rightPlayer.isComputer = true;
        }
        else
        {
            document.addEventListener("keydown", (e) => this.handleKeyDown2(e));
            document.addEventListener("keyup", (e) => this.handleKeyUp2(e));
        }

        this.ui.toggleStartText();
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

        //check for score
        if(ball.x < 0)
        {
            this.rightPlayer.points++;
            this.rightScore.change(this.rightPlayer.points);
            this.leftGoal.lightUp();
            ball.score();
        }
        else if(ball.x > this.drawing.canvas.width)
        {
            this.leftPlayer.points++;
            this.leftScore.change(this.leftPlayer.points)
            this.rightGoal.lightUp();
            ball.score();
        }

        //check for wall collision
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

    handleResize()
    {
        this.drawing.resize();
        this.prepare();
        this.drawing.draw();
    }
    
    handleKeyDown1(e)
    {
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
        }
    }

    handleKeyDown2(e)
    {
        switch(e.keyCode)
        {
            case 38: //arrow up
                this.rightPlayer.upPressed = true;
                break;

            case 40: //arrow down
                this.rightPlayer.downPressed = true;
                break;

        }
    }


    handleKeyUp1(e)
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

    handleKeyUp2(e)
    {
        switch(e.keyCode)
        {
            case 38: //arrow up
                this.rightPlayer.upPressed = false;
                break;

            case 40: //arrow down
                this.rightPlayer.downPressed = false;
                break;
        }
    }

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

        this.leftScore.init();
        this.rightScore.init();

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
            this.getCenter().y - this.leftPlayer.width * 0.5
        );
        this.rightPlayer.setPosition(
            this.getSecondPlayerX(),
            this.getCenter().y - this.rightPlayer.width * 0.5
        );

        let scoreMargin = 30;

        this.leftScore.setPosition(
            this.getCenter().x - this.leftScore.width - scoreMargin, 
            scoreMargin
        );
        this.rightScore.setPosition(
            this.getCenter().x + scoreMargin, 
            scoreMargin
        );
    }
}