/** version 3.4.1 */

/*****************************************
 object to decrease point
 'doing' color of time when it low
 random bg
 show label speed
 if player said cancel in init game
 *****************************************/

// index 0 is ship 1
// index 1 is ship 2
var globleScore = [0, 0];
var globleTurn = 0;
var runTime = true;

var information = {
    firstPlayer: "",
    firstColor: "",
    secondPlayer: "",
    secondColor: "",
    // should be 40, but i test with 10s
    time: 60
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
        // for pause button "p"
        this.pauseTime = false;
        // score p1 and p2
        this.score = [0, 0];

        this._super(new cc.Color(39, 48, 72, 255));
        this.setPosition(new cc.Point(0, 0));

        // create Ship object
        this.ship1 = new Ship(1);
        this.ship1.setPosition(new cc.Point(150, 150));
        this.addChild(this.ship1);

        // create Ship2 object
        this.ship2 = new Ship(2);
        this.ship2.setPosition(new cc.Point(screenWidth - 150, screenHeight - 150));
        this.addChild(this.ship2);

        // create Gold object
        this.collectObject = new CollectObject();
        this.addChild(this.collectObject);
        this.collectObject.randomPosition();

        // time label
        this.timeLabel = cc.LabelTTF.create(this.timeLimit, 'Arial', 40);
        this.timeLabel.setPosition(new cc.Point(50, screenHeight - 50));
        this.addChild(this.timeLabel);

        // label with All score
        this.scoreLabel = cc.LabelTTF.create(information.firstPlayer + " " + this.score[0] + " - " + this.score[1] + " " + information.secondPlayer, 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 50));
        this.addChild(this.scoreLabel);

        // label with message
        this.messageLabel = cc.LabelTTF.create("", 'Arial', 80);
        this.messageLabel.setColor(new cc.Color(255, 91, 33, 255))
        this.messageLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.messageLabel);

        this.speedShip1Label = cc.LabelTTF.create(this.ship1.getSpeed(), 'Arial', 40);
        this.speedShip1Label.setPosition(new cc.Point(100, 50));
        this.addChild(this.speedShip1Label);

        this.speedShip2Label = cc.LabelTTF.create(this.ship2.getSpeed(), 'Arial', 40);
        this.speedShip2Label.setPosition(new cc.Point(screenWidth - 100, 50));
        this.addChild(this.speedShip2Label);

        // update and input KEYBOARD
        this.scheduleUpdate();
        this.ship1.runShip(1);
        this.ship2.runShip(2);

        this.addKeyboardHandlers();

        return true;
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                if (!self.pauseTime) {
                    self.onKeyDown(keyCode, event);
                }
                self.pauseGame(keyCode);
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
        // when score Equals add more 1 / 3 of all time
        if (this.score[0] == this.score[1] && this.timeLimit == 0) {
            this.timeLimit = Math.floor(information.time / 3);
            console.warn("Timeup BUT score equals is " + this.score[0]);
        }
        // if timeup game will stop
        if (this.timeLimit <= 0) {
            this.stopUpdate();
            this.checkWin();
        }

        // for ship 1
        if (this.collectObject.closeTo(this.ship1)) {
            this.shipHitCO(1);
        }
        // for ship 2
        if (this.collectObject.closeTo(this.ship2)) {
            this.shipHitCO(2);
        }

        this.updateTime(this.pauseTime);
    },

    stopUpdate: function () {
        this.unscheduleUpdate();
        this.ship1.stopShip(1);
        this.ship2.stopShip(2);
    },

    checkWin: function () {
        if (this.score[0] > this.score[1]) {
            this.messageLabel.setString(stdMessage.FIRSTWIN);
        } else {
            this.messageLabel.setString(stdMessage.SECONDWIN);
        }
    },

    shipHitCO: function (number) {
        // change score
        if (number == 1) {
            // increase speed
            this.ship1.updateSpeed();
            this.score[0]++;
        } else if (number == 2) {
            // increase speed
            this.ship2.updateSpeed();
            this.score[1]++;
        }

        // update label of score and speed
        this.scoreLabel.setString(information.firstPlayer + " " + this.score[0] + " - " + this.score[1] + " " + information.secondPlayer);
        this.speedShip1Label.setString(this.ship1.getSpeed());
        this.speedShip2Label.setString(this.ship2.getSpeed());

        // turn on expert mode
        if (this.score[0] >= 100) {
            this.ship1.expertMode();
        }
        if (this.score[1] >= 100) {
            this.ship2.expertMode();
        }

        this.collectObject.randomPosition();
        this.timeGold = 5;
    },

    restartGame: function (key) {
        if (key == cc.KEY.space) {
            console.warn("SpaceBar been press, RESTART GAME. . .");
            globleScore[0] += this.score[0];
            globleScore[1] += this.score[1];
            globleTurn++;
            console.info(globleTurn + " turn(s) :: SCORE NOW: " + globleScore[0] + " - " + globleScore[1]);
            cc.director.runScene(new StartScene());
        }
    },

    pauseGame: function (key) {
        if (key == cc.KEY.p && !this.pauseTime) {
            console.warn("Pause.");
            this.pauseTime = true;
            this.ship1.stopShip();
            this.ship2.stopShip();
        } else if (key == cc.KEY.p && this.pauseTime) {
            console.warn("Unpause.");
            this.pauseTime = false;
            this.timeNow = new Date();
            this.ship1.runShip();
            this.ship2.runShip();
        }
    },

    updateTime: function (pause) {
        if (pause == false) {
            // time limit of Gold Object
            if (this.timeGold == 0) {
                this.collectObject.randomPosition();
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

        if (runTime) {
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
            // run only 1 time
            runTime = false;
        }

        console.info(information);

        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        console.log("GameLayer created with " + screenHeight + " and " + screenWidth);
    }
});
