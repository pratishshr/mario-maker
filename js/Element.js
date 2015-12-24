function Element() {
  this.type;

  this.sX;
  this.sY = 0;
  this.x;
  this.y;
  this.width = 32;
  this.height = 32;

  var element =  new Image();;
  element.src = 'images/elements.png';

  var that = this;
 
  this.platform = function() {
    that.type = 1;
    that.sX = 0;
  }

  this.coinBox = function() {
    that.type = 2;
    that.sX = 1 * that.width;
  }

  this.mushroomBox = function(){
    that.type = 3;
    that.sX = 2 * that.width;
  }

  this.uselessBox = function(){
    that.type = 4;
    that.sX = 3 * that.width;
  }

  this.flagPole = function() {
    that.type = 5;
    that.sX = 4 * that.width;
  }

  this.flag = function() {
    that.type = 6;
    that.sX = 5 * that.width;
  }

  this.draw = function(ctx) {
    ctx.drawImage(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }
}