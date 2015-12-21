function CreatedLevels(marioGame) {
  var wrapper = document.createElement('div');
  var that = this;

  this.init = function() {
    wrapper.className = 'levelsWrapper';
    wrapper.style.display = 'block';
    document.body.appendChild(wrapper);

    that.showLevels();
  }

  this.showLevels = function() {
    for( var i = 1 ; i <= localStorage.length; i++){
      var levelButton = document.createElement('div');
      levelButton.innerHTML = localStorage.key(i);
      console.log(localStorage.key(i));

      wrapper.appendChild(levelButton);

      levelButton.onclick = (function(i){
        return function(){
          that.startLevel(i);
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