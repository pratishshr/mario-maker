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

  var view = new View();

  var that = this;

  this.init = function() {
    viewPort = document.getElementsByClassName('editor-screen')[0];
    
    view.style(viewPort, {display: 'block'});
    
    that.createLevelEditor();
    that.drawGrid(3840);
    that.showElements();    
  }

  this.createLevelEditor = function(){
    var rightArrow = view.create('div'); 
    var leftArrow = view.create('div');
    gameWorld = view.create('div');
    
    
    view.style(gameWorld, {width: 6400 + 'px'});
    view.style(gameWorld, {height: height + 'px'});
 
    view.addClass(rightArrow, 'right-arrow');
    view.addClass(leftArrow, 'left-arrow');
 
    view.append(viewPort, rightArrow);
    view.append(viewPort, leftArrow);
    view.append(viewPort, gameWorld);
   
    rightArrow.addEventListener('click', that.rightScroll);
    leftArrow.addEventListener('click', that.leftScroll);

  }

  this.drawGrid = function(width) {
    maxWidth = width;
    grid = view.create('table');
    
    var row = height/tileSize;
    var column = maxWidth/tileSize;
 
    var mousedown = false;
    var selected = false;

    for(i = 1; i <= row; i++){
      var tr = view.create('tr');
      for(j = 1; j <= column; j++){
        var td = view.create('td');
        view.addClass(td, 'cell');

        td.addEventListener("mousedown", function(e) { //to stop the mouse pointer to change
          e.preventDefault(); 
        });

        td.onmousedown = (function(i, j){
          return function(){
            selectedElement.push(this);
            view.addClass(this, 'active');
            mousedown = true;
          }
        })(i, j);

        td.onmouseover = (function(i,j){
            return function(){
              if(mousedown){
                selectedElement.push(this);
                view.addClass(this, 'active');
              }  
            }
        })(i, j);

        td.onmouseup = function(){
          mousedown = false;
        }
        view.append(tr, td);
      }
      view.append(grid, tr);

      grid.onmouseleave = function() {
        mousedown = false;
      }
    }
    view.append(gameWorld, grid);
  }

  this.showElements = function(){
    elementWrapper = document.getElementsByClassName('element-wrapper')[0];
    var saveMap = view.create('button');
    var clearMap = view.create('button');

    var elements = ['cell','platform', 'coin-box', 'mushroom-box', 'flower-box', 'useless-box', 'flag', 'flag-pole', 'pipe-left', 'pipe-right', 'pipe-top-left', 'pipe-top-right', 'goomba',];
    var element;

    var lvlSize = view.create('div');
    var gridSmallBtn = view.create('button');
    var gridMediumBtn = view.create('button');
    var gridLargeBtn = view.create('button');
    
    view.addClass(lvlSize, 'lvl-size');
    view.addClass(gridSmallBtn, 'grid-small-btn');
    view.addClass(gridMediumBtn, 'grid-medium-btn');
    view.addClass(gridLargeBtn, 'grid-large-btn');

    view.style(elementWrapper, {display: 'block'});

    view.addClass(saveMap, 'save-map-btn');
    view.addClass(clearMap, 'clear-map-btn');

    for(i=0; i < elements.length; i++){ 
      element = view.create('div');
      view.addClass(element, elements[i]);

      element.onclick = (function(i){
        return function(){
          that.drawElement(elements[i]);
        } 
      })(i);
      
      view.append(elementWrapper, element);
    }

    view.append(elementWrapper, lvlSize);
    view.append(elementWrapper, gridSmallBtn);
    view.append(elementWrapper, gridMediumBtn);
    view.append(elementWrapper, gridLargeBtn);
    view.append(elementWrapper, clearMap);
    view.append(elementWrapper, saveMap);

    saveMap.addEventListener('click', that.saveMap);
    clearMap.addEventListener('click', that.resetEditor);
    gridSmallBtn.addEventListener('click', that.gridSmall);
    gridMediumBtn.addEventListener('click', that.gridMedium);
    gridLargeBtn.addEventListener('click', that.gridLarge);
  }

  that.gridSmall = function() {
    view.remove(gameWorld, grid);
    that.drawGrid(1280);
  }

  that.gridMedium = function() {
    view.remove(gameWorld, grid);
    that.drawGrid(3840);
  }

  that.gridLarge = function() {
    view.remove(gameWorld, grid);
    that.drawGrid(6400);
  }

  this.drawElement = function(element){
    for(var i = 0; i < selectedElement.length; i++){
      view.addClass(selectedElement[i], element)
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
      view.style(gameWorld, {'margin-left': scrollMargin + 'px'});
    }  
  }

  this.leftScroll = function() {
    if(scrollMargin != 0){
      scrollMargin += 160;
      view.style(gameWorld, {'margin-left': scrollMargin + 'px'});
    }
  }

  this.resetEditor = function(){
    var gridRows = grid.getElementsByTagName('tr');
    for(var i = 0; i < gridRows.length; i++){
      var gridColumns = gridRows[i].getElementsByTagName('td');

      for(var j = 0; j < gridColumns.length; j++){
        view.addClass(gridColumns[j], 'cell');
      }
    }

    selectedElement = [];
    scrollMargin = 0;
    view.style(gameWorld, {'margin-left': scrollMargin + 'px'});
  }

  this.removeEditorScreen = function() {
    if(viewPort){
      that.resetEditor();
      view.style(viewPort, {display: 'none'});
      view.style(elementWrapper, {display: 'none'});
    }
  }
  

  this.showEditorScreen = function() {
    if(viewPort){
      view.style(viewPort, {display: 'block'});
      view.style(elementWrapper, {display: 'block'});
    }
  } 
} 

