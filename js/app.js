var worldHeight = 500;
var floorHeight = 20;

var config = {
  world: {
    init: function() {
      this._dom.setAttribute('height', this._height);
      this._dom.setAttribute('width', this._width);

      player.init();
    },
    width: function() {
      return this._width;
    },
    _dom: document.getElementById('world'),
    _height: worldHeight,
    _width: 500
  }
};

var player = {
  // public API
  init: function() {
    this._dom.setAttribute('height', this._height);
    this._dom.setAttribute('width', this._width);

    this._draw();
  },
  step: function(world) {
    this._x += this._stepSize * this._direction;

    if(this.x() > world.width() - this._width || this.x() < 0) {
      this._changeDirection();
    }
    this._draw();
  },
  x: function() {
    return this._x;
  },
  y: function() {
    return this._y - this._height;
  },
  // privates
  _changeDirection: function() {
    this._direction *= -1;
  },
  _direction: 1,
  _dom: document.getElementById('player'),
  _draw: function() {
    this._dom.setAttribute('x', this.x());
    this._dom.setAttribute('y', this.y());
  },
  _height: 20,
  _stepSize: 3,
  _width: 20,
  _x: 0,
  _y: worldHeight - floorHeight
};

function init() {
  config.world.init();

  setInterval(gameLoop, 1000/70);
}

function gameLoop() {
  player.step(config.world);
}
