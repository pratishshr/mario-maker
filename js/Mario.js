function Mario(canvas, ctx) {

  this.x = canvas.width / 10;
  this.y = canvas.height - 40;
  this.width = 32;
  this.height = 44;
  this.speed = 3;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;
  this.grounded = false;

  this.sX = 1; // sprite x
  this.sY = 4; // sprite y
  this.frame = 0;

  var tickCounter = 0; //for animating mario
  var maxTick = 25;
  var marioImg; //mario image

  var that = this;

  this.init = function() {
    marioSprite = new Image();
    marioSprite.src = 'images/mario-sprites.png';
  }

  this.draw = function() {
    that.sX = that.width * that.frame;

    ctx.drawImage(marioSprite, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.update = function(keys) {
    var friction = 0.9;
    var gravity = 0.2;

    if (keys[38] || keys[32]) {
      //up arrow
      if (!that.jumping && that.grounded) {
        that.jumping = true;
        that.grounded = false;
        that.velY = -((that.speed) + 3);

        // that sprite position
        if (that.frame == 0 || that.frame == 1) {
          that.frame = 3; //right jump
        } else if (that.frame == 8 || that.frame == 9) {
          that.frame = 2; //left jump
        }
      }
    }

    if (keys[39]) {
      //right arrow
      if (that.velX < that.speed) {
        that.velX++;
      }

      //that sprite position
      if (!that.jumping) {
        tickCounter += 1;

        if (tickCounter > maxTick / that.speed) {
          tickCounter = 0;

          if (that.frame != 1) {
            that.frame = 1;
          } else {
            that.frame = 0;
          }
        }
      }

    }

    if (keys[37]) {
      //left arrow
      if (that.velX > -that.speed) {
        that.velX--;
      }

      //that sprite position
      if (!that.jumping) {
        tickCounter += 1;

        if (tickCounter > maxTick / that.speed) {
          tickCounter = 0;

          if (that.frame != 9) {
            that.frame = 9;
          } else {
            that.frame = 8;
          }
        }
      }

    }

    if (keys[16]) {
      //shift key
      that.speed = 5;
    } else {
      that.speed = 3;
    }


    //velocity 0 sprite position
    if (that.velX > 0 && that.velX < 1 && !that.jumping) {
      that.frame = 0;
    } else if (that.velX > -1 && that.velX < 0 && !that.jumping) {
      that.frame = 8;
    }

    if(that.grounded){
      that.velY = 0;
    }
    
    //change mario position
    that.velX *= friction;
    that.velY += gravity;
   
    that.x += that.velX;
    that.y += that.velY;
    }
}
