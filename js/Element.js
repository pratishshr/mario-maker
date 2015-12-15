function Element() {
  this.type;

  this.sX;
  this.sY = 0;
  this.x;
  this.y;
  this.width = 32;
  this.height = 32;

  var element =  new Image();;
  element.src = "images/elements.png";

  var that = this;
 
  this.platform = function() {
    this.type = 1;
    that.sX = 0;
  }

  this.coinBox = function() {
    this.type = 2;
    that.sX = 1 * this.width;
  }

  this.mushroomBox = function(){
    this.type = 3;
    that.sX = 2 * this.width;
  }

  this.uselessBox = function(){
    this.type = 4;
    that.sX = 3 * this.width;
  }

  this.draw = function(ctx) {
    ctx.drawImage(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }
}