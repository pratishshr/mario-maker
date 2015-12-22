function CreatedLevels(marioGame) {
  var wrapper = document.getElementsByClassName('saved-levels')[0];
  var that = this;

  this.init = function() {
    wrapper.className = 'levels-wrapper';
    wrapper.style.display = 'block';
    
    that.showLevels();
  }

  this.showLevels = function() {
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
  }

  this.startLevel = function(i) {
    levelName = localStorage.key(i);
    levelMap = JSON.parse(localStorage.getItem(levelName));
    marioGame.init(levelMap);
  }
  
  this.showCreatedLevelsScreen = function() {
    if(wrapper){
      wrapper.style.display = 'block';
    }
  }

  this.removeCreatedLevelsScreen = function() {
    if(wrapper){
      wrapper.style.display = 'none';
    }
  }
}