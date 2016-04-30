/** version 4.0.2 */

var CollectObject = cc.Sprite.extend({
    // constructor
    ctor: function () {
        this._super();
        this.initWithFile('res/images/CollectObject.png');
    },

    /**
     * random position x and y in the screen
     */
    randomPosition: function () {
        var randomHeight = this.randomRange(CollectObject.SIZE.HALFY, screenHeight - CollectObject.SIZE.HALFY);
        var randomWidth = this.randomRange(CollectObject.SIZE.HALFX, screenWidth - CollectObject.SIZE.HALFX);
        this.setPosition(randomWidth, randomHeight);
    },

    /**
     * if obj close to this return true; otherwise, return false
     * @param obj some object that have position
     * @returns {boolean} close to or not
     */
    closeTo: function (obj) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ((Math.abs(myPos.x - oPos.x) <= CollectObject.SIZE.X + 5) &&
        (Math.abs(myPos.y - oPos.y) <= CollectObject.SIZE.Y + 5));
    },

    /**
     * random some number in first and second [first, second)
     * @param first first number
     * @param second second number
     * @returns {number} random number
     */
    randomRange: function (first, second) {
        var rand = Math.random() * second;
        while (rand < first) {
            rand = Math.random() * second;
        }

        return rand;
    }
});

// picture of object size
CollectObject.SIZE = {
    X: 40,
    Y: 40,
    HALFX: 20,
    HALFY: 20
}