import { Phaser } from 'expo-phaser';

import Settings from '../../constants/Settings';
import GameObject from '../GameObject';
import SpriteMap from '../sprites/Items';

const { SCALE } = Settings;

class MysteryBoxes extends GameObject {
  static spacing = 16 * SCALE;

  constructor({ game }) {
    super({ game });
    game.mysteryBoxes = game.add.group();
    game.mysteryBoxes.enableBody = true;

    game.powers = game.add.group();
    game.powers.enableBody = true;

    for (let i = 0; i < 12; i++) {
      this.add({
        x: 80 + i * MysteryBoxes.spacing * SCALE,
        y: game.world.height - 80 * SCALE,
        type: 'basic',
      });
    }
  }

  add = ({ x, y, type }) => {
    const { game } = this;
    const item = game.mysteryBoxes.create(x, y, 'items');
    item.body.immovable = true;
    item.body.height = 16 * SCALE;
    item.body.width = 16 * SCALE;
    item.anchor.setTo(0.5, 0.5);
    item.scale.setTo(SCALE, SCALE);
    item._spent = false;

    let bounceTween = bounceAnimation(game, item);

    item.body.onCollide = new Phaser.Signal();
    item.body.onCollide.add(() => {
      bounceTween.start();

      if (item._spent) {
        return;
      }
      item._spent = true;
      console.log('hit');

      let size = 16 * SCALE;
      const power = game.powers.create(x, y - size, 'items');
      power._powerId = 'fire';
      bounceAnimation(game, power, 30).start();
      power.body.height = size;
      power.body.width = size;
      power.anchor.setTo(0.5, 0.5);
      power.scale.setTo(SCALE, SCALE);
      power.frame = SpriteMap.powers.fireFlower;
    }, this);

    const { frames, fps } = SpriteMap.mysteryBox[type].spin;
    item.frame = frames[0];
    item.animations.add('spin', frames, fps, true);
    item.animations.play('spin');
  };
}
export default MysteryBoxes;

const bounceAnimation = (game, item, amount = 20, duration = 90) => {
  let bounceTween = game.add
    .tween(item)
    .to({ y: item.y - amount }, duration, Phaser.Easing.Linear.EaseOut);
  bounceTween.chain(game.add.tween(item).to({ y: item.y }, duration, Phaser.Easing.Linear.EaseIn));
  return bounceTween;
};
