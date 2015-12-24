
function CreatedLevels() {
  var wrapper = document.getElementsByClassName('saved-levels')[0];
  var that = this;

  this.init = function() {
    var deleteAllBtn = document.createElement('button');
    deleteAllBtn.className = 'delete-all-btn';
  
    wrapper.className = 'levels-wrapper';
    wrapper.style.display = 'block';
     
    deleteAllBtn.onclick = that.deleteAllMaps;

    wrapper.appendChild(deleteAllBtn);

    that.showLevels();
  }

  this.showLevels = function() {
    if(localStorage.length != 0){
      for( var i = 1 ; i < localStorage.length; i++){
        var levelButton = document.createElement('div');
        levelButton.innerHTML = localStorage.key(i);
        console.log(localStorage.key(i));

        levelButton.className = 'level-btn';
        wrapper.appendChild(levelButton);

        levelButton.onclick = (function(i){
          return function(){
            that.startLevel(i);
            that.removeCreatedLevelsScreen();
          } 
        })(i);  
      }
    }else{
      var noMaps = document.createElement('div');
      noMaps.className = 'no-maps';
      noMaps.innerHTML = 'No maps currently saved. Please use the Level Editor to create custom Maps';
      wrapper.appendChild(noMaps);
    }
  }

  this.deleteAllMaps = function() {
    localStorage.clear();
    that.removeCreatedLevelsScreen();
    that.init();
  }

  this.startLevel = function(i) {
    var marioMakerInstance = MarioMaker.getInstance();

    levelName = localStorage.key(i);
    levelMap = JSON.parse(localStorage.getItem(levelName));
    
    marioMakerInstance.startGame(levelMap);
  }
  
  this.showCreatedLevelsScreen = function() {
    if(wrapper){
      wrapper.style.display = 'block';
    }
  }

  this.removeCreatedLevelsScreen = function() {
    if(wrapper){
      wrapper.style.display = 'none';
      while (wrapper.hasChildNodes()) {
        wrapper.removeChild(wrapper.lastChild);
      }
    }
  }
}