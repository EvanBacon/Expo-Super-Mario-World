// import sound from './sound';

import { Phaser } from 'expo-phaser';
import GameObject from '../GameObject';
import AudioManager from '../../AudioManager';

import Settings from '../../constants/Settings';
const { SCALE } = Settings;
const speedScale = SCALE * 2;
const jumpScale = SCALE * 2;
const baseAcceleration = 500 * speedScale;
const walkSpeed = 75 * speedScale;
const runSpeed = 125 * speedScale;
const jumpSpeed = 250 * jumpScale;
const spinSpeed = 200 * jumpScale;

class Mechanics extends GameObject {
  update = () => {
    const { game } = this;
    const { player } = game;

    player.body.height = player.height;

    player.touchGroundTile = game.physics.arcade.collide(player, game.groundTilesGroup);
    player.onSlope = game.physics.arcade.collide(player, game.groundSlope);
    player.touchPlatform = game.physics.arcade.collide(player, game.platforms);

    player.hitPlatform = player.touchGroundTile || player.touchPlatform || player.onSlope;
    if (player.onSlope) {
      player.body.drag.setTo(baseAcceleration, baseAcceleration);
    } else {
      player.body.drag.setTo(baseAcceleration / 2, 0);
    }

    player.jumpType = player.body.touching.down && player.hitPlatform ? 0 : player.jumpType;

    if (player.direction === 'right') {
      player.scale.x = SCALE;
    } else if (player.direction === 'left') {
      player.scale.x = -SCALE;
    }

    if (this.name === 'B' && this.touching && player.jumptimeStart != -1) {
      if (game.time.time - player.jumptimeStart > 175) {
        player.jumptimeStart = -1;
      } else {
        player.body.velocity.y =
          Math.abs(player.body.velocity.x) >= runSpeed
            ? -290
            : Math.abs(player.body.velocity.x) >= walkSpeed ? -265 : -250;
      }
    }

    if (this.name === 'A' && this.pressing && player.jumptimeStart != -1) {
      if (game.time.time - player.jumptimeStart > 200) {
        player.jumptimeStart = -1;
      } else {
        player.body.velocity.y =
          Math.abs(player.body.velocity.x) >= runSpeed
            ? -240
            : Math.abs(player.body.velocity.x) >= walkSpeed ? -215 : -200;
      }
    }

    //speed, angle, touching

    const halfPI = Math.PI / 2;

    const quarterPI = halfPI / 2;

    const absAngle = Math.abs(this.angle);

    const isUp = absAngle < quarterPI;
    const isDown = absAngle > quarterPI;

    const direction = absAngle < halfPI ? 1 : -1;
    const impulse = this.speed * direction;
    const minImpulse = this.speed > 0.001;
    const isLeft = direction === -1; // ??

    // console.log('ok', {
    //   touching: this.touching,
    //   minImpulse,
    //   isLeft,
    //   isUp,
    //   isDown,
    //   isRight: !isLeft,
    // });

    const isYDown = true; //this.name === 'Y' && this.pressing;

    if (
      this.touching &&
      isLeft &&
      minImpulse
      // !(this.cursors.up.isDown || this.cursors.down.isDown)
    ) {
      player.direction = 'left';
      player.body.maxVelocity.x = isYDown ? runSpeed : walkSpeed;
      player.body.acceleration.x = isYDown ? -baseAcceleration : -baseAcceleration;
      player.body.acceleration.x = player.onSlope ? -10000 : player.body.acceleration.x;
    } else if (
      this.touching &&
      !isLeft &&
      minImpulse
      // !(this.cursors.up.isDown || this.cursors.down.isDown)
    ) {
      player.direction = 'right';
      if (isYDown) {
        player.body.maxVelocity.x = runSpeed;
        player.body.acceleration.x = baseAcceleration;
      } else {
        player.body.maxVelocity.x = walkSpeed;
        player.body.acceleration.x = baseAcceleration;
      }

      player.body.acceleration.x = player.onSlope ? 10000 : player.body.acceleration.x;
    } else if (player.jumpType === 2) {
      if (player.body.acceleration.x > 0) {
        player.body.acceleration.x =
          player.body.acceleration.x <= 0 ? 0 : player.body.acceleration.x - 50;
      } else if (player.body.acceleration.x < 0) {
        player.body.acceleration.x =
          player.body.acceleration.x >= 0 ? 0 : player.body.acceleration.x + 50;
      }
      player.animations.play('spin');
    } else if (player.jumpType === 1) {
      if (player.body.acceleration.x > 0) {
        player.body.acceleration.x =
          player.body.acceleration.x <= 0 ? 0 : player.body.acceleration.x - 100;
      } else if (player.body.acceleration.x < 0) {
        player.body.acceleration.x =
          player.body.acceleration.x >= 0 ? 0 : player.body.acceleration.x + 100;
      }
    } else {
      player.body.acceleration.x = 0;
    }

    if (Math.abs(player.body.velocity.x) > walkSpeed) {
      if (player.jumpType === 0) {
        player.animations.play('run');
      }
    } else if (Math.abs(player.body.velocity.x) > 0) {
      if (player.jumpType === 0) {
        player.animations.play('walk');
      }
    } else {
      if (player.jumpType != 2) {
        player.animations.stop();
        player.frame = player.spriteMap.standing;
      }
    }

    if (player.jumpType === 1) {
      if (player.body.velocity.y < 0) {
        player.frame = player.spriteMap.jumping;
      } else if (player.body.velocity.y > 0) {
        player.frame = player.spriteMap.falling;
      }
    }

    if (this.pressing && isUp && player.body.touching.down && player.hitPlatform) {
      player.frame = player.spriteMap.lookingUp;
    } else if (this.pressing && isDown && player.body.touching.down && player.hitPlatform) {
      player.frame = player.spriteMap.crouch;
    }

    // Coin collisions
    game.physics.arcade.collide(game.coins, game.platforms);
    game.physics.arcade.overlap(player, game.coins, this.collectCoin, null, this);

    game.physics.arcade.overlap(player, game.powers, this.collectPower, null, this);

    game.physics.arcade.collide(player, game.mysteryBoxes);

    game.physics.arcade.collide(player, game.tilesGroup);
    game.physics.arcade.collide(player, game.blocksGroup);
  };

  collectCoin = (player, coin) => {
    coin.kill();
    AudioManager.sharedInstance.playAsync('coin');
    this.score += 10;
    // scoreText.text = 'Score: ' + score;
  };

  collectPower = (player, power) => {
    power.kill();
    player.addPower(power._powerId);
  };

  spin = () => {
    const { game } = this;
    game.player.jumpType = 2;
    if (game.player.hitPlatform) {
      game.player.jumptimeStart = game.time.time;
      game.player.body.velocity.y = -spinSpeed;
      AudioManager.sharedInstance.playAsync('spin');
      game.player.animations.play('spin');
    }
  };

  jump = () => {
    const { game } = this;

    game.player.jumpType = 1;
    if (game.player.hitPlatform) {
      game.player.jumptimeStart = game.time.time;
      game.player.body.velocity.y = -jumpSpeed;
      AudioManager.sharedInstance.playAsync('jump');
    }
  };
}

export default Mechanics;
