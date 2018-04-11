import Expo from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';
import Game from '../Game';

export default class App extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Expo.GLView
        style={StyleSheet.absoluteFill}
        onContextCreate={context => new Game({ context })}
      />
    );
  }
}
