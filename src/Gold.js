var Gold = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile('res/images/Gold.png');
    },

    randomPosition: function () {
        var randomHeight = Math.floor(Math.random() * (screenHeight - 40));
        var randomWidth = Math.floor(Math.random() * (screenWidth - 40));
        if (randomHeight < 0) {
            randomHeight += 40;
        }
        if (randomWidth < 0) {
            randomWidth += 40;
        }
        this.setPosition(randomWidth, randomHeight);

    },

    closeTo: function (obj) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ((Math.abs(myPos.x - oPos.x) <= 45) &&
            (Math.abs(myPos.y - oPos.y) <= 45));
    }
});
