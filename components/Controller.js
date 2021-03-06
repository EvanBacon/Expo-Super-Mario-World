import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { MultiTouchView } from 'expo-multi-touch';
import Pad from './Pad';
import TouchVisualizer from './TouchVisualizer';

const { width } = Dimensions.get('window');
const halfWidth = width / 2;

export default class App extends Component {
  state = {
    touches: {},
    leftTouchId: null,
  };

  componentWillMount() {
    this.touchProps = {
      ...this.props.touchProps,
      onTouchBegan: event => {
        const { identifier } = event;
        this.setState(previous => ({
          touches: {
            ...previous.touches,
            [identifier]: event,
          },
        }));
        if (this.state.leftTouchId == null && event.pageX < halfWidth) {
          this.setState(
            {
              leftTouchId: identifier,
            },
            () => {
              this.updateWithPad();
            }
          );
        }
        this.props.touchProps.onTouchBegan && this.props.touchProps.onTouchBegan(event);
      },
      onTouchMoved: event => {
        const { identifier } = event;
        this.setState(
          previous => ({
            touches: {
              ...previous.touches,
              [identifier]: event,
            },
          }),
          () => {
            if (this.state.leftTouchId) {
              this.updateWithPad();
            }
          }
        );
        this.props.touchProps.onTouchMoved && this.props.touchProps.onTouchMoved(event);
      },
      onTouchEnded: event => {
        this.onTouchEnded(event);
        this.props.touchProps.onTouchEnded && this.props.touchProps.onTouchEnded(event);
      },
      onTouchCancelled: event => {
        this.onTouchEnded(event);
        this.props.touchProps.onTouchCancelled && this.props.touchProps.onTouchCancelled(event);
      },
    };
  }

  onTouchEnded = event => {
    const { identifier } = event;
    this.setState(previous => ({
      touches: {
        ...previous.touches,
        [identifier]: null,
      },
    }));

    if (identifier === this.state.leftTouchId) {
      this.setState(
        {
          leftTouchId: null,
        },
        () => {
          this.updateWithPad(false);
        }
      );
    }
  };

  updateWithPad = (touching = true) => {
    if (!this.pad) {
      return;
    }
    let speed = 0;
    let angle = 0;
    if (touching) {
      speed = this.pad.speed;
      angle = this.pad.angle;
    }
    this.props.update({
      speed,
      angle,
      touching,
      pad: this.pad,
    });
  };

  leftTouchPosition = { x: 0, y: 0 };
  leftTouchStart = { x: 0, y: 0 };
  leftTouchForce = 0;
  render() {
    const { touches, leftTouchId } = this.state;

    const leftTouch = touches[leftTouchId];

    if (leftTouch && leftTouch.initialTouch) {
      this.leftTouchStart = {
        x: leftTouch.initialTouch.pageX,
        y: leftTouch.initialTouch.pageY,
      };
      this.leftTouchPosition = {
        x: leftTouch.pageX,
        y: leftTouch.pageY,
      };

      this.leftTouchForce = leftTouch.force || 0;
    }

    // <TouchVisualizer touches={touches} />
    return (
      <MultiTouchView style={{ flex: 1 }} {...this.touchProps}>
        <View style={styles.container}>
          {this.props.children}

          <Pad
            ref={ref => (this.pad = ref)}
            visible={!!leftTouchId}
            center={this.leftTouchStart}
            touchPosition={this.leftTouchPosition}
            force={this.leftTouchForce}
          />
        </View>
      </MultiTouchView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
