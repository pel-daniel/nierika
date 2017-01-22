var config = {
  floor: {
    height: 20
  },
  world: {
    dom: document.getElementById('world'),
    height: 500,
    init: function() {
      this.dom.setAttribute('height', this.height);
      this.dom.setAttribute('width', this.width);
    },
    width: 500
  }
};

var player = {
  changeDirection: function() {
    this._direction *= -1;
  },
  dom: document.getElementById('player'),
  height: 20,
  step: function() {
    this._x += this._stepSize * this._direction;
  },
  width: 20,
  x: function() {
    return this._x;
  },
  y: function() {
    return this._y - player.height;
  },
  _direction: 1,
  _stepSize: 3,
  _x: 0,
  _y: config.world.height - config.floor.height
};

function init() {
  config.world.init();
  playerInit(player);

  setInterval(gameLoop, 1000/70);
}

function playerInit(player) {
  player.dom.setAttribute('height', player.height);
  player.dom.setAttribute('width', player.width);

  drawPlayer(player);
}

function drawPlayer(player) {
  player.dom.setAttribute('x', player.x());
  player.dom.setAttribute('y', player.y());
}

function gameLoop() {
  if(player.x() > config.world.width - player.width || player.x() < 0) {
    player.changeDirection();
  }

  player.step();
  drawPlayer(player);
}
