function MarioGame() {
  var canvas = document.getElementById('game-screen');
  var ctx = canvas.getContext('2d');
  var maxWidth = 1280 * 3;
  var height = 480;
  var viewport = maxWidth/3;
  var tileSize = 32;  
  
  var mario; // mario instance

  var element; //all elements in the map instance
  var powerUps = [];
  
  var keys = []; //key presses
  
  var gameSound; //Game sound instance

  var that = this;

  this.init = function() {
    canvas.width = viewport;
    canvas.height = height;
    mario = new Mario(canvas, ctx);
    mario.init();

    element = new Element();
    
    gameSound = new GameSound();
    gameSound.init();

    //key binding
    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });

    // that.renderMap();
    gameSound.bgMusic.play();
    that.startGame();
  }

  //Main Game Loop
  this.startGame = function() {
    ctx.clearRect(0, 0, maxWidth, height);
    that.renderMap();

    mario.draw();
    mario.update(keys, maxWidth);
    that.wallCollision();

    for(var i = 0; i< powerUps.length; i++){
      powerUps[i].draw(ctx);
      powerUps[i].update();
    }
    
    requestAnimationFrame(that.startGame);
  }

  this.renderMap = function() {
    mario.grounded = false;

    for(var i = 0; i< powerUps.length; i++){
      powerUps[i].grounded = false;
    }
  
    for(var row = 0; row < map.length; row++) {
      for(var column = 0; column < map[0].length; column++) {
        switch(map[row][column]) {
          case 1: 
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform();
            element.draw(ctx);
            var collisionDir = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDir, element.type, row, column);

            that.checkPowerUpCollision(element);
            break;

          case 2:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.coinBox();
            element.draw(ctx);
            var collisionDir = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDir, element.type, row, column);

            that.checkPowerUpCollision(element);
            break; 

          case 3:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.mushroomBox();
            element.draw(ctx);
            var collisionDir = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDir, element.type, row, column);

            that.checkPowerUpCollision(element);
            break; 

          case 4:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.uselessBox();
            element.draw(ctx);
            var collisionDir = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDir, element.type, row, column);

            that.checkPowerUpCollision(element);
            break;   
          }
          
      }
    }
  }

  this.collisionCheck = function(objA, objB) {
    // get the vectors to check against
    var vX = (objA.x + (objA.width / 2)) - (objB.x + (objB.width / 2));
    var vY = (objA.y + (objA.height / 2)) - (objB.y + (objB.height / 2));
    
    // add the half widths and half heights of the objects
    var hWidths = (objA.width / 2) + (objB.width / 2);
    var hHeights = (objA.height / 2) + (objB.height / 2);
    var collisionDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var offsetX = hWidths - Math.abs(vX),
            offsetY = hHeights - Math.abs(vY);

        if (offsetX >= offsetY) {
            if (vY > 0) {
                collisionDir = 't';
                objA.y += offsetY;
            } else {
                collisionDir = 'b';
                objA.y -= offsetY;
            }
        } else {
            if (vX > 0) {
                collisionDir = 'l';
                objA.x += offsetX;
            } else {
                collisionDir = 'r';
                objA.x -= offsetX;
            }
        }
    }
    return collisionDir;
  }


  this.onCollision = function(element, collisionDir,type, row, column) {
    if(collisionDir == 'l' || collisionDir == 'r'){
      mario.velX = 0;
      mario.jumping = false;
    }else if(collisionDir == 'b'){
      mario.grounded = true;
      mario.jumping = false;
    }else if(collisionDir == 't'){
      mario.velY *= -1;
      
      if(type == 3 ){ //Mushroom Box
        var powerUp = new PowerUp();
        powerUp.mushroom(element.x, element.y);

        powerUps.push(powerUp);

        map[row][column] = 4;

        //sound when mushroom appears
        gameSound.powerUpAppear.pause();
        gameSound.powerUpAppear.currentTime = 0;
        gameSound.powerUpAppear.play();
      }

      if(type == 2){  //Coin Box
        map[row][column] = 4; 
        
        //sound when coin block is hit
        gameSound.coin.pause();
        gameSound.coin.currentTime = 0;
        gameSound.coin.play();
      }

    }
  }

  this.checkPowerUpCollision = function(element) {
    for(var i = 0; i< powerUps.length; i++){
      var collisionDir = that.collisionCheck(powerUps[i], element);
      var collWithMario = that.collisionCheck(powerUps[i], mario);

      that.onPowerUpCollision(powerUps[i],collisionDir);
      if(collWithMario){
        mario.type = 'big';
        powerUps.splice(i,1);

        //sound when mushroom appears
        gameSound.powerUp.pause();
        gameSound.powerUp.currentTime = 0;
        gameSound.powerUp.play();
      }
    }

  }

  this.onPowerUpCollision = function(powerUp, collisionDir){
    if(collisionDir == 'l' || collisionDir == 'r'){
      powerUp.velX *= -1;
    }else if(collisionDir == 'b'){
      powerUp.grounded = true;
    }else if(collisionDir == 't'){    
      
    }

  }

  this.wallCollision = function() {
    //for walls
    if (mario.x >= maxWidth - mario.width) {
      mario.x = maxWidth - mario.width;
    } else if (mario.x <= 0) {
      mario.x = 1;
    }

    // //for ground
    // if (mario.y >= height - mario.height) {

    //   mario.y = height - mario.height;
    //   mario.jumping = false;
    //   mario.grounded = true;
    //   //mario sprite position
    //   if (mario.frame == 3) {
    //     mario.frame = 0;
    //   } else if (mario.frame == 2) {
    //     mario.frame = 8;
    //   }
    // }
  }

  //controlling mario with key events
}


var marioGame = new MarioGame();
marioGame.init();
