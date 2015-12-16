function GameSound() {
  this.bgMusic;
  this.coin;
  this.powerUpAppear;
  this.powerUp;

  var that = this;

  this.init = function(){
    that.bgMusic = new Audio('sounds/main-theme.mp3');
    that.coin = new Audio('sounds/coin.wav');
    that.powerUpAppear = new Audio('sounds/power-up-appear.wav');
    that.powerUp = new Audio('sounds/power-up.wav')
  }

}