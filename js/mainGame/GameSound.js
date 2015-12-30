function GameSound() {
  this.coin;
  this.powerUpAppear;
  this.powerUp;
  this.marioDie;
  this.killEnemy;
  this.stageClear;
  this.bullet;
  this.powerDown;
  this.jump;

  var that = this;

  this.init = function() {
    that.coin = new Audio('sounds/coin.wav');
    that.powerUpAppear = new Audio('sounds/power-up-appear.wav');
    that.powerUp = new Audio('sounds/power-up.wav');
    that.marioDie = new Audio('sounds/mario-die.wav');
    that.killEnemy = new Audio('sounds/kill-enemy.wav');
    that.stageClear = new Audio('sounds/stage-clear.wav');
    that.bullet = new Audio('sounds/bullet.wav');
    that.powerDown = new Audio('sounds/power-down.wav');
    that.jump = new Audio('sounds/jump.wav');
  }

}
