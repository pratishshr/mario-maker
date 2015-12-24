function GameSound() {
  this.coin;
  this.powerUpAppear;
  this.powerUp;
  this.marioDie;
  this.killEnemy;
  this.stageClear;

  var that = this;

  this.init = function(){
    that.coin = new Audio('sounds/coin.wav');
    that.powerUpAppear = new Audio('sounds/power-up-appear.wav');
    that.powerUp = new Audio('sounds/power-up.wav');
    that.marioDie = new Audio('sounds/mario-die.wav');
    this.killEnemy = new Audio('sounds/kill-enemy.wav');
    this.stageClear = new Audio('sounds/stage-clear.wav');
  }

}