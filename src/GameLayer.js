var GameLayer = cc.LayerColor.extend({


    init: function () {
        console.log('Initialized');
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

        this.addKeyboardHandlers();

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
        if (keyCode == cc.KEY.space) {
            this.ship.switchDirection();
        }
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
