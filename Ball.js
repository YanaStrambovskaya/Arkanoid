class Ball extends Rectangle {
    constructor (param) {
        super(param);

        this.speed = param.speed
        this.angle = param.angle
    }

    draw () {
        context.drawImage(
            image,
            atlas.ball.x, atlas.ball.y, atlas.ball.width, atlas.ball.height,
            this.x, this.y, this.width, this.height,
        )
    }
}