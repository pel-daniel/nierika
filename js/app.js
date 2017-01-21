var config = {
  floor: {
    height: 20
  },
  world: {
    dom: document.getElementById('world'),
    height: 500,
    width: 500
  }
};

var player = {
  dom: document.getElementById('player'),
  height: 20,
  width: 20,
  x: function() {
    return this._x;
  },
  y: function() {
    return this._y - player.height;
  },
  _x: 0,
  _y: config.world.height - config.floor.height
};

function init() {
  worldInit(config.world);
  playerInit(player);

  setInterval(gameLoop, 1000/70);
}

function worldInit(world) {
  world.dom.setAttribute('height', world.height);
  world.dom.setAttribute('width', world.width);
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
  if(player.x() < config.world.width - player.width) {
    player._x += 3;

    drawPlayer(player);
  }
}
