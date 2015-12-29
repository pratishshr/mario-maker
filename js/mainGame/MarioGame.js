function MarioGame() {
  var canvas = document.getElementsByClassName('game-screen')[0];
  var gameUI = GameUI.getInstance();

  var maxWidth = 0; //width of the game world
  var height = 480;
  var viewPort = 1280; //width of canvas, viewPort that can be seen
  var tileSize = 32;
  var map;
  var originalMaps;

  var translatedDist = 0; //distance translated(side scrolled) as mario moves to the right
  var centerPos; //center position of the viewPort, viewable screen
  var marioInGround;

  var mario; // Mario instance
  var element; // Element instance
  var gameSound; //GameSound instance
  var score; 

  var powerUps = []; //all powerUps
  var keys = []; //all key presses
  var bullets = []; //all bullets
  var bulletFlag = false;
 
  var currentLevel; 

  var goombas = []; //all goombas;
  var timeOutId;

  var tickCounter = 0; //for animating mario
  var maxTick = 25; //max number for ticks to show mario sprite

  this.pause = false;

  var that = this;

  this.init = function(levelMaps,level) {
    maxWidth = 0;
    currentLevel = level;

    originalMaps = levelMaps;

    map = JSON.parse(JSON.stringify(levelMaps[currentLevel]));
    
    translatedDist = 0;
    that.pause = false;

    gameUI.setWidth(viewPort);
    gameUI.setHeight(height);
    gameUI.show();

    if(!score){
      score = new Score();
      score.init();
    }

    score.displayScore();
    score.updateLevelNum(currentLevel);

    if(!mario){
      mario = new Mario();
      mario.init();
    }
    mario.x = 10;
    element = new Element();

    gameSound = new GameSound();
    gameSound.init();

    goombas = [];
    powerUps = [];

    //key binding
    document.body.addEventListener('keydown', function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener('keyup', function(e) {
      keys[e.keyCode] = false;
    });

    canvas.addEventListener('touchstart', function(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = 0; i < touches.length; i++) {
        if(touches[i].pageX <= 200){
          keys[37] = true;
        }
        if(touches[i].pageX > 200 && touches[i].pageX < 400){
          keys[39] = true;
        }
        if(touches[i].pageX > 640 && touches[i].pageX <= 1080){
           keys[16] = true;
        }
        if(touches[i].pageX > 1080 && touches[i].pageX < 1280){
          keys[32] = true;
        }
      }
    });

    canvas.addEventListener('touchend', function(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = 0; i < touches.length; i++) {
        if(touches[i].pageX <= 200){
          keys[37] = false;
        }
        if(touches[i].pageX > 200 && touches[i].pageX <= 640){
          keys[39] = false;
        }
        if(touches[i].pageX > 640 && touches[i].pageX <= 1080){
           keys[16] = false;
        }
        if(touches[i].pageX > 1080 && touches[i].pageX < 1280){
          keys[32] = false;
        }
      }
    });

    canvas.addEventListener('touchmove', function(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = 0; i < touches.length; i++) {
        if(touches[i].pageX <= 200){
          keys[37] = true;
          keys[39] = false;
        }
        if(touches[i].pageX > 200 && touches[i].pageX < 400){
          keys[39] = true;
          keys[37] = false;
        }
        if(touches[i].pageX > 640 && touches[i].pageX <= 1080){
           keys[16] = true;
           keys[32] = false;
        }
        if(touches[i].pageX > 1080 && touches[i].pageX < 1280){
          keys[32] = true;
          keys[16] = false;
        }
      }
    });


    that.startGame();
  }

  //Main Game Loop
  this.startGame = function() {
    if(!that.pause){
      window.requestAnimationFrame(that.startGame);
    }

    gameUI.clear(0, 0, maxWidth, height);
    that.renderMap();
    mario.draw();
    
    that.updateMario();
    marioInGround = mario.grounded;

    that.wallCollision();

    for(var i = 0; i < goombas.length; i++){
      goombas[i].draw();
      goombas[i].update();
    }

    for (var i = 0; i < powerUps.length; i++) {
      powerUps[i].draw();
      powerUps[i].update();
    }

    for (var i = 0; i < bullets.length; i++) {
      bullets[i].draw();
      bullets[i].update();
    }

  }

  this.renderMap = function() {

    mario.grounded = false;

    for (var i = 0; i < powerUps.length; i++) {
      powerUps[i].grounded = false;
    }
    for (var i = 0; i < goombas.length; i++) {
      goombas[i].grounded = false;
    }

    for (var row = 0; row < map.length; row++) {
      
      for (var column = 0; column < map[row].length; column++) {
        if(maxWidth < (map[row].length * 32)){
          maxWidth = map[column].length * 32;
        }
        switch (map[row][column]) {
          case 1:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform();
            element.draw();

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
            
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 2:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.coinBox();
            element.draw();

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
           
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 3:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.mushroomBox();
            element.draw();

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
           
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 4:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.uselessBox();
            element.draw();

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
            
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 5:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.flagPole();
            element.draw();

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);

            break;

          case 6:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.flag();
            element.draw(); 
            break;

          case 7:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeLeft();
            element.draw(); 

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
            
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 8:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeRight();
            element.draw(); 

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
            
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 9:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeTopLeft();
            element.draw(); 

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
            
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;

          case 10:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeTopRight();
            element.draw(); 

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
            
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;  

          case 11:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.flowerBox();
            element.draw();

            var collisionDirection = that.collisionCheck(mario, element);
            that.onCollision(element, collisionDirection, row, column);
           
            that.checkPowerUpCollision(element);
            that.checkEnemyCollision(element);
            that.checkBulletCollision(element);
            break;
          
          case 20: 
            var enemy = new Enemy(); 
            enemy.x = column * tileSize;
            enemy.y = row * tileSize;
            enemy.goomba();
            enemy.draw();

            goombas.push(enemy);
            map[row][column] = 0;
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
    var collisionDirection = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths  && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      var offsetX = hWidths - Math.abs(vX),
        offsetY = hHeights - Math.abs(vY);

      if (offsetX >= offsetY) {
        if (vY > 0 && vY < 37) {
          collisionDirection = 't';
          if(objB.type != 5){ //if flagpole then pass through it
            objA.y += offsetY;
          }
        } else if(vY < 0) {
          collisionDirection = 'b';
          if(objB.type != 5){ //if flagpole then pass through it
            objA.y -= offsetY;
          }
        }
      } else {
        if (vX > 0) {
          collisionDirection = 'l';
          objA.x += offsetX;
        } else {
          collisionDirection = 'r';
          objA.x -= offsetX;
        }
      }
    }
    return collisionDirection;
  }


  this.onCollision = function(element, collisionDirection, row, column) {
    if (collisionDirection == 'l' || collisionDirection == 'r') {
      mario.velX = 0;
      mario.jumping = false;

      if(element.type == 5) { //flag pole
        that.gameFinish();
      }

    } else if (collisionDirection == 'b') {
        if(element.type != 5){ //only if not flag pole
          mario.grounded = true;
          mario.jumping = false;
        }
    } else if (collisionDirection == 't') {
        if(element.type != 5){
          mario.velY *= -1;
        }

        if (element.type == 3) { //Mushroom Box
          var powerUp = new PowerUp();
          powerUp.mushroom(element.x, element.y);
          powerUps.push(powerUp);

          map[row][column] = 4;

          //sound when mushroom appears
          gameSound.powerUpAppear.pause();
          gameSound.powerUpAppear.currentTime = 0;
          gameSound.powerUpAppear.play();
        }

        if (element.type == 11) { //Flower Box
          var powerUp = new PowerUp();
          powerUp.flower(element.x, element.y);
          powerUps.push(powerUp);

          map[row][column] = 4;

          //sound when mushroom appears
          gameSound.powerUpAppear.pause();
          gameSound.powerUpAppear.currentTime = 0;
          gameSound.powerUpAppear.play();
        }

        if (element.type == 2) { //Coin Box
          score.coinScore++ ;
          score.totalScore += 100;
          
          score.updateCoinScore();
          score.updateTotalScore();
          map[row][column] = 4;

          

          //sound when coin block is hit
          gameSound.coin.pause();
          gameSound.coin.currentTime = 0;
          gameSound.coin.play();
        }
    }
  }

  this.checkPowerUpCollision = function(element) {
    for (var i = 0; i < powerUps.length; i++) {
      var collisionDirection = that.collisionCheck(powerUps[i], element);
      var collWithMario = that.collisionCheck(powerUps[i], mario);

      that.onPowerUpCollision(powerUps[i], collisionDirection);
      
      if (collWithMario) {
        if(powerUps[i].type == 30){
          mario.type = 'big';
        }
        if(powerUps[i].type == 31){
          mario.type = 'fire';
        }
        powerUps.splice(i, 1);

        score.totalScore += 1000;
        score.updateTotalScore(); 

        //sound when mushroom appears
        gameSound.powerUp.pause();
        gameSound.powerUp.currentTime = 0;
        gameSound.powerUp.play();
      }
    }


  }

  this.onPowerUpCollision = function(powerUp, collisionDirection) {
    if (collisionDirection == 'l' || collisionDirection == 'r') {
      powerUp.velX *= -1;
    } else if (collisionDirection == 'b') {
      powerUp.grounded = true;
    } else if (collisionDirection == 't') {

    }

  }

  this.checkEnemyCollision = function(element) {
    for(var i = 0; i < goombas.length; i++){
      var collisionDirection = that.collisionCheck(goombas[i], element);
      if(!mario.invulnerable){
      var collWithMario = that.collisionCheck(goombas[i], mario);
      }
    

      that.onEnemyCollision(goombas[i], collisionDirection);
      if(collWithMario == 't') {
        goombas.splice(i,1);
        mario.velY = -((mario.speed));
        score.totalScore += 1000;
        score.updateTotalScore();

        //sound when enemy dies
        gameSound.killEnemy.pause();
        gameSound.killEnemy.currentTime = 0;
        gameSound.killEnemy.play();
      }else if(collWithMario == 'r' || collWithMario == 'l' || collWithMario == 'b'){
        goombas[i].velX *= -1;
        mario.invulnerable = true;
        if(mario.type == 'big'){
          mario.type = 'small';
          collWithMario = undefined;


          //sound when mario dies
          gameSound.powerDown.pause();
          gameSound.powerDown.currentTime = 0;
          gameSound.powerDown.play();

         setTimeout(function() {
            mario.invulnerable = false;
          }, 1000); 

        }else if(mario.type == 'small'){
          mario.frame = 13;
          that.pause = true;
          collWithMario = undefined;

          score.lifeCount--;
          score.updateLifeCount();
          //sound when mario dies
          gameSound.marioDie.pause();
          gameSound.marioDie.currentTime = 0;
          gameSound.marioDie.play();
          
          timeOutId = setTimeout(function() {
            that.resetGame();
            if(score.lifeCount == 0) {
              that.gameOver();
            }
          }, 3000); 

        }else if(mario.type == 'fire'){
          mario.type = 'big';
          collWithMario = undefined;
        
          //sound when mario dies
          gameSound.powerDown.pause();
          gameSound.powerDown.currentTime = 0;
          gameSound.powerDown.play();

          setTimeout(function() {
            mario.invulnerable = false;
          }, 1000); 
        }


      }

      for(var j = 0; j < bullets.length; j++){
        if(goombas[i]){
          var collWithBullet = that.collisionCheck(goombas[i], bullets[j]);
        }
         if(collWithBullet){
          bullets[j] = null;
          bullets.splice(j,1);
          goombas.splice(i,1);

           //sound when enemy dies
          gameSound.killEnemy.pause();
          gameSound.killEnemy.currentTime = 0;
          gameSound.killEnemy.play();
        }
       
      }

    
     
    }
  }


  this.onEnemyCollision = function(enemy, collisionDirection) {
    if (collisionDirection == 'l' || collisionDirection == 'r') {
      enemy.velX *= -1;
    } else if (collisionDirection == 'b') {
      enemy.grounded = true;
    } else if (collisionDirection == 't') {

    }
  }

  this.checkBulletCollision = function(element){
    for (var i = 0; i < bullets.length; i++) {
      var collisionDirection = that.collisionCheck(bullets[i], element);
      
      if(collisionDirection == 'b'){
        bullets[i].grounded = true;
      }else if(collisionDirection == 't' || collisionDirection == 'l' || collisionDirection == 'r'){
        bullets.splice(i,1);
      }

    }
  }

  this.wallCollision = function() {
    //for walls
    if (mario.x >= maxWidth - mario.width) {
      mario.x = maxWidth - mario.width;
    } else if (mario.x <= translatedDist) {
      mario.x = translatedDist + 1;
    }

    //for ground
    if (mario.y >= height) {
      that.pause = true;

      //sound when mario dies
     gameSound.marioDie.pause();
     gameSound.marioDie.currentTime = 0;
     gameSound.marioDie.play();
     
     score.lifeCount--;
     score.updateLifeCount();
     timeOutId = setTimeout(function() {
        that.resetGame();
        if(score.lifeCount == 0) {
            that.gameOver();
        }
      }, 3000); 
    }

    if(bullets.length > 0){
      if(bullets[0].y >= height) {
        bullets.splice(0,1);
      }
    }
  }

  //controlling mario with key events
  this.updateMario = function() {
    var friction = 0.9;
    var gravity = 0.2;

    mario.checkMarioType();
   

    if (keys[38] || keys[32]) {
      //up arrow
      if (!mario.jumping && mario.grounded) {
        mario.jumping = true;
        mario.grounded = false;
        mario.velY = -((mario.speed) + 3);

        // mario sprite position
        if (mario.frame == 0 || mario.frame == 1) {
          mario.frame = 3; //right jump
        } else if (mario.frame == 8 || mario.frame == 9) {
          mario.frame = 2; //left jump
        }

        //sound when mario jumps
         gameSound.jump.pause();
         gameSound.jump.currentTime = 0;
         gameSound.jump.play();
      }
    }

    if (keys[39]) {
      //right arrow
      that.checkMarioPos();

      if (mario.velX < mario.speed) {
        mario.velX++;
      }

      //mario sprite position
      if (!mario.jumping) {
        tickCounter += 1;

        if (tickCounter > maxTick / mario.speed) {
          tickCounter = 0;

          if (mario.frame != 1) {
            mario.frame = 1;
          } else {
            mario.frame = 0;
          }
        }
      }

    }

    if (keys[37]) {
      //left arrow
      if (mario.velX > -mario.speed) {
        mario.velX--;
      }

      //mario sprite position
      if (!mario.jumping) {
        tickCounter += 1;

        if (tickCounter > maxTick / mario.speed) {
          tickCounter = 0;

          if (mario.frame != 9) {
            mario.frame = 9;
          } else {
            mario.frame = 8;
          }
        }
      }

    }

    if (keys[16]) {
      //shift key
      mario.speed = 4.5;
    } else {
      mario.speed = 3;
    }


    if(keys[17] && mario.type == 'fire'){
      //ctrl key
      
      if(!bulletFlag){
        bulletFlag = true;
        var bullet = new Bullet();
        if (mario.frame == 9 || mario.frame == 8 || mario.frame == 2){
          var direction = -1;
        }else{
          var direction = 1;
        }
        bullet.init(mario.x,mario.y, direction);
        bullets.push(bullet);

        //bullet sound
        gameSound.bullet.pause();
        gameSound.bullet.currentTime = 0;
        gameSound.bullet.play();
        setTimeout(function(){
          bulletFlag = false;
        }, 500)
      }
      
    }

    //velocity 0 sprite position
    if (mario.velX > 0 && mario.velX < 1 && !mario.jumping) {
      mario.frame = 0;
    } else if (mario.velX > -1 && mario.velX < 0 && !mario.jumping) {
      mario.frame = 8;
    }

    if (mario.grounded) {
      mario.velY = 0;
    }

    //change mario position
    mario.velX *= friction;
    mario.velY += gravity;

    mario.x += mario.velX;
    mario.y += mario.velY;
  }

  this.checkMarioPos = function() {
    centerPos = (translatedDist) + (viewPort / 2);
   
    //side scrolling as mario reaches center of the viewPort
    if ((mario.x > centerPos) && ((centerPos + viewPort / 2) < maxWidth)) {
      gameUI.scrollWindow(-mario.speed, 0);
      translatedDist += mario.speed;
    }
  }

  this.gameFinish = function() {
    mario.x += 10;
    mario.velY = 2;
    mario.frame = 11;

    if(marioInGround){
      mario.x += 20;
      mario.frame = 10;
      tickCounter += 1;
        if (tickCounter > maxTick) {
          mario.x += 10;
          tickCounter = 0;
          mario.frame = 12;
          that.pause = true;

          //sound when stage clears
          gameSound.stageClear.pause();
          gameSound.stageClear.currentTime = 0;
          gameSound.stageClear.play();

          timeOutId = setTimeout(function(){
            currentLevel++;
            if(originalMaps[currentLevel]){
              that.init(originalMaps, currentLevel);
              score.updateLevelNum(currentLevel);
            }else{
              that.gameOver();
            }
          }, 5000)
        }
    }

  }

  this.gameOver = function() {
     var marioMakerInstance = MarioMaker.getInstance(); 
     marioMakerInstance.backToMenu();
  }

  this.resetGame = function() {
    that.pause = false;

    that.clearInstances();
    that.init(originalMaps,currentLevel);   
  }

  this.clearInstances = function() {
    mario = null;
    element = null;
    gameSound = null;
    goombas = [];
    bullets = [];
    powerUps = [];
  }

  this.clearReset = function() {
    clearTimeout(timeOutId);
  }

  this.removeGameScreen = function() {
    gameUI.hide();
   
    if(score){
     score.hideScore();
    }
  }

  this.showGameScreen = function() {
    gameUI.show();
  }
}
