var GameLayer = cc.LayerColor.extend({
    init: function () {
        console.log('Initialized');
        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));

        var ship = new Ship();
        ship.setPosition(new cc.Point(200, 220));
        this.addChild(ship);
        console.log('Add ship to super class');
        ship.scheduleUpdate();

        this.addKeyboardHandlers();
        console.log("use keyboardhandlers");

        return true;
    },
    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self.onKeyDown(keyCode, event);
            },
            onKeyReleased: function (keyCode, event) {
                self.onKeyUp(keyCode, event);
            }
        }, this);
    },
    onKeyDown: function (keyCode, event) {
        console.log('Down: ' + keyCode.toString());
    },
    onKeyUp: function (keyCode, event) {
        console.log('Up: ' + keyCode.toString());
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


