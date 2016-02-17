var GameLayer = cc.LayerColor.extend({


    init: function () {
        this.timeNow = new Date();
        this.timeLimit = 100;

        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));

        // create Ship object
        this.ship = new Ship();
        this.ship.setPosition(new cc.Point(300, 220));
        this.addChild(this.ship);
        this.ship.scheduleUpdate();

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
        if (this.gold.closeTo(this.ship)) {
            // increase speed
            this.ship.updateSpeed();
            // change score
            this.scoreLabel.setString(parseInt(this.scoreLabel.getString()) + 1);
            this.gold.randomPosition();
        }
        this.updateTime();
    },

    disappearGold: function () {

    },

    updateTime: function () {

        if (Date.parse(new Date()) - Date.parse(this.timeNow) == 1000) {
            this.timeNow = new Date();
            this.timeLimit -= 1;
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
