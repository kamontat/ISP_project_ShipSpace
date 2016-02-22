/** version 3.1 */

/*****************************************
object to decrease point
*****************************************/

// index 0 is ship 1
// index 1 is ship 2
var globleScore = [0, 0];
var globleTurn = 0;

var information = {
    firstPlayer: "",
    firstColor: "",
    secondPlayer: "",
    secondColor: "",
    time: 0
}

var stdMessage = {
    FIRSTWIN: "",
    SECONDWIN: ""
}

var GameLayer = cc.LayerColor.extend({
    init: function () {
        this.timeNow = new Date();
        // game time
        this.timeLimit = information.time;
        // count time limit of Gold object
        this.timeGold = 4;
        this.pauseTime = false;
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

        // time label
        this.timeLabel = cc.LabelTTF.create(this.timeLimit, 'Arial', 40);
        this.timeLabel.setPosition(new cc.Point(50, screenHeight - 50));
        this.addChild(this.timeLabel);

        this.addKeyboardHandlers();

        // label with All score
        this.scoreLabel = cc.LabelTTF.create(this.score[0] + " - " + this.score[1], 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 50));
        this.addChild(this.scoreLabel);

        // label with message
        this.messageLabel = cc.LabelTTF.create("", 'Arial', 40);
        this.messageLabel.setPosition(new cc.Point(screenWidth - 120, screenHeight - 50));
        this.addChild(this.messageLabel);

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
                self.pauseGame(keyCode, self.pauseTime);
                //                console.info("Key " + keyCode + " been press.");
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
            this.timeLimit = Math.floor(information.time / 3);
            console.warn("Timeup BUT score equals is " + this.score[0]);
        }
        // if timeup game will stop
        if (this.timeLimit <= 0) {
            this.unscheduleUpdate();
            this.ship1.unscheduleUpdate();
            this.ship2.unscheduleUpdate();

            // check who got win
            if (this.score[0] > this.score[1]) {
                this.messageLabel.setString(stdMessage.FIRSTWIN);
            } else {
                this.messageLabel.setString(stdMessage.SECONDWIN);
            }
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

        this.updateTime(this.pauseTime);
    },

    restartGame: function (key) {
        if (key == 32) {
            console.warn("SpaceBar been press, RESTART GAME. . .");
            globleScore[0] += this.score[0];
            globleScore[1] += this.score[1];
            globleTurn++;
            console.info(globleTurn + " turn(s) :: SCORE NOW: " + globleScore[0] + " - " + globleScore[1]);
            cc.director.runScene(new StartScene());
        }
    },

    pauseGame: function (key, switchGame) {
        if (key == 80 && switchGame == false) {
            console.warn("Pause Button been press.");
            this.pauseTime = true;
            this.ship1.unscheduleUpdate();
            this.ship2.unscheduleUpdate();
        } else if (key == 80 && switchGame == true) {
            console.warn("Pause Button been press.");
            this.pauseTime = false;
            this.timeNow = new Date();
            this.ship1.scheduleUpdate();
            this.ship2.scheduleUpdate();
        }
    },

    updateTime: function (pause) {
        if (pause == false) {
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
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var tempName = prompt("firstName(Cannot more than 5): ", "P1");
        while (tempName.length > 5) {
            tempName = prompt("(again)firstName(Cannot more than 5): ", "P1");
        }
        information.firstPlayer = tempName;

        tempName = prompt("secondName(Cannot more than 5): ", "P2");
        while (tempName.length > 5) {
            tempName = prompt("(again)secondName(Cannot more than 5): ", "P2");
        }
        information.secondPlayer = tempName;
        stdMessage.FIRSTWIN = information.firstPlayer + " WIN!";
        stdMessage.SECONDWIN = information.secondPlayer + " WIN!";

        information.time = prompt("Time Limit(Should more than 30): ", 30)

        console.info(information);

        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        console.log('GameLayer created');
    }
});
