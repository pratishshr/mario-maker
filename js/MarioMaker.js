function MarioMaker() {
  var marioGame = new MarioGame();
  var editor = new Editor();

  var createdLevels = new CreatedLevels(marioGame);

  var editorButton;
  var editorStarted = 0;

  var startGameButton;
  var gameStarted = 0;

  var createdLevelsButton;
  var createdLevelsStarted = 0;

  this.init = function() {
    editorButton = document.createElement('button');
    startGameButton = document.createElement('button');
    createdLevelsButton = document.createElement('button');

    editorButton.innerHTML = 'Level Editor';
    startGameButton.innerHTML = 'Start Game';
    createdLevelsButton.innerHTML = 'Created Levels';

    editorButton.onclick = this.startEditor;
    startGameButton.onclick = this.startGame;
    createdLevelsButton.onclick = this.startCreatedLevels;

    document.body.appendChild(editorButton);
    document.body.appendChild(startGameButton);
    document.body.appendChild(createdLevelsButton);
  }


  this.startEditor = function() {
    if(editorStarted == 0) {
      editor.init();
      editorStarted = 1;
    }else {
      editor.showEditorScreen();
    }
    marioGame.removeGameScreen();
    createdLevels.removeCreatedLevelsScreen();
    
    editorButton.style.display = 'none';
    startGameButton.style.display = 'block';
  }

  this.startGame = function() {
    if(gameStarted == 0) {
      marioGame.init(map);
      gameStarted = 1;
    }else{
      marioGame.showGameScreen();   
    } 
    editor.removeEditorScreen();
    createdLevels.removeCreatedLevelsScreen();

    startGameButton.style.display = 'none';
    editorButton.style.display = 'block';
  }

  this.startCreatedLevels = function() {
    if(createdLevelsStarted == 0){
      createdLevels.init();
      createdLevelsStarted = 1;
    }else{
      createdLevels.showCreatedLevelsScreen();
    }
    marioGame.removeGameScreen();
    editor.removeEditorScreen();
  }
}

var marioMaker = new MarioMaker();
marioMaker.init();