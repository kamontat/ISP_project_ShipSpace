/** version 3.6.4 */

const speed = 30000;
const decreaseSpeed = 100;
const numberPlayer = 2;

var Ship = cc.Sprite.extend({
        /**
         * input number player (1-2)
         * @param player
         * @param textColor
         */
        ctor: function (player, textColor) {
            this._super();

            // number ship
            this.number = player;
            // color ship
            this.chooseColor(textColor);

            switch (player) {
                case 1:
                    // init the position and direction
                    this.direction1 = Ship.KEY1.UP;
                    this.setRotation(0);
                    break;
                case 2:
                    // init the position and direction
                    this.direction2 = Ship.KEY2.S;
                    this.setRotation(180);
                    break;
                default:
                    console.error("Don't have that player yet.");
            }
            // set init speed: 25000 <- find from formular FPS
            this.speed = Math.ceil((screenHeight * screenWidth) / speed);
        },

        chooseColor: function (color) {
            switch (color) {
                case "red":
                case "r":
                    this.initWithFile("res/images/shipRed.png");
                    break;
                case "blue":
                case "b":
                    this.initWithFile("res/images/shipBlue.png");
                    break;
                case "green":
                case "g":
                    this.initWithFile("res/images/shipGreen.png");
                    break;
                case "pink":
                case "p":
                    this.initWithFile("res/images/shipPink.png");
                    break;
                case "yellow":
                case "y":
                    this.initWithFile("res/images/shipYellow.png");
                    break;
                default:
                    console.error("Don't have this color");
                    break;
            }
        },

        runShip: function () {
            switch (this.number) {
                case 1:
                    this.schedule(this.run1);
                    break;
                case 2:
                    this.schedule(this.run2);
                    break;
                default:
                    console.error("Don't have that player yet.");
            }
        },

        stopShip: function () {
            switch (this.number) {
                case 1:
                    this.unschedule(this.run1);
                    break;
                case 2:
                    this.unschedule(this.run2);
                    break;
                default:
                    console.error("Don't have that player yet.");
            }
        },

        // update function for player 1
        run1: function () {
            var pos = this.getPosition();
            switch (this.direction1) {
                case Ship.KEY1.LEFT:
                    if (pos.x > 0) {
                        this.setPosition(new cc.Point(pos.x - this.speed, pos.y));
                    } else {
                        this.setPosition(new cc.Point(screenWidth, pos.y));
                    }
                    break;
                case Ship.KEY1.UP:
                    if (pos.y < screenHeight) {
                        this.setPosition(new cc.Point(pos.x, pos.y + this.speed));
                    } else {
                        this.setPosition(new cc.Point(pos.x, 0));
                    }
                    break;
                case Ship.KEY1.RIGHT:
                    if (pos.x < screenWidth) {
                        this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
                    } else {
                        this.setPosition(new cc.Point(0, pos.y));
                    }
                    break;
                case Ship.KEY1.DOWN:
                    if (pos.y > 0) {
                        this.setPosition(new cc.Point(pos.x, pos.y - this.speed));
                    } else {
                        this.setPosition(new cc.Point(pos.x, screenHeight));
                    }
                    break;
                default:
                    console.error(this.direction + " is undefined.");
            }
        },

        // update function for player 2
        run2: function () {
            var pos = this.getPosition();
            switch (this.direction2) {
                case Ship.KEY2.A:
                    if (pos.x > 0) {
                        this.setPosition(new cc.Point(pos.x - this.speed, pos.y));
                    } else {
                        this.setPosition(new cc.Point(screenWidth, pos.y));
                    }
                    break;
                case Ship.KEY2.W:
                    if (pos.y < screenHeight) {
                        this.setPosition(new cc.Point(pos.x, pos.y + this.speed));
                    } else {
                        this.setPosition(new cc.Point(pos.x, 0));
                    }
                    break;
                case Ship.KEY2.D:
                    if (pos.x < screenWidth) {
                        this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
                    } else {
                        this.setPosition(new cc.Point(0, pos.y));
                    }
                    break;
                case Ship.KEY2.S:
                    if (pos.y > 0) {
                        this.setPosition(new cc.Point(pos.x, pos.y - this.speed));
                    } else {
                        this.setPosition(new cc.Point(pos.x, screenHeight));
                    }
                    break;
                default:
                    console.error(this.direction + " is undefined.");
            }
        },

        switchDirection: function (keyCode) {
            this.setAnchorPoint(0.5, 0.5);
            switch (keyCode) {
                case Ship.KEY1.LEFT:
                case Ship.KEY1.UP:
                case Ship.KEY1.RIGHT:
                case Ship.KEY1.DOWN:
                    this.direction1 = keyCode;
                    break;
                case Ship.KEY2.A:
                case Ship.KEY2.W:
                case Ship.KEY2.D:
                case Ship.KEY2.S:
                    this.direction2 = keyCode;
                    break;
                default:
                    console.error("Don't have any function for " + keyCode + " button.");
            }

            if (this.number == 1) {
                switch (this.direction1) {
                    case Ship.KEY1.LEFT:
                        this.setRotation(270);
                        break;
                    case Ship.KEY1.UP:
                        this.setRotation(0);
                        break;
                    case Ship.KEY1.RIGHT:
                        this.setRotation(90);
                        break;
                    case Ship.KEY1.DOWN:
                        this.setRotation(180);
                        break;
                    default:
                        console.error(this.direction + " is undefined.");
                }
            } else if (this.number == 2) {
                switch (this.direction2) {
                    case Ship.KEY2.A:
                        this.setRotation(270);
                        break;
                    case Ship.KEY2.W:
                        this.setRotation(0);
                        break;
                    case Ship.KEY2.D:
                        this.setRotation(90);
                        break;
                    case Ship.KEY2.S:
                        this.setRotation(180);
                        break;
                    default:
                        console.error(this.direction + " is undefined.");
                }
            } else {
                console.error("Unknown player");
            }
        },

        updateSpeed: function () {
            this.speed -= (this.speed / decreaseSpeed);
        },

        getSpeed: function () {
            return this.speed.toFixed(2);
        },

        getNumberShip: function () {
            if (this.number > numberPlayer) {
                return "Error get number ship (ship.js :: getNumberShip)";
            }
            return this.number;
        },

        // called want player have 100 score
        expertMode: function () {
            console.info("Expert Mode: ON")
            this.speed = (screenHeight * screenWidth) / (speed / 2);
        }

    })
    ;

Ship.KEY1 = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40

}

Ship.KEY2 = {
    A: 65,
    W: 87,
    D: 68,
    S: 83
}
