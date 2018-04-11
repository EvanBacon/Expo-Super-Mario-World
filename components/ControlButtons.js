import React from 'react';
import { View } from 'react-native';

import ControlButton from './ControlButton';

class ControlButtons extends React.Component {
  render() {
    const buttonSize = 64;
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'space-around',
        }}>
        <ControlButton size={buttonSize} color={'rgba(0,255,0,0.6)'} name="A" />
        <ControlButton size={buttonSize} color={'rgba(0,0,255,0.6)'} name="B" />
        <ControlButton size={buttonSize} color={'rgba(255,255,0,0.6)'} name="Y" />
      </View>
    );
  }
}

export default ControlButtons;
