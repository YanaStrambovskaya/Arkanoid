class Platform extends Rectangle {
    constructor (param) {
        super(param);

        this.speed = param.speed
        this.leftKey = param.leftKey
        this.rightKey = param.rightKey
    }

    draw () {
        context.drawImage(
            image,
            atlas.platform.x, atlas.platform.y, atlas.platform.width, atlas.platform.height,
            this.x, this.y, this.width, this.height,
        )
    }
}