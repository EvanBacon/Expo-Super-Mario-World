import EXState from '../EXState';
import Controls from '../objects/Controls';
import Enemies from '../objects/Enemies';
import Level from '../objects/Level';
import Player from '../objects/Player';
import Coins from '../objects/Coins';
export default class Play extends EXState {
  create() {
    super.create();
    const { game } = this;

    this.map = new Level({ game });
    this.map.buildLevel1();
    this.player = new Player({ game });
    this.controls = new Controls({ game });
    // this.enemies = new Enemies({ game });
    game.onResizeGame();

    this.coins = new Coins({ game });
  }

  update() {
    super.update();
    this.controls.update();

    if (this.enemies) {
      this.enemies.updateEnemies();
    }
  }
}
