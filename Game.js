import ExpoPhaser, { Phaser } from 'expo-phaser';
import React from 'react';
import AudioManager from './AudioManager';
import * as states from './game/states';
import loadTilemapAsync from './TilemapLoader/loadTilemapsAsync';
import Assets from './Assets';
import uri from './utils/uri';

// import './game/libs/phaser-debug.min.js';

export default class Game {
  constructor({ context }) {
    global.gameObjects = {};

    require('./game/libs/phaser-arcade-slopes.min.js');
    const game = ExpoPhaser.game({ context });
    game.backgroundColor = 0xff00ff;
    game._context = context;
    game.antialias = false;

    game.onResizeGame = () => {
      const size = {
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
      };
      console.log('Resize', { size });
      game.renderer.resize(size.width, size.height);
      game.camera.setSize(size.width, size.height);
      game.camera.height = size.height + 16;
      game.camera.follow(game.player, Phaser.Camera.FOLLOW_PLATFORMER);
    };
    Object.keys(states).forEach(state => game.state.add(state, new states[state]({ game }), false));
    game.state.start('Boot');

    // AudioManager.sharedInstance.playAsync('music', true, true);
    window.addEventListener('resize', () => game.onResizeGame());
  }
}
