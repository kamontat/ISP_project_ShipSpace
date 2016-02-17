var Ship = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("res/images/ship.png");
        this.direction = Ship.DIR.UP;
    },

    update: function () {
        var pos = this.getPosition();
        this.setPosition(new cc.Point(pos.x, pos.y + 5));

        if (this.direction == 1) {
            if (pos.y < screenHeight) {
                this.setPosition(new cc.Point(pos.x, pos.y + 5));
            } else {
                this.setPosition(new cc.Point(pos.x, 0));
            }
        } else {
            if (pos.x < screenWidth) {
                this.setPosition(new cc.Point(pos.x + 5, pos.y));
            } else {
                this.setPosition(new cc.Point(0, pos.y));
            }
        }


    },

    switchDirection: function () {
        console.log("Switch Finish");
        this.setAnchorPoint(0.5, 0.5);
        if (this.direction == Ship.DIR.UP) {
            this.direction = Ship.DIR.RIGHT;
            this.setRotation(90);
        } else {
            this.direction = Ship.DIR.UP;
            this.setRotation(0);
        }
    }
});

Ship.DIR = {
    UP: 1,
    RIGHT: 2
}
