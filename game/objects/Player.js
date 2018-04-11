import Settings from '../../constants/Settings';
const { SCALE } = Settings;
import GameObject from '../GameObject';
import SpriteMap from '../sprites/Mario';

class Player extends GameObject {
  constructor({ game }) {
    super({ game });

    const player = this.game.add.sprite(24 * SCALE, this.game.world.height - 48 * SCALE, 'mario');

    player.details = {
      name: 'mario',
      power: 'normal',
      size: 'big',
    };

    player.animationForName = function({ name: animationName }) {
      const { name, power, size } = this.details;
      return SpriteMap[name][power][size][animationName];
    };

    player.addAnimationForName = function({ name }) {
      const { frames, fps } = this.animationForName({ name });
      this.animations.add(name, frames, fps, true);
    };

    player.scale.setTo(SCALE, SCALE);

    this.game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 2000 * SCALE;
    player.body.collideWorldBounds = true;

    // default direction
    player.direction = 'right';

    player.anchor.setTo(0.5, 1);

    // Dimensions for slope collision
    player.body.width = 13 * SCALE;
    player.body.height = 15 * SCALE;
    this.game.slopes.enable(player);

    // Default frame
    player.frame = 14;

    player.addAnimationForName({ name: 'walk' });
    player.addAnimationForName({ name: 'run' });
    player.addAnimationForName({ name: 'spin' });

    player.hitPlatform = false;
    player.jumptimeStart = -1;
    player.jumpType = 0;

    player.body.drag.setTo(250, 0);

    this.game.player = player;
  }
}

export default Player;
