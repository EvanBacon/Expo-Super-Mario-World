import Settings from '../../constants/Settings';
import GameObject from '../GameObject';
import SpriteMap from '../sprites/Items';

const { SCALE } = Settings;

class Coins extends GameObject {
  static spacing = 30;

  constructor({ game }) {
    super({ game });
    game.coins = game.add.group();
    game.coins.enableBody = true;

    for (let i = 0; i < 12; i++) {
      this.add({
        x: 80 + i * Coins.spacing * SCALE,
        y: game.world.height - 45 * SCALE,
        type: 'basic',
      });
    }
  }

  add = ({ x, y, type }) => {
    const { game } = this;
    const coin = game.coins.create(x, y, 'items');
    coin.anchor.setTo(0.5, 0.5);
    coin.scale.setTo(SCALE, SCALE);
    coin.body.height = 16 * SCALE;
    coin.body.width = 12 * SCALE;

    const { frames, fps } = SpriteMap.coin[type].spin;
    coin.frame = frames[0];
    coin.animations.add('spin', frames, fps, true);
    coin.animations.play('spin');
  };
}
export default Coins;
