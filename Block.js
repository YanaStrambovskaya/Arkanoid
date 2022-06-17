class Block extends Rectangle {
    constructor (param) {
        super(param);
        this.color = param.color
    }

    draw () {
        context.drawImage(
            image,
            atlas[this.color].x, atlas[this.color].y, atlas[this.color].width, atlas[this.color].height,
            this.x, this.y, this.width, this.height,
        )
    }
}