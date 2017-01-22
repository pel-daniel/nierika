var floorHeight = 20;
var svg = document.getElementById('world');
var worldHeight = 500;

var initHeigh = worldHeight - floorHeight;

var config = {
  portal: {
    in: {
      x: 430,
      y: initHeigh
    },
    init: function() {
      this._dom.setAttribute('x', this.in.x);
      this._dom.setAttribute('y', this.in.y - this._height);

      var outDom = this._dom.cloneNode();
      outDom.setAttribute('x', this.out.x);
      outDom.setAttribute('y', this.out.y - this._height);

      svg.appendChild(outDom);
    },
    out: {
      x: 10,
      y: initHeigh
    },
    _dom: document.getElementById('portal'),
    _height: 80
  },
  world: {
    init: function() {
      this._dom.setAttribute('height', this._height);
      this._dom.setAttribute('width', this._width);
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

    config.world.init();
    config.portal.init();
    this._draw();
  },
  step: function(config) {
    this._x += this._stepSize * this._direction;

    if(this.x() > config.world.width() - this._width || this.x() < 0) {
      this._changeDirection();
    }

    if(Math.abs(this.x() - config.portal.in.x) < this._stepSize &&
       Math.abs(this.y() - config.portal.in.y) < this._stepSize
    ) {
      this._x = config.portal.out.x;
      this._y = config.portal.out.y;
    }
    this._draw();
  },
  x: function() {
    return this._x;
  },
  y: function() {
    return this._y;
  },
  // privates
  _changeDirection: function() {
    this._direction *= -1;
  },
  _direction: 1,
  _dom: document.getElementById('player'),
  _draw: function() {
    this._dom.setAttribute('x', this.x());
    this._dom.setAttribute('y', this.y() - this._height);
  },
  _height: 50,
  _stepSize: 3,
  _width: 50,
  _x: 0,
  _y: initHeigh
};

function init() {
  player.init();

  setInterval(gameLoop, 1000/70);
}

function gameLoop() {
  player.step(config);
}
