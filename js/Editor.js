function Editor() {
  var gameWorld; //total game screen
  var viewPort; //viewable screen

  var maxWidth = 1280 * 3;
  var height = 480;
 
  var tileSize = 32;

  var scrollMargin = 0;
  var rightScrollInterval;

  var scrollLeft = 0;
  var leftScrollInterval;

  var that = this;

  this.init = function() {
    viewPort = document.getElementsByClassName('game-screen')[0];
    viewPort.style.width = 1280 + 'px';
    viewPort.style.height = 480 + 'px';
    viewPort.style.position = 'relative';

    that.createWorld();
    that.drawGrid();
  }

  that.createWorld = function(){
    gameWorld = document.createElement('div');
    rightArrow = document.createElement('div');
    leftArrow = document.createElement('div');
    
    gameWorld.style.width = maxWidth + 'px';
    gameWorld.style.height = height + 'px';

    rightArrow.style.width = 60 + 'px';
    rightArrow.style.height = 60 + 'px';
    rightArrow.style.top = 215 + 'px';
    rightArrow.style.right = 0;
    rightArrow.style.background = 'url(images/slider-right.png)';
    rightArrow.style.position = 'absolute';

    leftArrow.style.width = 60 + 'px';
    leftArrow.style.height = 60 + 'px';
    leftArrow.style.top = 215 + 'px';
    leftArrow.style.left = 0;
    leftArrow.style.background = 'url(images/slider-left.png)';
    leftArrow.style.position = 'absolute';

    viewPort.style.overflow = 'hidden';
    viewPort.appendChild(gameWorld);
    viewPort.appendChild(rightArrow);
    viewPort.appendChild(leftArrow);

    rightArrow.addEventListener('click', that.rightScroll);
    leftArrow.addEventListener('click', that.leftScroll);

  }

  this.drawGrid = function() {
    var row = height/tileSize;
    var column = maxWidth/tileSize;
    var table = document.createElement('table');
    var mousedown = false;

    for(i = 1; i <= row; i++){
      var tr = document.createElement('tr');
      for(j = 1; j <=column; j++){
        var td = document.createElement('td');
        td.className = 'cell';
       
        td.onmousedown = (function(i, j){
          return function(){
            console.log(i);
            console.log(j);
            this.className += ' active';
            mousedown = true;
          }
        })(i, j);

        td.onmouseover = (function(i,j){
            return function(){
              if(mousedown){
                this.className += ' active';
              }  
            }
        })(i, j);

        td.addEventListener("mousedown", function(e) { e.preventDefault(); }, false);

        td.onmouseup = function(){
          console.log('hello');
          mousedown = false;
        }

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  
    gameWorld.appendChild(table);
  }

  this.rightScroll = function() { 
    if(scrollMargin > -(maxWidth - 1280)) {
      console.log(scrollMargin);
      scrollMargin += -160;
      gameWorld.style.marginLeft = scrollMargin + 'px'; 
    }  
  }

  this.leftScroll = function() {
    if(scrollMargin != 0){
      scrollMargin += 160;
      gameWorld.style.marginLeft = scrollMargin + 'px'; 
    }
  }
} 

editor = new Editor();
editor.init();