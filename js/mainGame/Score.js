function Score() {
  var view = View.getInstance();

  var scoreWrapper = document.getElementsByClassName('score-wrapper')[0];
  var coinScoreWrapper;
  var totalScoreWrapper;
  var lifeCountWrapper;
  var levelWrapper;

  this.coinScore;
  this.totalScore;
  this.lifeCount;

  var that = this;

  this.init = function() {
    that.coinScore = 0;
    that.totalScore = 0;
    that.lifeCount = 5;

    coinScoreWrapper = view.create('div');
    totalScoreWrapper = view.create('div');
    lifeCountWrapper = view.create('div');
    levelWrapper = view.create('div');

    view.addClass(coinScoreWrapper, 'coin-score');
    view.addClass(totalScoreWrapper, 'total-score');
    view.addClass(lifeCountWrapper, 'life-count');
    view.addClass(levelWrapper, 'level-num');
    view.append(scoreWrapper, levelWrapper);
    view.append(scoreWrapper, lifeCountWrapper);
    view.append(scoreWrapper, coinScoreWrapper);
    view.append(scoreWrapper, totalScoreWrapper);
  
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

    view.setHTML(coinScoreWrapper, 'Coins: ' + that.coinScore);
  }

  this.updateTotalScore = function() {
    view.setHTML(totalScoreWrapper, 'Score: ' + that.totalScore);
  }

  this.updateLifeCount = function() {
    view.setHTML(lifeCountWrapper, 'x ' + that.lifeCount);
  }

  this.updateLevelNum = function(level) {
    view.setHTML(levelWrapper, 'Level: ' + level);
  }


  this.displayScore = function() {
    view.style(scoreWrapper, {display: 'block', background: '#add1f3'});
  }

  this.hideScore = function() {
    view.style(scoreWrapper, {display: 'none'});
 
    that.coinScore = 0;
    that.lifeCount = 5  ;
    that.totalScore = 0;
    that.updateCoinScore();
    that.updateTotalScore();
    that.updateLifeCount();
  }

  this.gameOverView = function() {
    view.style(scoreWrapper, {background: 'black'});
  }
}

