function MarioMaker() {
  var marioGame;
  var editor;

  this.init = function() {
    var editorButton = document.createElement('button');
    var startGameButton = document.createElement('button');

    editorButton.innerHTML = 'Level Editor';
    startGameButton.innerHTML = 'Start Game';

    editorButton.onclick = this.startEditor;
    startGameButton.onclick = this.startGame;

    document.body.appendChild(editorButton);
    document.body.appendChild(startGameButton);
  }

  this.startEditor = function() {
    editor = new Editor();
    editor.init();
  }

  this.startGame = function() {
    marioGame = new MarioGame();
    marioGame.init();
  }

}

var marioMaker = new MarioMaker();
marioMaker.init();