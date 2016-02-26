var Ship1 = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("res/images/ship1.png");
        // init the position and direction
        this.direction = Ship1.DIR.UP;
        this.setRotation(0);
        // set init speed: 25000 <- find from formular FPS
        this.speed = (screenHeight * screenWidth) / 30000;
        console.info(this.speed);
    },

    update: function () {
        var pos = this.getPosition();
        if (this.direction == Ship1.DIR.LEFT) {
            if (pos.x > 0) {
                this.setPosition(new cc.Point(pos.x - this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(screenWidth, pos.y));
            }
        } else if (this.direction == Ship1.DIR.UP) {
            if (pos.y < screenHeight) {
                this.setPosition(new cc.Point(pos.x, pos.y + this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, 0));
            }
        } else if (this.direction == Ship1.DIR.RIGHT) {
            if (pos.x < screenWidth) {
                this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(0, pos.y));
            }
        } else if (this.direction == Ship1.DIR.DOWN) {
            if (pos.y > 0) {
                this.setPosition(new cc.Point(pos.x, pos.y - this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, screenHeight));
            }
        }
    },

    switchDirection: function (keyCode) {
        this.setAnchorPoint(0.5, 0.5);

        if (keyCode == Ship1.DIR.LEFT || keyCode == Ship1.DIR.UP || keyCode == Ship1.DIR.RIGHT || keyCode == Ship1.DIR.DOWN) {
            this.direction = keyCode;
        }

        if (this.direction == Ship1.DIR.LEFT) {
            this.setRotation(270);
        } else if (this.direction == Ship1.DIR.UP) {
            this.setRotation(0);
        } else if (this.direction == Ship1.DIR.RIGHT) {
            this.setRotation(90);
        } else if (this.direction == Ship1.DIR.DOWN) {
            this.setRotation(180);
        }
    },

    updateSpeed: function () {
        console.info("divide by " + this.speed / 128);
        this.speed -= (this.speed / 128);
    }
});

var Ship2 = cc.Sprite.extend({
    ctor: function (number) {
        this._super();
        this.initWithFile("res/images/ship2.png");
        // init the position and direction
        this.direction = Ship2.DIR.S;
        this.setRotation(180);
        // set init speed: 25000 <- find from formular FPS
        this.speed = (screenHeight * screenWidth) / 30000;
        console.info(this.speed);
    },

    update: function () {
        var pos = this.getPosition();
        if (this.direction == Ship2.DIR.A) {
            if (pos.x > 0) {
                this.setPosition(new cc.Point(pos.x - this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(screenWidth, pos.y));
            }
        } else if (this.direction == Ship2.DIR.W) {
            if (pos.y < screenHeight) {
                this.setPosition(new cc.Point(pos.x, pos.y + this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, 0));
            }
        } else if (this.direction == Ship2.DIR.D) {
            if (pos.x < screenWidth) {
                this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
            } else {
                this.setPosition(new cc.Point(0, pos.y));
            }
        } else if (this.direction == Ship2.DIR.S) {
            if (pos.y > 0) {
                this.setPosition(new cc.Point(pos.x, pos.y - this.speed));
            } else {
                this.setPosition(new cc.Point(pos.x, screenHeight));
            }
        }
    },

    switchDirection: function (keyCode) {
        this.setAnchorPoint(0.5, 0.5);

        if (keyCode == Ship2.DIR.A || keyCode == Ship2.DIR.W || keyCode == Ship2.DIR.D || keyCode == Ship2.DIR.S) {
            this.direction = keyCode;
        }

        if (this.direction == Ship2.DIR.A) {
            this.setRotation(270);
        } else if (this.direction == Ship2.DIR.W) {
            this.setRotation(0);
        } else if (this.direction == Ship2.DIR.D) {
            this.setRotation(90);
        } else if (this.direction == Ship2.DIR.S) {
            this.setRotation(180);
        }
    },

    updateSpeed: function () {
        console.info("divide by " + this.speed / 128);
        this.speed -= (this.speed / 100);
    }
});

Ship1.DIR = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
}

Ship2.DIR = {
    A: 65,
    W: 87,
    D: 68,
    S: 83
}
