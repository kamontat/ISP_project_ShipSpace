/** version 2.2 */

// index 0 is ship 1
// index 1 is ship 2
var score = [0, 0];

var GameLayer = cc.LayerColor.extend({

    init: function () {
        this.timeNow = new Date();
        // game time
        this.timeLimit = 40;
        // count time limit of Gold object
        this.timeGold = 4;

        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));

        // create Ship1 object
        this.ship1 = new Ship1();
        this.ship1.setPosition(new cc.Point(100, 100));
        this.addChild(this.ship1);

        // create Ship2 object
        this.ship2 = new Ship2();
        this.ship2.setPosition(new cc.Point(700, 500));
        this.addChild(this.ship2);

        // create Gold object
        this.gold = new Gold();
        this.addChild(this.gold);
        this.gold.randomPosition();

        // label with All score
        this.scoreLabel = cc.LabelTTF.create(score[0] + " - " + score[1], 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(400, 550));
        this.addChild(this.scoreLabel);

        // time label
        this.timeLabel = cc.LabelTTF.create(this.timeLimit, 'Arial', 40);
        this.timeLabel.setPosition(new cc.Point(50, 550));
        this.addChild(this.timeLabel);
        this.addKeyboardHandlers();

        this.scheduleUpdate();
        this.ship1.scheduleUpdate();
        this.ship2.scheduleUpdate();

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
        if (this.timeLimit > 0) {
            this.ship1.switchDirection(keyCode);
            this.ship2.switchDirection(keyCode);
        }
    },

    update: function () {
        // when score Equals add more 25 second
        if (score[0] == score[1] && this.timeLimit == 0) {
            this.timeLimit = 25;

            console.warn("Timeup BUT score equals and my time is " + this.timeLimit);
        }
        // if timeup game will stop
        if (this.timeLimit <= 0) {
            console.warn("Game Stop");
            this.unscheduleUpdate();
            this.ship1.unscheduleUpdate();
            this.ship2.unscheduleUpdate();
        }

        // for ship 1
        if (this.gold.closeTo(this.ship1)) {
            // increase speed
            this.ship1.updateSpeed();
            // change score
            this.scoreLabel.setString((++score[0]) + " - " + score[1]);
            this.gold.randomPosition();
            this.timeGold = 5;
        }
        // for ship 2
        if (this.gold.closeTo(this.ship2)) {
            // increase speed
            this.ship2.updateSpeed();
            // change score
            this.scoreLabel.setString(score[0] + " - " + (++score[1]));
            this.gold.randomPosition();
            this.timeGold = 5;
        }

        this.updateTime();
        // restart Game

    },

    disappearGold: function () {

    },

    updateTime: function () {
        // time limit of Gold Object
        if (this.timeGold == 0) {
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
