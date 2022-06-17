class Game {
    constructor (param)  {
        this.ball = null
        this.platform = null
        this.blocks = []
        this.isPlayflag = false
        this.game = param.game
        this.width = param.width
        this.height = param.height

        this.init();

        requestAnimationFrame( x => this.tick(x))
    }

    init() {
        this.game.width = this.width
        this.game.height = this.height
        this.isPlayflag = true;

        this.ball = new Ball({
            x: canvas.width / 2,
            y: canvas.height - 28,
            width: 10,
            height: 10,
            speed: 5,
            angle: Math.PI / 4 + Math.random() * Math.PI / 2
        })
         
        this.platform = new Platform({
            x: canvas.width / 2 - 50,
            y: canvas.height - 20,
            width: 100,
            height: 8,
            speed: 5,
            leftKey: false,
            rightKey: false,
        })
        
        this.blocks = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 5; y++) {
                this.blocks.push(new Block({
                    x: 50 + 50 * x,
                    y: 50 + 20 * y,
                    width: 50,
                    height: 20,
                    color: getRandom(['red', 'yellow', 'pink', 'green'])
                }))
            }
        }
    }


     tick (timestamp) {
        requestAnimationFrame(x => this.tick(x));
        clearCanvas();
        if (this.isPlayflag) {
        
            this.ball.x += this.ball.speed * Math.cos(this.ball.angle);
            this.ball.y -= this.ball.speed * Math.sin(this.ball.angle);
            if (this.platform.leftKey) {
                this.platform.x = Math.max(0, this.platform.x - this.platform.speed);
            }
            if (this.platform.rightKey) {
                this.platform.x = Math.min(this.platform.x + (this.platform.speed), canvas.width - this.platform.width);
            }
        
            for (const block of this.blocks) {
                if (block.isIntersection(this.ball)) {
                    toggleItem(this.blocks, block);
        
                    const cntrl1 = new Rectangle({
                        x: block.x,
                        y: block.y - 2,
                        width: block.width,
                        height: 2,
                    })
        
                    const cntrl2 = new Rectangle({
                        x: block.x + block.width,
                        y: block.y,
                        width: 2,
                        height: block.height,
                    })
        
                    const cntrl3 = new Rectangle({
                        x: block.x,
                        y: block.y + block.height,
                        width: block.width,
                        height: 2,
                    })
        
                    const cntrl4 = new Rectangle({
                        x: block.x - 2,
                        y: block.y,
                        width: 2,
                        height: block.height,
                    })
        
                    if (cntrl1.isIntersection(this.ball) || cntrl3.isIntersection(this.ball)) {
                        this.ball.angle = Math.PI * 2 - this.ball.angle;
                    } else if (cntrl2.isIntersection(this.ball) || cntrl4.isIntersection(this.ball)) {
                        this.ball.angle = Math.PI - this.ball.angle;
                    }
                    break;
                }
            }
        
            if (limits[0].isIntersection(this.ball)) {
                this.ball.angle = Math.PI * 2 - this.ball.angle;
            }
        
            if (limits[1].isIntersection(this.ball) || limits[3].isIntersection(this.ball)) {
                this.ball.angle = Math.PI - this.ball.angle;
            }
        
            if (this.platform.isIntersection(this.ball)) {
                const x = this.ball.x + this.ball.width / 2;
                const persent = (x - this.platform.x ) / this.platform.width;
                this.ball.angle = Math.PI - Math.PI * 8 / 10 * (persent + 0.05);
        
            } 
    
            if (limits[2].isIntersection(this.ball)) {
                this.isPlayflag = false;
            }
        }
    
        this.ball.draw();
        this.platform.draw();
    
        for (const block of this.blocks) {
            block.draw();
        }
    
        if (!this.isPlayflag) {
            drawResult();
        }
    
    }
    
}