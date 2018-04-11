import React from 'react';
import { Text, View } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';

const emit = (type, props) => {
  if (window.document && window.document.emitter) {
    window.document.emitter.emit(type, props);
  }
};

class ControlButton extends React.Component {
  render() {
    const { size, name, margin, color } = this.props;
    return (
      <View
        style={{
          aspectRatio: 1,
          minWidth: size,
          maxWidth: size,
          minHeight: size,
          maxHeight: size,
          overflow: 'hidden',
          borderTopLeftRadius: size / 2,
          borderBottomLeftRadius: size / 2,
          backgroundColor: color,
        }}>
        <BaseButton
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onActiveStateChange={active =>
            global.buttonupdate && global.buttonupdate({ name, active })
          }>
          <Text style={{ color: 'white' }}>{name}</Text>
        </BaseButton>
      </View>
    );
  }
}
export default ControlButton;
