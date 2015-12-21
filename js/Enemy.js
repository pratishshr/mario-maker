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

  this.frame = 0;
  var tickCounter = 0; //for animating enemy
  var maxTick = 10; //max number for ticks to show enemy sprite

  var element =  new Image();;
  element.src = "images/enemies.png";

  var that = this;

  this.goomba = function(){
    this.type = 20;
    that.sX = 0;
  }

  this.draw = function(ctx){
    that.sX = that.width * that.frame;
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

    //for animating
    tickCounter += 1;

    if(tickCounter > maxTick){
      tickCounter = 0;
      if(that.frame == 0){
       that.frame = 1;
      }else{
        that.frame = 0;
      }

    }
  }

}