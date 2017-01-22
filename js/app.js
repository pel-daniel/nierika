var floorHeight = 15;
var svg = document.getElementById('world');
var worldHeight = 500;

var initHeigh = worldHeight - floorHeight;

var config = {
  floors: {
    init: function() {
      var self = this;

      self.bBoxes.forEach(function(box) {
        var boxDom = self._dom.cloneNode();

        boxDom.classList = [];
        boxDom.setAttribute('height', box._height);
        boxDom.setAttribute('width', box._width);
        boxDom.setAttribute('x', box._x);
        boxDom.setAttribute('y', box._y - box._height);

        svg.prepend(boxDom);
      });
    },
    _dom: document.getElementById('floor'),
    _height: 34,
    bBoxes: [
      { _height: 34, _width: 1020, _x: 0, _y: worldHeight },
      { _height: 34, _width: 300, _x: 0, _y: worldHeight - 100 },
      { _height: 34, _width: 250, _x: 80, _y: worldHeight - 250 }
    ],
  },
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

      svg.prepend(outDom);
    },
    out: {
      x: 10,
      y: initHeigh - 100
    },
    _dom: document.getElementById('portal'),
    _height: 80
  },
  portal_shadow: {
    init: function() {
      var self = this;
      this._dom.setAttribute('width', self._width);

      svg.onmousemove = function(e) {
        self._dom.setAttribute('x', e.offsetX - (self._width / 2));
        self._dom.setAttribute('y', initHeigh - 100);
      };
    },
    _dom: document.getElementById('portal-shadow'),
    _width: 57
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

    config.portal.init();
    config.floors.init();
    config.world.init();
    config.portal_shadow.init();
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

    this._dom.setAttribute('xlink:href', this._filename());
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
  _filename: function() {
    return 'images/player/running/player' +
      (Math.max(Math.floor(this.x() % 200 / 20) + 1, 1) * this._direction) +
      '.svg';
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
