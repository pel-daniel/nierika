var config = {
  floor: {
    height: 20
  },
  world: {
    height: 500,
    width: 500
  }
};

var player = {
  height: 20,
  x: 20,
  width: 20
};

function init() {
  var worldDom = document.getElementById('world');
  var playerDom = document.getElementById('player');

  worldInit(worldDom, config.world);
  playerInit(playerDom, config, player);
}

function worldInit(worldDom, world) {
  worldDom.setAttribute('height', world.height);
  worldDom.setAttribute('width', world.width);
}

function playerInit(playerDom, config, player) {
  playerDom.setAttribute('height', player.height);
  playerDom.setAttribute('x', player.x);
  playerDom.setAttribute('y', config.world.height - config.floor.height - player.height);
  playerDom.setAttribute('width', player.width);
}
