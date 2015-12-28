function Score() {
  var scoreWrapper = document.getElementsByClassName('score-wrapper')[0];
  var coinScoreWrapper = document.createElement('div');
  var totalScoreWrapper = document.createElement('div');
  var lifeCountWrapper = document.createElement('div'); 
  var levelWrapper = document.createElement('div');

  this.coinScore;
  this.totalScore;
  this.lifeCount;

  var that = this;

  this.init = function() {
    coinScoreWrapper.className = 'coin-score';
    totalScoreWrapper.className = 'total-score';
    lifeCountWrapper.className = 'life-count';
    levelWrapper.className = 'level-num';

    scoreWrapper.appendChild(levelWrapper);
    scoreWrapper.appendChild(lifeCountWrapper);
    scoreWrapper.appendChild(coinScoreWrapper);
    scoreWrapper.appendChild(totalScoreWrapper);
   

    that.coinScore = 0;
    that.totalScore = 0;
    that.lifeCount = 5;

    that.updateCoinScore();
    that.updateTotalScore();
    that.updateLifeCount();
    that.updateLevelNum(1);
  }

  this.updateCoinScore = function() {
    if(that.coinScore == 100){
      that.coinScore = 0;
      that.lifeCount++;
      that.updateLifeCount();
    }
    coinScoreWrapper.innerHTML = 'Coins: ' + that.coinScore;
  }

  this.updateTotalScore = function() {
    totalScoreWrapper.innerHTML = 'Score: ' + that.totalScore; 
  }

  this.updateLifeCount = function() {
    lifeCountWrapper.innerHTML = 'x ' + that.lifeCount;
  }

  this.updateLevelNum = function(level) {
    levelWrapper.innerHTML = 'Level: ' + level; 
  }


  this.displayScore = function() {
    scoreWrapper.style.display = 'block';
  }

  this.hideScore = function() {
    scoreWrapper.style.display = 'none';
    that.coinScore = 0;
    that.lifeCount = 5  ;
    that.totalScore = 0;
    that.updateCoinScore();
    that.updateTotalScore();
    that.updateLifeCount();
  }
}

