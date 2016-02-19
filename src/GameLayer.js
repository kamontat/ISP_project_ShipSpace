/** version 2.3 */

/*****************************************
text show status
object to decrease point
color of ship
message that important
*****************************************/

// index 0 is ship 1
// index 1 is ship 2
var globleScore = [0, 0];
var globleTurn = 0;

var GameLayer = cc.LayerColor.extend({
    init: function () {
        this.timeNow = new Date();
        // game time
        this.timeLimit = 20;
        // count time limit of Gold object
        this.timeGold = 4;
        this.score = [0, 0];

        this._super(new cc.Color(39, 48, 72, 255));
        this.setPosition(new cc.Point(0, 0));

        // create Ship1 object
        this.ship1 = new Ship1();
        this.ship1.setPosition(new cc.Point(150, 150));
        this.addChild(this.ship1);

        // create Ship2 object
        this.ship2 = new Ship2();
        this.ship2.setPosition(new cc.Point(screenWidth - 150, screenHeight - 150));
        this.addChild(this.ship2);

        // create Gold object
        this.gold = new Gold();
        this.addChild(this.gold);
        this.gold.randomPosition();

        // label with All score
        this.scoreLabel = cc.LabelTTF.create(this.score[0] + " - " + this.score[1], 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 50));
        this.addChild(this.scoreLabel);

        // time label
        this.timeLabel = cc.LabelTTF.create(this.timeLimit, 'Arial', 40);
        this.timeLabel.setPosition(new cc.Point(50, screenHeight - 50));
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
        } else {
            this.restartGame(keyCode);
        }
    },

    update: function () {
        // when score Equals add more 25 second
        if (this.score[0] == this.score[1] && this.timeLimit == 0) {
            this.timeLimit = 25;

            console.warn("Timeup BUT score equals is " + this.score[0]);
        }
        // if timeup game will stop
        if (this.timeLimit <= 0) {
            this.unscheduleUpdate();
            this.ship1.unscheduleUpdate();
            this.ship2.unscheduleUpdate();
        }

        // for ship 1
        if (this.gold.closeTo(this.ship1)) {
            // increase speed
            this.ship1.updateSpeed();
            // change score
            this.scoreLabel.setString((++this.score[0]) + " - " + this.score[1]);
            this.gold.randomPosition();
            this.timeGold = 5;
        }
        // for ship 2
        if (this.gold.closeTo(this.ship2)) {
            // increase speed
            this.ship2.updateSpeed();
            // change score
            this.scoreLabel.setString(this.score[0] + " - " + (++this.score[1]));
            this.gold.randomPosition();
            this.timeGold = 5;
        }

        this.updateTime();
    },

    restartGame: function (key) {
        if (key == 32) {
            console.log("SpaceBar been press, RESTART GAME. . .");
            globleScore[0] += this.score[0];
            globleScore[1] += this.score[1];
            globleTurn++;
            console.info(globleTurn + " turn(s) :: SCORE NOW: " + globleScore[0] + " - " + globleScore[1]);
            cc.director.runScene(new StartScene());
        }
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
