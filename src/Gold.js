var Gold = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile('res/images/Gold.png');
    },

    randomPosition: function () {
        var randomHeight = Math.floor(Math.random() * (screenHeight - 25));
        var randomWidth = Math.floor(Math.random() * (screenWidth - 25));
        if (randomHeight < 25) {
            randomHeight += 25;
        }
        if (randomWidth < 25) {
            randomWidth += 25;
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