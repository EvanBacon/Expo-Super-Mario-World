import React from 'react';
import { StyleSheet, View } from 'react-native';

import ControlButtons from './ControlButtons';
import Controller from './Controller';
import Game from './Game';

class GameWrapper extends React.Component {
  update = event => global.joystickupdate && global.joystickupdate(event);
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Controller update={this.update} touchProps={{}}>
          <Game />
        </Controller>
        <ControlButtons />
      </View>
    );
  }
}

export default GameWrapper;
