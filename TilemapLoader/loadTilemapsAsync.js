import Expo from 'expo';
import ExpoPhaser, { Phaser } from 'expo-phaser';
import AssetUtils from 'expo-asset-utils';
import parseTilemap from './parseTilemap';
import jsonFromResourceAsync from './jsonFromResourceAsync';
// import { url } from 'inspector';

global.jsonMaps = {};

async function loadTilemapAsync({ inGameName, json, game, assetProvider }) {
  //   let rawJson = await jsonFromResourceAsync(jsonStaticResource);
  const parsedJson = parseTilemap(json, assetProvider);
  game.load.tilemap(inGameName, '', parsedJson, Phaser.Tilemap.TILED_JSON);
}

export default loadTilemapAsync;

// export default class App extends React.Component {
//   state = { loading: true };
//   async componentWillMount() {
//     await AssetUtils.cacheAssetsAsync({ files: AssetUtils.arrayFromObject(Assets) });

//     let keys = [
//       // 'sector01_room01',
//       // 'sector01_room02',
//       // 'sector01_room03',
//       // 'sector01_room04',
//       // 'sector01_room05',
//       // 'sector01_room06',
//       // 'sector01_room07',
//       // 'sector01_room08',
//       'features_test_rotated',
//     ];
//     for (let key of keys) {
//       const res = Assets.test[key + '.json'];
//       global.jsonMaps[key] = await jsonFromResourceAsync(res);
//     }

//     this.setState({ loading: false });
//   }
//   render() {
//     if (this.state.loading) {
//       return <View />;
//     }

//     return (
//       <TouchableView style={{ flex: 1 }}>
//         <Expo.GLView style={{ flex: 1 }} onContextCreate={context => startGame({ context })} />
//       </TouchableView>
//     );
//   }
// }

// function startGame({ context }) {
//   const game = ExpoPhaser.game({ context });

//   var map;
//   var layer;

//   var sprite;
//   var cursors;

//   const hitCoin = (sprite, tile) => {
//     tile.alpha = 0.2;

//     layer.dirty = true;

//     return false;
//   };

//   game.state.add('Playable', {
//     preload: function() {
//       const texture = Expo.Asset.fromModule(Assets['man.png']).localUri;

//       // const resource = Assets.tilemap.maps["debug.json"]
//       // const _url = url(resource);
//       const json = global.jsonMaps['debug'];
//       const parsedJson = parseTilemap(json, name => {
//         // const [category, imageName] = name.replace('../', '').split('/');
//         const res = Assets.test[name];
//         const localUri = url(res);
//         console.log(name, localUri);
//         return localUri;
//       });
//       // game.load.tilemap('debug', '', json, Phaser.Tilemap.TILED_JSON);

//       game.load.tilemap('map', '', json, Phaser.Tilemap.TILED_JSON);

//       game.load.image('ground_1x1', url(Assets.test['ground_1x1.png']));
//       game.load.image('walls_1x2', url(Assets.test['walls_1x2.png']));
//       game.load.image('tiles2', url(Assets.test['tiles2.png']));
//       game.load.image('phaser', url(Assets.test['arrow.png']));
//       game.load.spritesheet('coin', url(Assets.test['coin.png']), 32, 32);
//       game.load.image('bunny', url(Assets.test['bunny.png']));

//       // game.load.image('brown', url(Assets.tilemap.backgrounds['brown.png']));
//       // game.load.image('debug_bg', url(Assets.tilemap.backgrounds['debug_bg.png']));
//       // game.load.image('greenpassage', url(Assets.tilemap.backgrounds['greenpassage.png']));
//       // game.load.image('pipecorridor', url(Assets.tilemap.backgrounds['pipecorridor.png']));
//       // game.load.image('sr388cave', url(Assets.tilemap.backgrounds['sr388cave.png']));

//       // game.load.image('browntank', url(Assets.tilemap.animatedBackgrounds['browntank.png']));

//       // game.load.image('collision', url(Assets.tilemap.tilesets['collision.png']));
//       // game.load.image('corridor1', url(Assets.tilemap.tilesets['corridor1.png']));
//       // game.load.image('debug', url(Assets.tilemap.tilesets['debug.png']));
//       // game.load.image('srx', url(Assets.tilemap.tilesets['srx.png']));
//       // game.load.image('yellow', url(Assets.tilemap.tilesets['yellow.png']));

//       // const atlas = Expo.Asset.fromModule(Assets['man.json']).localUri;
//       // const tex = Expo.Asset.fromModule(Assets['man.png']).localUri;
//       // game.load.atlasJSONHash('man', tex, atlas);
//     },
//     create: function() {
//       game.stage.backgroundColor = '#4488AA';

//       game.physics.startSystem(Phaser.Physics.ARCADE);

//       map = game.add.tilemap('map');

//       map.addTilesetImage('ground_1x1');
//       map.addTilesetImage('coin');
//       map.addTilesetImage('walls_1x2');
//       map.addTilesetImage('tiles2');

//       map.setCollisionBetween(1, 12);

//       //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
//       map.setTileIndexCallback(26, hitCoin, this);

//       //  This will set the map location 2, 0 to call the function
//       map.setTileLocationCallback(2, 0, 1, 1, hitCoin, this);

//       layer = map.createLayer('Tile Layer 1');
//       layer.resizeWorld();
//       layer.debugSettings.forceFullRedraw = true;

//       var layer3 = map.createLayer('Tile Layer 3');

//       sprite = game.add.sprite(260, 100, 'phaser');
//       sprite.anchor.set(0.5);
//       game.physics.enable(sprite);

//       sprite.body.setSize(16, 16, 8, 8);

//       //  We'll set a lower max angular velocity here to keep it from going totally nuts
//       sprite.body.maxAngular = 500;

//       //  Apply a drag otherwise the sprite will just spin and never slow down
//       sprite.body.angularDrag = 50;

//       game.camera.follow(sprite);
//     },
//     update: function() {
//       game.physics.arcade.collide(sprite, layer);

//       sprite.body.velocity.x = 0;
//       sprite.body.velocity.y = 0;
//       sprite.body.angularVelocity = 0;

//       // if (cursors.left.isDown)
//       // {
//       //     sprite.body.angularVelocity = -200;
//       // }
//       // else if (cursors.right.isDown)
//       // {
//       //     sprite.body.angularVelocity = 200;
//       // }

//       // if (cursors.up.isDown)
//       // {
//       //     game.physics.arcade.velocityFromAngle(sprite.angle, 200, sprite.body.velocity);
//       // }
//       game.debug.body(sprite);
//     },
//   });

//   game.state.start('Playable');
// }
