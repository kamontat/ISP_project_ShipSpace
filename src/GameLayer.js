/** version 4.0.2 */

/*****************************************
 *** add document
 *****************************************/

// index 0 is ship 1
// index 1 is ship 2
var globleScore = [0, 0];
var globleTurn = 0;
var runTime = true;

var information = {
    firstName: "Com1",
    firstColor: "black",
    secondName: "Com2",
    secondColor: "black",
    singleMode: true,
    // should be 40.
    time: 100
};

var stdMessage = {
    FIRSTWIN: "",
    SECONDWIN: ""
};

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

        // create Ship1 object
        this.ship1 = new Ship(1, information.firstColor);
        this.ship1.setPosition(new cc.Point(150, 150));
        this.addChild(this.ship1);

        // create Ship2 object
        this.ship2 = new Ship(2, information.secondColor);
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
        this.scoreLabel = cc.LabelTTF.create(information.firstName + " " + this.score[0] + " - " + this.score[1] + " " + information.secondName, 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 50));
        this.addChild(this.scoreLabel);

        // label with message
        this.messageLabel = cc.LabelTTF.create("", 'Arial', 80);
        this.messageLabel.setColor(new cc.Color(255, 91, 33, 255))
        this.messageLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.messageLabel);

        // label with speed of ship 1
        this.speedShip1Label = cc.LabelTTF.create(this.ship1.getSpeed(), 'Arial', 40);
        this.speedShip1Label.setPosition(new cc.Point(100, 50));
        this.addChild(this.speedShip1Label);

        // label with speed of ship 2
        this.speedShip2Label = cc.LabelTTF.create(this.ship2.getSpeed(), 'Arial', 40);
        this.speedShip2Label.setPosition(new cc.Point(screenWidth - 100, 50));
        this.addChild(this.speedShip2Label);

        // update and input KEYBOARD
        this.scheduleUpdate();
        this.ship1.runShip(1);
        this.ship2.runShip(2);

        this.addKeyboardHandlers();

        // balance of speed
        if (information.singleMode) {
            this.ship1.speed = speed / 2;
            this.ship2.speed = speed / 2;
        }

        // secret code
        if (information.singleMode == "fuck") {
            this.ship1.speed = speed * 3;
            this.ship2.speed = speed * 3;
        }

        return true;
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                if (!self.pauseTime) {
                    self.onKeyDown(keyCode);
                }
                self.pauseGame(keyCode);

                //debug
                if (keyCode == cc.KEY.q) {
                    console.log("time: " + self.timeLimit);
                    console.log("score: " + self.score);
                    console.log("position ship1: " + self.ship1.getPosition().x.toFixed(2) + " , " + self.ship1.getPosition().y.toFixed(2));
                    console.log("speed: " + self.ship1.speed);

                    console.log("position ship2: " + self.ship2.getPosition().x.toFixed(2) + " , " + self.ship2.getPosition().y.toFixed(2));
                    console.log("speed: " + self.ship2.speed);
                    console.log(information);
                }
            }
        }, this);
    },

    onKeyDown: function (keyCode) {
        if (this.timeLimit > 0) {
            this.ship1.switchDirection(keyCode);
            this.ship2.switchDirection(keyCode);
        } else {
            this.restartGame(keyCode);
        }
    },

    update: function () {
        if (information.singleMode) {
            this.ship2.autoDir(this.collectObject);
        }
        // secret code
        if (information.singleMode == "fuck") {
            this.ship1.autoDir(this.collectObject);
            this.ship2.autoDir(this.collectObject);
        }

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
        this.scoreLabel.setString(information.firstName + " " + this.score[0] + " - " + this.score[1] + " " + information.secondName);
        this.speedShip1Label.setString(this.ship1.getSpeed());
        this.speedShip2Label.setString(this.ship2.getSpeed());

        this.collectObject.randomPosition();
        this.timeGold = 5;
    },

    checkWin: function () {
        if (this.score[0] > this.score[1]) {
            this.messageLabel.setString(stdMessage.FIRSTWIN);
        } else {
            this.messageLabel.setString(stdMessage.SECONDWIN);
        }
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
            // intro game.
            alert("This game is must play with 2 player, challenge with other.\nYou have to enter your name and other name with color.\nNow we have 5 color \n1) (R)ed \n2) (B)lue \n3) (G)reen \n4) (P)ink \n5) (Y)ellow");

            var answer = prompt("Did you want to play Single Mode (yes, no)?");

            information.singleMode = answer == "yes" || answer == "Yes" || answer == "y" || answer == "Y";
            // secret code
            if (answer == "fuck") {
                information.singleMode = "fuck";
            } else {
                // player 1
                this.doErrorCode(1, this.input(1));
                if (!information.singleMode) {
                    // player 2
                    this.doErrorCode(2, this.input(2));
                }
            }

            this.changeColorInformation();
            stdMessage.FIRSTWIN = information.firstName + "(" + information.firstColor + ")" + " WIN!";
            stdMessage.SECONDWIN = information.secondName + "(" + information.secondColor + ")" + " WIN!";

            // run only 1 time
            runTime = false;
        }

        console.info(information);

        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        console.log("GameLayer created with " + screenHeight + " and " + screenWidth);
    },

    /**
     * change error code from input to find the way fix it.
     * @param player numPlayer got error
     * @param code Error code
     */
    doErrorCode: function (player, code) {
        // form error
        if (code == 1) {
            this.doErrorCode(player, this.input(player));
        }
        // color not found
        if (code == 2) {
            var color = prompt("your color isn't have now, please change to vaild color. \nNow we have 5 color \n1) (R)ed \n2) (B)lue \n3) (G)reen \n4) (P)ink \n5) (Y)ellow");

            // wrong again
            if (this.checkColor(color)) {
                // right color
                if (player == 1) {
                    information.firstColor = color.toLowerCase();
                } else if (player == 2) {
                    information.secondColor = color.toLowerCase();
                }
            } else {
                this.doErrorCode(player, 2);
            }
        }
        // number player
        if (code == -99) {
            // error because programmer
            while (true) {
                console.error("Code: -99.");
            }
        }

    },

    /**
     * this function will get input from user and check correct name and color
     * @param numberPlayer
     * @returns {number} 0 is mean <b>true</b> <br>1 is mean error in <b>form</b> <br>  2 is mean error in <b>color</b> <br> -99 is mean error in <b>number player</b>
     */
    input: function (numberPlayer) {
        var temp = "";
        if (numberPlayer == 1) {
            temp = prompt("first name(< 5),color: ", "P1,red");
        } else if (numberPlayer == 2) {
            temp = prompt("second name(< 5),color: ", "P2,blue");
        } else {
            return -99;
        }

        //---------------------------------------------------------
        // if length of temp is 0 Mean 1 player
        //---------------------------------------------------------

        // check input form
        if (temp.indexOf(",") == -1) {
            console.error("input fail. Try again");
            return 1;
        }

        // split string to arrays
        var arrays = temp.split(",");

        // check length
        arrays[0] = this.checkLength(arrays[0], 5);

        // assign name
        if (numberPlayer == 1) {
            information.firstName = arrays[0].toLowerCase();
        } else if (numberPlayer == 2) {
            information.secondName = arrays[0].toLowerCase();
        }

        // check color
        if (!this.checkColor(arrays[1])) {
            return 2;
        }

        // add to information of te game
        if (numberPlayer == 1) {
            information.firstColor = arrays[1].toLowerCase();
        } else if (numberPlayer == 2) {
            information.secondColor = arrays[1].toLowerCase();
        }

        // if everything is right ways
        return 0;
    },

    /**
     * if player input shortcut of color
     * this function will replace in by full name of color
     */
    changeColorInformation: function () {
        var color = information.firstColor;
        switch (color) {
            case "r":
                information.firstColor = "red";
                break;
            case "b":
                information.firstColor = "blue";
                break;
            case "g":
                information.firstColor = "green";
                break;
            case "p":
                information.firstColor = "pink";
                break;
            case "y":
                information.firstColor = "yellow";
                break;
        }

        color = information.secondColor;
        switch (color) {
            case "r":
                information.secondColor = "red";
                break;
            case "b":
                information.secondColor = "blue";
                break;
            case "g":
                information.secondColor = "green";
                break;
            case "p":
                information.secondColor = "pink";
                break;
            case "y":
                information.secondColor = "yellow";
                break;
        }
    },

    /**
     *  check text length with the length
     * @param text check this text
     * @param length use this length to check
     * @returns {string} if length is not fit input again by prompt and return the correct thing
     */
    checkLength: function (text, length) {
        while (text.length > length) {
            text = prompt(text + " is too long name (Can't more than 5 alphabet), \nChange to . . .");
        }
        return text;
    },

    /**
     * check color with the ship color in stock
     * @param color check this color
     * @returns {boolean} return <code>true</code> if it have; otherwise, return <code>false</code>
     */
    checkColor: function (color) {
        switch (color.toLowerCase()) {
            case "red":
            case "r":
            case "blue":
            case "b":
            case "green":
            case "g":
            case "pink":
            case "p":
            case "yellow":
            case "y":
            case "black":
                return true;
                break;
            default:
                console.error("don't have " + color + " color");
                return false;
                break;
        }
    }
});
