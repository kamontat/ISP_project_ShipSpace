var Ship = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("res/images/ship.png");
    },

    update: function () {
        var pos = this.getPosition();
        this.setPosition(new cc.Point(pos.x, pos.y + 5));

        if (pos.y < screenHeight) {
            this.setPosition(new cc.Point(pos.x, pos.y + 5));
        } else {
            this.setPosition(new cc.Point(pos.x, 0));
        }
    }

});
