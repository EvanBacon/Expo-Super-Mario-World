import GameObject from '../GameObject';
import Mechanics from './Mechanics';

class Controls extends GameObject {
  constructor({ game }) {
    super({ game });
    this.mechanics = new Mechanics({ game });
    global.buttonupdate = ({ active, name }) => {
      this.mechanics.active = active;
      this.mechanics.name = name;

      if (active) {
        switch (name) {
          case 'A':
            console.log('jump');
            this.mechanics.jump();
            break;
          case 'B':
            console.log('Spin');
            this.mechanics.spin();
            break;
          case 'Y':
            // mechanics.spin()
            break;
          case 'Mute':
            this.mute();
            break;
        }
      }
    };

    global.joystickupdate = ({ speed, angle, touching }) => {
      // console.log('joystickupdate', { speed, angle, touching });
      this.mechanics.speed = speed;
      this.mechanics.angle = angle;
      this.mechanics.touching = touching;
    };
  }

  update = () => {
    this.mechanics.update();
  };

  mute = () => {
    this.game.sound.mute = !this.game.sound.mute;
  };
}
export default Controls;
