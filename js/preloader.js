window.onload = function() {
  var sources = {
    1: 'images/back-btn.png',
    2: 'images/bg.png',
    3: 'images/bullet.png',
    4: 'images/clear-map-btn.png',
    5: 'images/coin.png',
    6: 'images/delete-all-btn.png',
    7: 'images/editor-btn.png',
    8: 'images/elements.png',
    9: 'images/enemies.png',
   10: 'images/flag-pole.png',
   11: 'images/flag.png',
   12: 'images/goombas.png',
   13: 'images/grid-large-btn.png',
   14: 'images/grid-medium-btn.png',
   15: 'images/grid-small-btn.png',
   16: 'images/grid.png',
   17: 'images/lvl-size.png',
   18: 'images/mario-head.png',
   19: 'images/mario-sprites.png',
   20: 'images/powerups.png',
   21: 'images/save-map-btn.png',
   22: 'images/saved-btn.png',
   23: 'images/slider-left.png',
   24: 'images/slider-right.png',
   25: 'images/start-btn.png',
   26: 'images/start-screen.png'
  }

  loadImages(sources);
}

function loadImages(sources) {
  var images = {};
  var loadedImages = 0;
  var totalImages = 0 ;
  
  for(var key in sources) {
    totalImages++;
  }

  for(var key in sources) {
    images[key] = new Image();
    images[key].src = sources[key];
    images[key].onload = function() {
      loadedImages++;
      if(loadedImages >= totalImages) {
        initMainApp();
      }
    }

  }
}


function initMainApp() {  
  var marioMakerInstance = MarioMaker.getInstance();
  marioMakerInstance.init();

}