function Mario() {
  var gameUI = GameUI.getInstance();

  this.type = 'small';

  this.x;
  this.y;
  this.width = 32;
  this.height = 44;
  this.speed = 3;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;
  this.grounded = false;
  this.invulnerable = false;
  this.sX = 0; // sprite x
  this.sY = 4; // sprite y
  this.frame = 0;

  var that = this;

  this.init = function() {
    that.x = 10;
    that.y = gameUI.getHeight() - 40 - 40;
    marioSprite = new Image();
    marioSprite.src = 'images/mario-sprites.png';
  }

  this.draw = function() {
    that.sX = that.width * that.frame;
    gameUI.draw(marioSprite, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.checkMarioType = function() {
    if (that.type == 'big') {
      that.height = 60;

      //big mario sprite position
      if(that.invulnerable){
        that.sY = 276;
      }else{
      
        that.sY = 90;
      }
    }else if(that.type == 'small'){
      that.height = 44;

      if(that.invulnerable){
        that.sY = 222;
      }else{
      //small mario sprite
      that.sY = 4;
      }
    }else if(that.type == 'fire'){
      that.height = 60;

      //fire mario sprite
      that.sY = 150;
    }
  }

  this.resetPos = function(){
    that.x = canvas.width / 10;
    that.y = canvas.height - 40 - 500;
    that.frame = 0;
  }

  // this.update = function(keys, maxWidth) {
  //   var friction = 0.9;
  //   var gravity = 0.2;

  //   that.checkMarioType();

  //   if (keys[38] || keys[32]) {
  //     //up arrow
  //     if (!that.jumping && that.grounded) {
  //       that.jumping = true;
  //       that.grounded = false;
  //       that.velY = -((that.speed) + 3);

  //       // that sprite position
  //       if (that.frame == 0 || that.frame == 1) {
  //         that.frame = 3; //right jump
  //       } else if (that.frame == 8 || that.frame == 9) {
  //         that.frame = 2; //left jump
  //       }
  //     }
  //   }

  //   if (keys[39]) {
  //     //right arrow
  //     that.checkMarioPos(maxWidth);

  //     if (that.velX < that.speed && that.x) {
  //       that.velX++;
  //     }

  //     //that sprite position
  //     if (!that.jumping) {
  //       tickCounter += 1;

  //       if (tickCounter > maxTick / that.speed) {
  //         tickCounter = 0;

  //         if (that.frame != 1) {
  //           that.frame = 1;
  //         } else {
  //           that.frame = 0;
  //         }
  //       }
  //     }

  //   }

  //   if (keys[37]) {
  //     //left arrow
  //     if (that.velX > -that.speed) {
  //       that.velX--;
  //     }

  //     //that sprite position
  //     if (!that.jumping) {
  //       tickCounter += 1;

  //       if (tickCounter > maxTick / that.speed) {
  //         tickCounter = 0;

  //         if (that.frame != 9) {
  //           that.frame = 9;
  //         } else {
  //           that.frame = 8;
  //         }
  //       }
  //     }

  //   }

  //   if (keys[16]) {
  //     //shift key
  //     that.speed = 5;
  //   } else {
  //     that.speed = 3;
  //   }


  //   //velocity 0 sprite position
  //   if (that.velX > 0 && that.velX < 1 && !that.jumping) {
  //     that.frame = 0;
  //   } else if (that.velX > -1 && that.velX < 0 && !that.jumping) {
  //     that.frame = 8;
  //   }

  //   if(that.grounded){
  //     that.velY = 0;
  //   }

  //   //change mario position
  //   that.velX *= friction;
  //   that.velY += gravity;

  //   that.x += that.velX;
  //   that.y += that.velY;
  //   }

  // this.checkMarioPos = function(maxWidth) {
  //    centerPos = (translatedDist)  + (canvas.width / 2);

  //     if(that.x > centerPos && (centerPos + canvas.width/2) < maxWidth){
  //       ctx.translate(-that.speed, 0);
  //       translatedDist += that.speed; 
  //     }
  //  }  
}
