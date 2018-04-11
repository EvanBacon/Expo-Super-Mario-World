import GameObject from '../GameObject';
import Settings from '../../constants/Settings';
const { SCALE } = Settings;
class Enemy extends GameObject {
  constructor({ game, x, y, frame }) {
    super({ game });
    this.game = game;
    this.x = x;
    this.y = y;
    this.sprite = this.game.add.sprite(x, y, 'enemies', frame);
    this.sprite.scale.setTo(SCALE, SCALE);
  }
}
export default Enemy;
