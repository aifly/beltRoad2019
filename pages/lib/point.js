export default class Point {
    constructor(option) {
        this.x = option.x || Math.random() * option.context.canvas.width;
        this.y = option.y || Math.random() * option.context.canvas.height;
        this.r = 10;
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.img = option.img;
        this.angle = 0;
        this.iNow = 0;
        this.speed = Math.random() * 2;
        this.context = option.context;
        this.size = Math.random() * 10;
        this.speedX = Math.random()*2;
        this.speedY = -10*Math.random()*2;
        this.rotate = Math.random() * 360 / 180 * Math.PI;
        this.isOld = false;
        this.render();


    }

    render() {

        var {
            context,
            img,
            x,
            y,
            size,
            rotate,
        } = this;
        context.save();
        context.rotate = rotate;
        context.drawImage(img, x, y, size, size);
        context.restore();

    }
    animate(fn){
        
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += Math.random() *  10 + 2;
        if (Math.abs(this.y - this.defaultY > -4)) {
            fn&&fn();
        }

        this.render();
        
    }
    update() {
        this.render();
    }
}