var GameUI = (function() {

  var instance;

  function GameUI() {

    var canvas = document.getElementsByClassName('game-screen')[0];
    var ctx = canvas.getContext('2d');

    var that = this;

    this.setWidth = function(width) {
      canvas.width = width;
    }

    this.setHeight = function(height) {
      canvas.height = height;
    }

    this.getWidth = function() {
      return canvas.width;
    }

    this.getHeight = function() {
      return canvas.height;
    }

    this.show = function() {
      canvas.style.display = 'block';
    }

    this.hide = function() {
      canvas.style.display = 'none';
    }

    this.clear = function(x, y, width, height) {
      ctx.clearRect(x, y, width, height);
    }

    this.scrollWindow = function(x, y) {
      ctx.translate(x, y);
    }

    this.draw = function(image, sx, sy, width, height, x, y, width, height) {
      ctx.drawImage(image, sx, sy, width, height, x, y, width, height);
    }

    
  }  
  
  return {
    getInstance: function() {
      if (instance == null) {
        instance = new GameUI();
      }

      return instance;
    }
  }
  
}());

