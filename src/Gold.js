var Gold = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile('res/images/Gold.png');
    },

    randomPosition: function () {
        var randomHeight = Math.floor(Math.random() * (screenHeight));
        var randomWidth = Math.floor(Math.random() * (screenWidth));
        this.setPosition(randomWidth, randomHeight);

    },

    closeTo: function (obj) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ((Math.abs(myPos.x - oPos.x) <= 30) &&
            (Math.abs(myPos.y - oPos.y) <= 30));
    }
});
