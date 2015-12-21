function Enemy() {
  this.type;
  this.x;
  this.y;
  this.velX = 1;
  this.velY = 0;
  this.grounded = false;

  this.sX;
  this.sY = 0;
  this.width = 32;
  this.height = 32;

  var element =  new Image();;
  element.src = "images/enemies.png";

  var that = this;

  this.goomba = function(){
    this.type = 20;
    that.sX = 0;
  }

  this.draw = function(ctx){
    ctx.drawImage(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.update = function(){
    var gravity = 0.2;
    
    if(that.grounded){
      that.velY = 0;
    }

    that.velY += gravity;
    
    that.x += that.velX;
    that.y += that.velY;
  }
}