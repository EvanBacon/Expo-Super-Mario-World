import Enemy from '../objects/Enemy';
import GameObject from '../GameObject';

import { Phaser } from 'expo-phaser';
import Settings from '../../constants/Settings';
const { SCALE } = Settings;

class Enemies extends GameObject {
  constructor({ game }) {
    super({ game });

    game.goon = new Enemy({ game, x: 144, y: 369, frame: 88 });
    game.physics.arcade.enable(game.goon.sprite);
    game.goon.sprite.animations.add('walk', [88, 109], 10, true);
    game.goon.sprite.animations.play('walk');
    game.goon.sprite.body.gravity.y = 1000 * SCALE;
    game.goon.sprite.anchor.setTo(0.5, 1);
    game.goon.sprite.body.drag.setTo(250, 0);
  }

  updateEnemies = () => {
    const { game } = this;
    game.goon.sprite.body.height = game.goon.sprite.height;
    game.physics.arcade.collide(game.goon.sprite, game.groundTilesGroup);
    game.physics.arcade.collide(game.goon.sprite, game.player);

    if (game.goon.sprite.x - game.player.x > 16) {
      game.goon.sprite.scale.x = -SCALE;
      game.goon.sprite.x -= SCALE;
    } else if (game.goon.sprite.x - game.player.x < -16) {
      game.goon.sprite.scale.x = SCALE;
      game.goon.sprite.x += SCALE;
    }
  };
}

export default Enemies;
