import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'cyan', 'plum', 'gray', 'purple'];
export default class App extends Component {
  render() {
    const { touches } = this.props;

    return (
      <View style={StyleSheet.absoluteFill}>
        {Object.values(touches).map((item, index) => {
          if (!item) {
            return null;
          }

          return (
            <View
              key={index}
              style={[
                styles.touch,
                {
                  transform: [
                    { translateX: -TOUCH_SIZE / 2 },
                    { translateY: -TOUCH_SIZE / 2 },
                    { scale: 1 + (item.force || 0) * 2 },
                  ],
                  backgroundColor: colors[index % colors.length],
                  top: item.pageY,
                  left: item.pageX,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }
}

const TOUCH_SIZE = 56;

const styles = StyleSheet.create({
  touch: {
    position: 'absolute',
    aspectRatio: 1,
    width: TOUCH_SIZE,
    borderRadius: TOUCH_SIZE / 2,
  },
});
