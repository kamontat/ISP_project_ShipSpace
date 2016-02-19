var Ship = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("res/images/ship.png");
        this.direction = Ship.DIR.UP;
        this.speed = 3;
    },

    update: function () {
        var pos = this.getPosition();
        if (this.direction == Ship.DIR.LEFT) {
            if (pos.x > 0) {
                this.setPosition(new cc.Point(pos.x - this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(screenWidth, pos.y));
            }
        } else if (this.direction == Ship.DIR.UP) {
            if (pos.y < screenHeight) {
                this.setPosition(new cc.Point(pos.x, pos.y + this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, 0));
            }
        } else if (this.direction == Ship.DIR.RIGHT) {
            if (pos.x < screenWidth) {
                this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(0, pos.y));
            }
        } else if (this.direction == Ship.DIR.DOWN) {
            if (pos.y > 0) {
                this.setPosition(new cc.Point(pos.x, pos.y - this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, screenHeight));
            }
        }
    },

    switchDirection: function (keyCode) {
        this.setAnchorPoint(0.5, 0.5);
        this.direction = keyCode;

        if (this.direction == Ship.DIR.LEFT) {
            this.setRotation(270);
        } else if (this.direction == Ship.DIR.UP) {
            this.setRotation(0);
        } else if (this.direction == Ship.DIR.RIGHT) {
            this.setRotation(90);
        } else if (this.direction == Ship.DIR.DOWN) {
            this.setRotation(180);
        }
    },

    updateSpeed: function () {
        this.speed += 0.3;
    }
});

Ship.DIR = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}
