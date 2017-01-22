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
  portals: {
    init: function() {
      var self = this;

      self.bBoxes.forEach(function(portal) {

        var inDom = self._dom.cloneNode();
        inDom.classList = [];
        inDom.setAttribute('x', portal.in.x);
        inDom.setAttribute('y', portal.in.y - self._height);
        svg.prepend(inDom);

        var outDom = self._dom.cloneNode();
        outDom.classList = [];
        outDom.setAttribute('x', portal.out.x);
        outDom.setAttribute('y', portal.out.y - self._height);
        svg.prepend(outDom);
      });
    },
    bBoxes: [
      { in : { x: 430,  y: initHeigh }, out : { x : 10, y: initHeigh - 100 } },
      { in : { x: 230,  y: initHeigh - 100 }, out : { x : 75, y: initHeigh - 250 } }
    ],
    _dom: document.getElementById('portal'),
    _height: 80
  },
  portal_shadow: {
    init: function() {
      var self = this;
      this._dom.setAttribute('width', self._width);

      svg.onmousemove = function(e) {
        self._dom.setAttribute('x', e.offsetX - (self._width / 2));
        self._dom.setAttribute('y', initHeigh);
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

    config.portals.init();
    config.floors.init();
    config.world.init();
    config.portal_shadow.init();
    this._draw();
  },
  step: function(config) {
    var self = this;
    self._x += self._stepSize * self._direction;

    if(self.x() > config.world.width() - self._width || self.x() < 0) {
      self._changeDirection();
    }

    config.portals.bBoxes.forEach(function(portal) {
      if(Math.abs(self.x() - portal.in.x) < self._stepSize &&
         Math.abs(self.y() - portal.in.y) < self._stepSize
      ) {
        self._x = portal.out.x;
        self._y = portal.out.y;
      }
    });

    self._dom.setAttribute('xlink:href', self._filename());
    self._draw();
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
