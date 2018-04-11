import Assets from '../../Assets';
import loadTilemapAsync from '../../TilemapLoader/loadTilemapsAsync';
import uri from '../../utils/uri';
import EXState from '../EXState';

class Preload extends EXState {
  preload() {
    super.preload();

    const { game, load } = this;
    // Background Image
    load.image('sky', uri(Assets.images.background['background.png']));

    const { jsonTilemaps } = global;
    ['level'].forEach(key => {
      const json = jsonTilemaps[key];

      const assetProvider = name => {
        // const [category, imageName] = name.replace('../', '').split('/');
        const res = Assets.images.background['background-objects.png']; //[name];
        const localUri = uri(res);
        // console.log('Load JSON: ', res, name, localUri);
        return localUri;
      };

      loadTilemapAsync({
        inGameName: key,
        json,
        game,
        assetProvider,
      });
    });

    load.spritesheet(
      'collision-spritesheet',
      uri(Assets.images.tiles['ninja-tiles16.png']),
      16,
      16
    );

    load.atlasJSONArray(
      'mario',
      uri(Assets.images.sprites['mario.png']),
      null,
      global.jsonTilemaps.mario
    );
    load.atlasJSONArray(
      'items',
      uri(Assets.images.items['items.png']),
      null,
      global.jsonTilemaps.items
    );
    load.atlasJSONArray(
      'groundTiles',
      uri(Assets.images.tiles['ground.png']),
      null,
      global.jsonTilemaps.ground
    );
    load.atlasJSONArray(
      'background-objects',
      uri(Assets.images.background['background-objects.png']),
      null,
      global.jsonTilemaps.background
    );
    load.atlasJSONArray(
      'pipes',
      uri(Assets.images.pipes['pipes.png']),
      null,
      global.jsonTilemaps.pipes
    );
    load.atlasJSONArray(
      'enemies',
      uri(Assets.images.enemies['enemies.png']),
      null,
      global.jsonTilemaps.enemies
    );
  }

  create() {
    super.create();
    this.state.start('Play');
  }
}

export default Preload;
