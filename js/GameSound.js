function GameSound() {
  this.coin;
  this.powerUpAppear;
  this.powerUp;

  var that = this;

  this.init = function(){
    that.coin = new Audio('sounds/coin.wav');
    that.powerUpAppear = new Audio('sounds/power-up-appear.wav');
    that.powerUp = new Audio('sounds/power-up.wav')
  }

}