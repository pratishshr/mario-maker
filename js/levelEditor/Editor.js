function Editor() {
  var gameWorld; //total game screen
  var viewPort; //viewable screen
  var grid;
  var elementwrapper; 

  var maxWidth;
  var height = 480;
 
  var tileSize = 32;

  var scrollMargin = 0;
  var rightScrollInterval;

  var selectedElement = [];
  var map;

  var that = this;

  this.init = function() {
    viewPort = document.getElementsByClassName('editor-screen')[0];
    
    viewPort.style.display = 'block';
    
    that.createLevelEditor();
    that.drawGrid(3840);
    that.showElements();    
  }

  this.createLevelEditor = function(){
    gameWorld = document.createElement('div');
    var rightArrow = document.createElement('div');
    var leftArrow = document.createElement('div');
    

    gameWorld.style.width = 6400 + 'px';
    gameWorld.style.height = height + 'px';

    rightArrow.className = 'right-arrow';
    leftArrow.className = 'left-arrow';
    
    viewPort.appendChild(rightArrow);
    viewPort.appendChild(leftArrow);
    viewPort.appendChild(gameWorld);
   
    rightArrow.addEventListener('click', that.rightScroll);
    leftArrow.addEventListener('click', that.leftScroll);

  }

  this.drawGrid = function(width) {
    maxWidth = width;
    grid = document.createElement('table');
    
    var row = height/tileSize;
    var column = maxWidth/tileSize;
 
    var mousedown = false;
    var selected = false;

    for(i = 1; i <= row; i++){
      var tr = document.createElement('tr');
      for(j = 1; j <= column; j++){
        var td = document.createElement('td');
        td.className = 'cell';

        td.addEventListener("mousedown", function(e) { //to stop the mouse pointer to change
          e.preventDefault(); 
        });

        td.onmousedown = (function(i, j){
          return function(){
            selectedElement.push(this);
            this.className = 'active';
            mousedown = true;
          }
        })(i, j);

        td.onmouseover = (function(i,j){
            return function(){
              if(mousedown){
                selectedElement.push(this);
                this.className = 'active';
              }  
            }
        })(i, j);

        td.onmouseup = function(){
          mousedown = false;
        }

        tr.appendChild(td);
      }
      grid.appendChild(tr);
      grid.onmouseleave = function() {
        mousedown = false;
      }
    }
    gameWorld.appendChild(grid);
  }

  this.showElements = function(){
    elementWrapper = document.getElementsByClassName('element-wrapper')[0];
    var saveMap = document.createElement('button');
    var clearMap = document.createElement('button');

    var elements = ['cell','platform', 'coin-box', 'mushroom-box', 'flower-box', 'useless-box', 'flag', 'flag-pole', 'pipe-left', 'pipe-right', 'pipe-top-left', 'pipe-top-right', 'goomba',];
    var element;

    var lvlSize = document.createElement('div');
    var gridSmallBtn = document.createElement('button');
    var gridMediumBtn = document.createElement('button');
    var gridLargeBtn = document.createElement('button');
  
    lvlSize.className = 'lvl-size';
    gridSmallBtn.className = 'grid-small-btn';
    gridMediumBtn.className = 'grid-medium-btn';
    gridLargeBtn.className = 'grid-large-btn';

    elementWrapper.style.display = 'block';

    saveMap.className = 'save-map-btn';
    clearMap.className = 'clear-map-btn';

    for(i=0; i < elements.length; i++){ 
      element = document.createElement('div');
      element.className = elements[i];
      element.onclick = (function(i){
        return function(){
          that.drawElement(elements[i]);
        } 
      })(i);
   
      elementWrapper.appendChild(element);
    }

    elementWrapper.appendChild(lvlSize);
    elementWrapper.appendChild(gridSmallBtn);
    elementWrapper.appendChild(gridMediumBtn);
    elementWrapper.appendChild(gridLargeBtn);

    elementWrapper.appendChild(clearMap);
    elementWrapper.appendChild(saveMap);

    saveMap.addEventListener('click', that.saveMap);
    clearMap.addEventListener('click', that.resetEditor);

    gridSmallBtn.addEventListener('click', that.gridSmall);
    gridMediumBtn.addEventListener('click', that.gridMedium);
    gridLargeBtn.addEventListener('click', that.gridLarge);
  }

  that.gridSmall = function() {
    gameWorld.removeChild(grid);
    that.drawGrid(1280);
  }

  that.gridMedium = function() {
    gameWorld.removeChild(grid);
    that.drawGrid(3840);
  }

  that.gridLarge = function() {
    gameWorld.removeChild(grid);
    that.drawGrid(6400);
  }

  this.drawElement = function(element){
    for(var i = 0; i < selectedElement.length; i++){
      selectedElement[i].className = element;
    }
    selectedElement = [];
  }

  that.generateMap = function(){
    var newMap = [];
    var gridRows = grid.getElementsByTagName('tr');
    
    for(var i = 0; i < gridRows.length; i++){
      var columns = [];
      var gridColumns = gridRows[i].getElementsByTagName('td');
      for(var j = 0; j < gridColumns.length; j++){
        var value;

        switch(gridColumns[j].className){
          case 'platform':
            value = 1;
            break;

          case 'coin-box':
            value = 2;
            break;

          case 'mushroom-box':
            value = 3;
            break;

          case 'useless-box':
            value = 4;
            break;

          case 'goomba':
            value = 20;
            break;
          
          case 'flag-pole':
            value = 5;
            break;

          case 'flag':
            value = 6;
            break;
          
          case 'pipe-left':
            value = 7;
            break;
          
          case 'pipe-right':
            value = 8;
            break;
          
          case 'pipe-top-left':
            value = 9;
            break;
          
          case 'pipe-top-right':
            value = 10;
            break;
          

          case 'flower-box':
            value = 11;
            break;

          default:
            value = 0;
            break;  
        }
        columns.push(value);
      }
      newMap.push(columns);
    }
    map = newMap;
  }

  this.saveMap = function() {
    var storage = new Storage();
    var levelCounter = storage.getItem('levelCounter') || 0;
   
    that.generateMap();
   
    levelCounter++;

    if(levelCounter < 10){
      levelName = 'savedLevel' + '0' + levelCounter;
    }else{
      levelName = 'savedLevel' + levelCounter;
    }
    
    storage.setItem(levelName, map);
    storage.setItem('levelCounter', levelCounter);

    console.log(storage.getItem(levelName));
    
  }


  
  this.rightScroll = function() { 
    if(scrollMargin > -(maxWidth - 1280)) {
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

  this.resetEditor = function(){
    var gridRows = grid.getElementsByTagName('tr');
    for(var i = 0; i < gridRows.length; i++){
      var gridColumns = gridRows[i].getElementsByTagName('td');

      for(var j = 0; j < gridColumns.length; j++){
          gridColumns[j].className = 'cell';
      }
    }

    selectedElement = [];
    scrollMargin = 0;
    gameWorld.style.marginLeft = scrollMargin + 'px'; 

  }

  this.removeEditorScreen = function() {
    if(viewPort){
      that.resetEditor();
      viewPort.style.display = 'none';
      elementWrapper.style.display = 'none';
    }
  }
  

  this.showEditorScreen = function() {
    if(viewPort){
      viewPort.style.display = 'block';
      elementWrapper.style.display = 'block';
    }
  } 
} 

