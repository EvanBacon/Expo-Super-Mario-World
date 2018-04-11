import Expo from 'expo';
import AssetUtils from 'expo-asset-utils';
import React from 'react';

import Assets from './Assets';
import AudioManager from './AudioManager';
import GameWrapper from './components/GameWrapper';
import Loading from './components/Loading';
import jsonFromResourceAsync from './TilemapLoader/jsonFromResourceAsync';

console.ignoredYellowBox = ['Phaser.Cache:'];
global.jsonTilemaps = {};

export default class App extends React.Component {
  state = {
    loading: true,
  };

  get fonts() {
    let items = {};
    const keys = Object.keys(Assets.fonts || {});
    for (let key of keys) {
      const item = Assets.fonts[key];
      const name = key.substr(0, key.lastIndexOf('.'));
      items[name] = item;
    }
    return [items];
  }

  get files() {
    return [...AssetUtils.arrayFromObject(Assets.images || {})];
  }

  get tilemaps() {
    let jsonFiles = {
      background: Assets.images.background['background-objects.json'],
      enemies: Assets.images.enemies['enemies.json'],
      items: Assets.images.items['items.json'],
      pipes: Assets.images.pipes['pipes.json'],
      mario: Assets.images.sprites['mario.json'],
      ground: Assets.images.tiles['ground.json'],
      level: Assets.images.tiles['level.json'],
    };

    const load = async key => {
      const resource = jsonFiles[key];
      console.log('load', key);
      const tilemap = await jsonFromResourceAsync(resource);
      global.jsonTilemaps[key] = tilemap;
    };

    return Object.keys(jsonFiles).map(load);
  }

  async preloadAssets() {
    await AssetUtils.cacheAssetsAsync({
      fonts: this.fonts,
      files: this.files,
    });
    await Promise.all(this.tilemaps);
    await AudioManager.sharedInstance.setupAudioAsync();
    this.setState({ loading: false });
  }

  componentWillMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    this.preloadAssets();
  }

  get loading() {
    return <Loading />;
  }

  get screen() {
    return <GameWrapper />;
  }

  render() {
    return this.state.loading ? this.loading : this.screen;
  }
}
