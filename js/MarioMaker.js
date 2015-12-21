function MarioMaker() {
  var marioGame = new MarioGame();
  var editor = new Editor();

  var editorButton;
  var editorStarted = 0;

  var startGameButton;
  var gameStarted = 0;

  this.init = function() {
    editorButton = document.createElement('button');
    startGameButton = document.createElement('button');

    editorButton.innerHTML = 'Level Editor';
    startGameButton.innerHTML = 'Start Game';

    editorButton.onclick = this.startEditor;
    startGameButton.onclick = this.startGame;

    document.body.appendChild(editorButton);
    document.body.appendChild(startGameButton);
  }

  this.startEditor = function() {
    if(editorStarted == 0) {
      editor.init();
      editorStarted = 1;
    }else {
      editor.showEditorScreen();
    }
    marioGame.removeGameScreen();
 
    editorButton.style.display = 'none';
    startGameButton.style.display = 'block';
  }

  this.startGame = function() {
    if(gameStarted == 0) {
      marioGame.init();
      gameStarted = 1;
    }else{
      marioGame.showGameScreen();   
    } 
    editor.removeEditorScreen();

    startGameButton.style.display = 'none';
    editorButton.style.display = 'block';
  }

}

var marioMaker = new MarioMaker();
marioMaker.init();