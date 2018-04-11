import { Phaser } from 'expo-phaser';

import Settings from '../../constants/Settings';
import EXState from '../EXState';

class Boot extends EXState {
  create() {
    super.create();
    // Scale
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(Settings.SCALE, Settings.SCALE);

    // enable crisp rendering
    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // Bounds
    this.world.setBounds(
      0,
      0,
      Settings.MAP_WIDTH * Settings.SCALAR,
      Settings.MAP_HEIGHT * Settings.SCALAR
    );
    // this.world.scale.setTo(constants.SCALE, constants.SCALE);
    // Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Slopes
    this.game.add.plugin(Phaser.Plugin.ArcadeSlopes);

    // Debug
    if (Settings.DEBUG_ON) {
      // this.game.add.plugin(Phaser.Plugin.Debug);
    }

    // Start Prelod State
    this.state.start('Preload');
  }
}

export default Boot;
