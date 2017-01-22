var floorHeight = 20;
var svg = document.getElementById('world');
var worldHeight = 500;

var config = {
  portal: {
    in: {
      x: 430,
      y: 400
    },
    init: function() {
      this._dom.setAttribute('x', this.in.x);
      this._dom.setAttribute('y', this.in.y);

      var outDom = this._dom.cloneNode();
      outDom.setAttribute('x', this.out.x);
      outDom.setAttribute('y', this.out.y);

      svg.appendChild(outDom);
    },
    out: {
      x: 10,
      y: 400
    },
    _dom: document.getElementById('portal')
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
  _height: 50,
  _stepSize: 3,
  _width: 50,
  _x: 0,
  _y: worldHeight - floorHeight
};

function init() {
  player.init();

  setInterval(gameLoop, 1000/70);
}

function gameLoop() {
  player.step(config.world);
}
