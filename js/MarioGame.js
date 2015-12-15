function MarioGame() {
  var canvas = document.getElementById('game-screen');
  var ctx = canvas.getContext('2d');
  var width = 1280 * 3;
  var height = 480;

  var viewport = width/3;

  var tileSize = 32;  
  
  var mario; // mario instance


  var element;
  var keys = []; //key presses
 
  var that = this;

  this.init = function() {
    canvas.width = viewport;
    canvas.height = height;
    mario = new Mario(canvas, ctx);
    mario.init();

    element = new Element();
    
    //key binding
    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });

    // that.renderMap();
    that.startGame();
  }

  this.startGame = function() {
    //Main Game Loop
    ctx.clearRect(0, 0, width, height);
    that.renderMap();

    mario.draw();
    mario.update(keys);

    requestAnimationFrame(that.startGame);
  }


  this.renderMap = function() {
    mario.grounded = false;
    that.checkOffset();

    for(var row = 0; row < map.length; row++) {
      for(var column = 0; column < map[0].length; column++) {
          switch(map[row][column]) {
            case 1: 
              element.x = column * tileSize;
              element.y = row * tileSize;
              element.platform();
              element.draw(ctx);
              collDir = that.collCheck(mario, element);
              that.onCollision(collDir, element.type, row, column);
              break;

            case 2:
              element.x = column * tileSize;
              element.y = row * tileSize;
              element.coinBox();
              element.draw(ctx);
              collDir = that.collCheck(mario, element);
              that.onCollision(collDir, element.type, row, column);
              break; 

            case 3:
              element.x = column * tileSize;
              element.y = row * tileSize;
              element.mushroomBox();
              element.draw(ctx);
              collDir = that.collCheck(mario, element);
              that.onCollision(collDir, element.type, row, column);
              break; 

            case 4:
              element.x = column * tileSize;
              element.y = row * tileSize;
              element.uselessBox();
              element.draw(ctx);
              collDir = that.collCheck(mario, element);
              that.onCollision(collDir, element.type, row, column);
              break;   
          }
          
      }
    }
  }

  this.checkOffset = function() {
    offsetX = mario.x;
  }

  this.onCollision = function(collDir,type, row, column) {
    if(collDir == 'l' || collDir == 'r'){
      mario.velX = 0;
      mario.jumping = false;
    }else if(collDir == 'b'){
      mario.grounded = true;
      mario.jumping = false;
    }else if(collDir == 't'){
      mario.velY *= -1;
      if(type == 3){
        map[row][column] = 4;
      }
    }
  }
  // this.renderMap = function(){
  //   ctx.fillStyle = "black";
  //   ctx.beginPath();

  //   mario.grounded = false;

  //   for (var i = 0; i < block.length; i++) {
  //     ctx.rect(block[i].x, block[i].y, block[i].width, block[i].height);
  //     collDir = that.collCheck(mario, block[i]); //collision check with the block
      
      // if(collDir == 'l' || collDir == 'r'){
      //   mario.velX = 0;
      //   mario.jumping = false;
      // }else if(collDir == 'b'){
      //   mario.grounded = true;
      //   mario.jumping = false;
      // }else if(collDir == 't'){
      //   mario.velY *= -1;
      // }
  //   }
     
  //   ctx.fill();
  // }

  this.collCheck = function(objA, objB) {
    // get the vectors to check against
    var vX = (objA.x + (objA.width / 2)) - (objB.x + (objB.width / 2));
    var vY = (objA.y + (objA.height / 2)) - (objB.y + (objB.height / 2));
    
    // add the half widths and half heights of the objects
    var hWidths = (objA.width / 2) + (objB.width / 2);
    var hHeights = (objA.height / 2) + (objB.height / 2);
    var collDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var offsetX = hWidths - Math.abs(vX),
            offsetY = hHeights - Math.abs(vY);

        if (offsetX >= offsetY) {
            if (vY > 0) {
                collDir = 't';
                objA.y += offsetY;
            } else {
                collDir = 'b';
                objA.y -= offsetY;
            }
        } else {
            if (vX > 0) {
                collDir = 'l';
                objA.x += offsetX;
            } else {
                collDir = 'r';
                objA.x -= offsetX;
            }
        }
    }
    return collDir;
  }

  this.wallCollision = function() {
    //for walls
    if (mario.x >= width - mario.width) {
      mario.x = width - mario.width;
    } else if (mario.x <= 0) {
      mario.x = 0;
    }

    //for ground
    if (mario.y >= height - mario.height) {

      mario.y = height - mario.height;
      mario.jumping = false;
      mario.grounded = true;
      //mario sprite position
      if (mario.frame == 3) {
        mario.frame = 0;
      } else if (mario.frame == 2) {
        mario.frame = 8;
      }
    }
  }
}



var marioGame = new MarioGame();
marioGame.init();
