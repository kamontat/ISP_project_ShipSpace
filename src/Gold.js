var Gold = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile('res/images/Gold.png');
    },

    randomPosition: function () {
        var randomHeight = Math.floor(Math.random() * (screenHeight));
        var randomWidth = Math.floor(Math.random() * (screenWidth));
        this.setPosition(randomWidth, randomHeight);

    }
});
