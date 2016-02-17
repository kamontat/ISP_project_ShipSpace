var Ship = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("res/images/ship.png");
        this.direction = Ship.DIR.UP;
        this.speed = 3;
    },

    update: function () {
        var pos = this.getPosition();

        if (this.direction == 1) {
            if (pos.y < screenHeight) {
                this.setPosition(new cc.Point(pos.x, pos.y + this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, 0));
            }
        } else {
            if (pos.x < screenWidth) {
                this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(0, pos.y));
            }
        }
    },

    switchDirection: function () {
        this.setAnchorPoint(0.5, 0.5);
        if (this.direction == Ship.DIR.UP) {
            this.direction = Ship.DIR.RIGHT;
            this.setRotation(90);
        } else {
            this.direction = Ship.DIR.UP;
            this.setRotation(0);
        }
    },

    updateSpeed: function () {
        this.speed += 0.5;
    }
});

Ship.DIR = {
    UP: 1,
    RIGHT: 2
}
