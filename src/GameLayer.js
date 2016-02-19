/** version 1.5 */

var GameLayer = cc.LayerColor.extend({


    init: function () {
        this.timeNow = new Date();
        // game time
        this.timeLimit = 10;
        // count time limit of Gold object
        this.timeGold = 4;

        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));

        // create Ship object
        this.ship = new Ship();
        this.ship.setPosition(new cc.Point(300, 220));
        this.addChild(this.ship);

        // create Gold object
        this.gold = new Gold();
        this.addChild(this.gold);
        this.gold.randomPosition();

        // label with score
        this.scoreLabel = cc.LabelTTF.create('0', 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(750, 550));
        this.addChild(this.scoreLabel);

        // time label
        this.timeLabel = cc.LabelTTF.create(this.timeLimit, 'Arial', 40);
        this.timeLabel.setPosition(new cc.Point(50, 550));
        this.addChild(this.timeLabel);
        this.addKeyboardHandlers();

        this.scheduleUpdate();
        this.ship.scheduleUpdate();

        return true;
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self.onKeyDown(keyCode, event);
            }
        }, this);
    },

    onKeyDown: function (keyCode, event) {
        this.ship.switchDirection(keyCode);
    },

    update: function () {
        // if timeup game will stop
        if (this.timeLimit <= 0) {
            console.warn("Game Stop");
            this.unscheduleUpdate();
            this.ship.unscheduleUpdate();
        }

        if (this.gold.closeTo(this.ship)) {
            // increase speed
            this.ship.updateSpeed();
            // change score
            this.scoreLabel.setString(parseInt(this.scoreLabel.getString()) + 1);
            this.gold.randomPosition();
            this.timeGold = 5;
        }
        this.updateTime();

    },

    disappearGold: function () {

    },

    updateTime: function () {
        // time limit of Gold Object
        if (this.timeGold == 0) {
            console.log("Time Up, random again");
            this.gold.randomPosition();
            this.timeGold = 4;
        }
        // count time limit
        if (Date.parse(new Date()) - Date.parse(this.timeNow) == 1000) {
            this.timeNow = new Date();
            this.timeLimit -= 1;
            this.timeGold--;
        }


        this.timeLabel.setString(this.timeLimit);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        console.log('GameLayer created');
    }
});
