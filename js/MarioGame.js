function MarioGame() {
  var canvas = document.getElementById('game-screen');
  var ctx = canvas.getContext('2d');
  var width = 1350;
  var height = 500;
  var mario; // mario instance
  var keys = [];

  var that = this;


  //testing collisions
   var map = [];
  //testing map
    map.push({
      x: 0,
      y: 0,
      width: 10,
      height: height
    });
    map.push({
      x: 0,
      y: height - 2,
      width: width,
      height: 50
    });
    map.push({
      x: width - 10,
      y: 0,
      width: 50,
      height: height
    });
    map.push({
      x: 500,
      y: 200,
      width: 80,
      height: 80
    });
    map.push({
        x: 250,
        y: 450,
        width: 80,
        height: 80
    });
    map.push({
        x: 320,
        y: 300,
        width: 80,
        height: 80
    });
    map.push({
        x: 580,
        y: 200,
        width: 80,
        height: 80
    });


  this.init = function() {
    canvas.width = width;
    canvas.height = height;
    mario = new Mario(canvas, ctx);
    mario.init();

    

    //key binding
    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });

    that.startGame();
  }

  this.startGame = function() {
    //Main Game Loop
    ctx.clearRect(0, 0, width, height);
    that.renderMap();

    mario.draw();
    mario.update(keys);


    that.wallCollision();

    requestAnimationFrame(that.startGame);
  }

  this.renderMap = function(){
    ctx.fillStyle = "black";
    ctx.beginPath();

    mario.grounded = false;

    for (var i = 0; i < map.length; i++) {
      ctx.rect(map[i].x, map[i].y, map[i].width, map[i].height);
      collDir = that.collCheck(mario, map[i]); //collision check with the map
      
      if(collDir == 'l' || collDir == 'r'){
        mario.velX = 0;
        mario.jumping = false;
      }else if(collDir == 'b'){
        mario.grounded = true;
        mario.jumping = false;
      }else if(collDir == 't'){
        mario.velY *= -1;
      }
    }
     
    ctx.fill();
  }

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
