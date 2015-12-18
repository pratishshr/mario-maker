function Editor() {
  var gameWorld; //total game screen
  var viewPort; //viewable screen
  var grid;

  var maxWidth = 1280 * 3;
  var height = 480;
 
  var tileSize = 32;

  var scrollMargin = 0;
  var rightScrollInterval;

  var scrollLeft = 0;
  var leftScrollInterval;

  var selectedElement = [];

  var that = this;

  this.init = function() {
    viewPort = document.getElementsByClassName('editor-screen')[0];
    
    viewPort.style.display = 'block';
    
    that.createLevelEditor();
    that.drawGrid();
    that.showElements();    
  }

  this.createLevelEditor = function(){
    gameWorld = document.createElement('div');
    var rightArrow = document.createElement('div');
    var leftArrow = document.createElement('div');
    

    gameWorld.style.width = maxWidth + 'px';
    gameWorld.style.height = height + 'px';

    rightArrow.className = 'right-arrow';
    leftArrow.className = 'left-arrow';
 
    viewPort.appendChild(gameWorld);
    viewPort.appendChild(rightArrow);
    viewPort.appendChild(leftArrow);
  
    rightArrow.addEventListener('click', that.rightScroll);
    leftArrow.addEventListener('click', that.leftScroll);

  }

  this.drawGrid = function() {
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
            if(selected != true){
              selectedElement.push(this);
              this.className = 'active';
              mousedown = true;
            }else{
              this.className = 'cell';
            }
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
    }
    gameWorld.appendChild(grid);
  }

  this.showElements = function(){
    var elementWrapper = document.createElement('div');
    var generateMap = document.createElement('button');
    var elements = ['platform', 'coin-box', 'mushroom-box', 'useless-box'];
    var element;

    elementWrapper.className = 'element-wrapper';
    generateMap.className = 'generate-map';
    generateMap.innerHTML = "Generate Map";

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

    elementWrapper.appendChild(generateMap);
    document.body.appendChild(elementWrapper);

    generateMap.addEventListener('click', that.generateMap);
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
} 

