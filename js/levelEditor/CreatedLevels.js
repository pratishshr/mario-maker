function CreatedLevels() {
  var view = View.getInstance();

  var storage;
  var wrapper = document.getElementsByClassName('saved-levels')[0];

  var that = this;

  this.init = function() {
    var deleteAllBtn = view.create('button');

    view.addClass(deleteAllBtn, 'delete-all-btn');
    view.addClass(wrapper, 'levels-wrapper');
    view.style(wrapper, { display: 'block' });
    view.append(wrapper, deleteAllBtn);
    deleteAllBtn.onclick = that.deleteAllMaps;

    storage = new Storage();

    that.showLevels();
  }

  this.showLevels = function() {
    var totalStoredLevels = storage.getLength();

    if (totalStoredLevels != 0) {
      for (var i = 1; i < totalStoredLevels; i++) {
        var levelButton = view.create('div');
        var levelName = storage.getItemName(i);
        
        view.setHTML(levelButton, levelName);
        view.addClass(levelButton, 'level-btn');
        view.append(wrapper, levelButton);

        levelButton.onclick = (function(i) {
          return function() {
            that.startLevel(i);
            that.removeCreatedLevelsScreen();
          }
        })(i);
      }
    } else {
      var noMapsMessage = view.create('div');
     
      view.addClass(noMapsMessage, 'no-maps');
      view.setHTML(noMapsMessage, 'No maps currently saved. Please use the Level Editor to create custom Maps');
      view.append(wrapper, noMapsMessage);
    }
  }

  this.deleteAllMaps = function() {
    storage.clear();

    that.removeCreatedLevelsScreen();
    that.init();
  }

  this.startLevel = function(i) {
    var marioMakerInstance = MarioMaker.getInstance();
    var levelName = storage.getItemName(i);
    var level = JSON.parse(storage.getItem(levelName));
    var map = { 1: level }; //always only one level in saved maps.

    marioMakerInstance.startGame(map);
  }

  this.showCreatedLevelsScreen = function() {
    if (wrapper) {
      view.style(wrapper, { display: 'block' });
    }
  }

  this.removeCreatedLevelsScreen = function() {
    if (wrapper) {
      view.style(wrapper, { display: 'none' });

      while (wrapper.hasChildNodes()) { //removes all the created levels on screen, so that it can be initiated again showing new levels that user creates
        view.remove(wrapper, wrapper.lastChild);
      }
    }
  }
}
