import Settings from '../../constants/Settings';
const { SCALE } = Settings;
import GameObject from '../GameObject';
import SpriteMap from '../sprites/Mario';
import { Phaser } from 'expo-phaser';

class Player extends Phaser.Sprite {
  details = {
    name: 'mario',
    power: 'normal',
    size: 'small',
  };

  direction = 'right';
  hitPlatform = false;
  jumptimeStart = -1;
  jumpType = 0;

  _spriteMap = null;
  set spriteMap(value) {
    if (value === this._spriteMap) {
      return;
    }
    this._spriteMap = value;

    this.frame = value.standing;
    console.log('make player', this.frame);
    this._addAnimationForName({ name: 'walk' });
    this._addAnimationForName({ name: 'run' });
    this._addAnimationForName({ name: 'spin' });
  }

  get spriteMap() {
    return this._spriteMap;
  }

  constructor({ game }) {
    super(game, 24 * SCALE, 120, 'mario');
    game.world.addChild(this);
    game.physics.arcade.enable(this);
    this.scale.setTo(SCALE, SCALE);

    this.body.bounce.y = 0;
    this.body.gravity.y = Settings.gravity;
    this.body.collideWorldBounds = true;
    this.body.drag.setTo(250, 0);

    this.anchor.setTo(0.5, 1);

    // Dimensions for slope collision
    this.body.width = 13 * SCALE;
    this.body.height = 15 * SCALE;

    game.slopes.enable(this);

    // Default frame
    this.updateDetails();
  }

  updateDetails = () => {
    const { name, power, size } = this.details;
    this.spriteMap = SpriteMap[name][power][size];
  };

  addPower = named => {
    this.details.power = named;
    this.updateDetails();
  };

  _addAnimationForName = ({ name }) => {
    if (!this.spriteMap) {
      return;
    }

    const { frames, fps } = this.spriteMap[name];
    this.animations.add(name, frames, fps, true);
  };

  grow = () => {
    this.details.size = 'big';
    this.updateDetails();
  };

  shrink = () => {
    this.details.size = 'small';
    this.updateDetails();
  };
}

export default Player;
