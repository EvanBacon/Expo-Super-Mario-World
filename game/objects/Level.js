import GameObject from '../GameObject';
import Settings from '../../constants/Settings';
const { MAP_HEIGHT, MAP_HEIGHT_16, MAP_HEIGHT_32, MAP_HEIGHT_48, SCALE } = Settings;
class Map extends GameObject {
  buildLevel1 = () => {
    // SLOPES
    // this.buildSlopes();

    // Sky background
    for (let i = 0; i < 10; i++) {
      let sprite = scaleIt(this.game.add.sprite(i * 512, 0, 'sky'));
    }

    this.game.platforms = this.game.add.group();
    this.game.platforms.enableBody = true;
    this.game.groundTilesGroup = this.game.add.group();
    this.game.groundTilesGroup.enableBody = true;
    this.game.tilesGroup = this.game.add.group();
    this.game.tilesGroup.enableBody = true;
    this.game.blocksGroup = this.game.add.group();
    this.game.blocksGroup.enableBody = true;

    // Background Objects
    this.createBushes();

    // First Ground Platform
    this.createGround(0, 59);

    this.createElevatedGround(59, 72, 4);

    this.createGround(73, 192);

    // Ditch
    this.createDitch(192, 198);

    this.createGround(199, 212);

    // GAP
    this.createGap(212, 3);

    this.createGround(216, 218);

    this.createDitch(218, 223);

    this.createGround(224, 227);

    this.createGap(227, 3);
    this.createGround(231, 286);

    this.createElevatedGround(286, 291, 3);

    this.createGround(292, 320);

    // // Ledges
    this.game.ledges = this.game.add.group();
    this.createLedge(176);
    for (let j = 0; j < 3; j++) {
      this.createLedge(1200 + j * 64);
    }

    this.createPipes();

    this.createBlocks();

    this.createPlatforms();
  };

  createPlatforms = () => {
    let tile = this.game.add.sprite(2784, MAP_HEIGHT - 64, 'groundTiles', 175);
    for (var i = 0; i < 4; i++) {
      tile = this.game.add.sprite(2784, MAP_HEIGHT - (80 + i * 16), 'groundTiles', 175);
    }
    tile = this.game.add.sprite(2848, MAP_HEIGHT - 112, 'groundTiles', 177);
    tile = this.game.add.sprite(2848, MAP_HEIGHT - 128, 'groundTiles', 177);

    tile = this.game.add.sprite(2832, MAP_HEIGHT - 64, 'groundTiles', 175);
    tile = this.game.add.sprite(2832, MAP_HEIGHT - 80, 'groundTiles', 175);
    tile = this.game.add.sprite(2880, MAP_HEIGHT - 64, 'groundTiles', 177);
    tile = this.game.add.sprite(2880, MAP_HEIGHT - 80, 'groundTiles', 177);

    tile = this.game.add.sprite(2832, MAP_HEIGHT - 160, 'groundTiles', 175);

    let platform = this.game.platforms.create(2880, MAP_HEIGHT - 96, 'groundTiles', 109);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2832, MAP_HEIGHT - 96, 'groundTiles', 109);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2832, MAP_HEIGHT - 176, 'groundTiles', 151);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2848, MAP_HEIGHT - 176, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2864, MAP_HEIGHT - 176, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2880, MAP_HEIGHT - 176, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2896, MAP_HEIGHT - 176, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform.body.checkCollision.right = true;

    // Slope
    platform = this.game.add.sprite(2912, MAP_HEIGHT - 176, 'groundTiles', 30);
    platform = this.game.add.sprite(2912, MAP_HEIGHT - 161, 'groundTiles', 43);
    platform = this.game.add.sprite(2928, MAP_HEIGHT - 160, 'groundTiles', 30);
    platform = this.game.add.sprite(2928, MAP_HEIGHT - 145, 'groundTiles', 43);
    platform = this.game.add.sprite(2944, MAP_HEIGHT - 144, 'groundTiles', 30);
    platform = this.game.add.sprite(2944, MAP_HEIGHT - 129, 'groundTiles', 43);
    platform = this.game.add.sprite(2960, MAP_HEIGHT - 128, 'groundTiles', 30);
    platform = this.game.add.sprite(2960, MAP_HEIGHT - 113, 'groundTiles', 43);
    platform = this.game.add.sprite(2976, MAP_HEIGHT - 112, 'groundTiles', 30);
    platform = this.game.add.sprite(2976, MAP_HEIGHT - 97, 'groundTiles', 43);
    platform = this.game.add.sprite(2992, MAP_HEIGHT - 96, 'groundTiles', 30);
    platform = this.game.add.sprite(2992, MAP_HEIGHT - 81, 'groundTiles', 43);
    // End
    platform = this.game.platforms.create(3008, MAP_HEIGHT - 80, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(3024, MAP_HEIGHT - 80, 'groundTiles', 153);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(3024, MAP_HEIGHT - 64, 'groundTiles', 177);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform.body.checkCollision.up = false;

    platform = this.game.platforms.create(2784, MAP_HEIGHT - 144, 'groundTiles', 151);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2800, MAP_HEIGHT - 144, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2816, MAP_HEIGHT - 144, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2832, MAP_HEIGHT - 144, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2848, MAP_HEIGHT - 144, 'groundTiles', 109);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2848, MAP_HEIGHT - 144, 'groundTiles', 153);
    platform.body.immovable = true;
    this.oneWayCollision(platform);

    platform = this.game.platforms.create(2832, MAP_HEIGHT - 96, 'groundTiles', 151);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2848, MAP_HEIGHT - 96, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2864, MAP_HEIGHT - 96, 'groundTiles', 152);
    platform.body.immovable = true;
    this.oneWayCollision(platform);
    platform = this.game.platforms.create(2880, MAP_HEIGHT - 96, 'groundTiles', 153);
    platform.body.immovable = true;
    this.oneWayCollision(platform);

    const sprite = (x, y, n, f) => scaleIt(this.game.add.sprite(x, y, n, f));
    // Filler Tiles
    tile = sprite(3008, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2992, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2976, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2960, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2944, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2928, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2912, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2896, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2864, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2848, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2816, MAP_HEIGHT - 64, 'groundTiles', 109);
    tile = sprite(2800, MAP_HEIGHT - 64, 'groundTiles', 109);
    //
    tile = sprite(2976, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2960, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2944, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2928, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2912, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2896, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2864, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2848, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2816, MAP_HEIGHT - 80, 'groundTiles', 109);
    tile = sprite(2800, MAP_HEIGHT - 80, 'groundTiles', 109);
    //
    tile = sprite(2960, MAP_HEIGHT - 96, 'groundTiles', 109);
    tile = sprite(2944, MAP_HEIGHT - 96, 'groundTiles', 109);
    tile = sprite(2928, MAP_HEIGHT - 96, 'groundTiles', 109);
    tile = sprite(2912, MAP_HEIGHT - 96, 'groundTiles', 109);
    tile = sprite(2896, MAP_HEIGHT - 96, 'groundTiles', 109);
    tile = sprite(2816, MAP_HEIGHT - 96, 'groundTiles', 109);
    tile = sprite(2800, MAP_HEIGHT - 96, 'groundTiles', 109);
    //
    tile = sprite(2944, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2928, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2912, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2896, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2880, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2864, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2832, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2816, MAP_HEIGHT - 112, 'groundTiles', 109);
    tile = sprite(2800, MAP_HEIGHT - 112, 'groundTiles', 109);
    //
    tile = sprite(2928, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2912, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2896, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2880, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2864, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2832, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2816, MAP_HEIGHT - 128, 'groundTiles', 109);
    tile = sprite(2800, MAP_HEIGHT - 128, 'groundTiles', 109);
    //
    tile = sprite(2912, MAP_HEIGHT - 144, 'groundTiles', 109);
    tile = sprite(2896, MAP_HEIGHT - 144, 'groundTiles', 109);
    tile = sprite(2880, MAP_HEIGHT - 144, 'groundTiles', 109);
    tile = sprite(2864, MAP_HEIGHT - 144, 'groundTiles', 109);
    //
    tile = sprite(2896, MAP_HEIGHT - 160, 'groundTiles', 109);
    tile = sprite(2880, MAP_HEIGHT - 160, 'groundTiles', 109);
    tile = sprite(2864, MAP_HEIGHT - 160, 'groundTiles', 109);
    tile = sprite(2848, MAP_HEIGHT - 160, 'groundTiles', 109);

    // Last Platform
    for (var j = 0; j < 3; j++) {
      tile = scaleIt(this.game.add.sprite(4304, MAP_HEIGHT - (64 + j * 16), 'groundTiles', 175));
    }
    for (var i = 270; i < 277; i++) {
      for (var j = 0; j < 3; j++) {
        tile = scaleIt(
          this.game.add.sprite(16 * i, MAP_HEIGHT - (64 + j * 16), 'groundTiles', 109)
        );
      }
    }
    for (var j = 0; j < 3; j++) {
      tile = scaleIt(this.game.add.sprite(4432, MAP_HEIGHT - (64 + j * 16), 'groundTiles', 177));
    }
    platform = scaleIt(this.game.platforms.create(4304, MAP_HEIGHT - 112, 'groundTiles', 151));
    platform.body.immovable = true;
    for (var i = 270; i < 277; i++) {
      platform = scaleIt(this.game.platforms.create(16 * i, MAP_HEIGHT - 112, 'groundTiles', 152));
      platform.body.immovable = true;
    }
    platform = scaleIt(this.game.platforms.create(4432, MAP_HEIGHT - 112, 'groundTiles', 153));
    platform.body.immovable = true;
  };

  createPipes = () => {
    let pipePlatform = scaleIt(this.game.platforms.create(1808, MAP_HEIGHT - 96, 'pipes', 4));
    pipePlatform.body.immovable = true;
    pipePlatform = scaleIt(this.game.platforms.create(1809, MAP_HEIGHT - 64, 'pipes', 44));
    pipePlatform.body.immovable = true;

    pipePlatform = scaleIt(this.game.platforms.create(1920, MAP_HEIGHT - 80, 'pipes', 4));
    pipePlatform.body.immovable = true;

    // Slope Pipes
    let pipe = scaleIt(this.game.ledges.create(818, MAP_HEIGHT - 101, 'background-objects', 26));
    pipe = scaleIt(this.game.ledges.create(871, MAP_HEIGHT - 144, 'background-objects', 24));
    pipe = scaleIt(this.game.ledges.create(1986, MAP_HEIGHT - 101, 'background-objects', 26));
    pipe = scaleIt(this.game.ledges.create(2039, MAP_HEIGHT - 144, 'background-objects', 24));

    const pipes = scaleIt(
      this.game.platforms.create(2096, MAP_HEIGHT - 112, 'background-objects', 32)
    );
    pipes.body.immovable = true;

    // Silver Pipe
    pipePlatform = scaleIt(this.game.platforms.create(2224, MAP_HEIGHT - 112, 'pipes', 3));
    pipePlatform.body.immovable = true;
    pipePlatform = scaleIt(this.game.platforms.create(2225, MAP_HEIGHT - 80, 'pipes', 43));
    pipePlatform.body.immovable = true;
    pipePlatform = scaleIt(this.game.platforms.create(2225, MAP_HEIGHT - 64, 'pipes', 43));
    pipePlatform.body.immovable = true;

    // Last Pipe
    pipePlatform = scaleIt(this.game.platforms.create(4544, MAP_HEIGHT - 112, 'pipes', 87));
    pipePlatform.body.immovable = true;
    pipePlatform = scaleIt(this.game.platforms.create(4545, MAP_HEIGHT - 80, 'pipes', 102));
    pipePlatform.body.immovable = true;
    pipePlatform = scaleIt(this.game.platforms.create(4545, MAP_HEIGHT - 64, 'pipes', 102));
    pipePlatform.body.immovable = true;
  };

  createBlocks = () => {
    let block = scaleIt(
      this.game.blocksGroup.create(1904, MAP_HEIGHT - 64, 'background-objects', 67)
    );
    block.body.immovable = true;

    block = scaleIt(this.game.blocksGroup.create(1904, MAP_HEIGHT - 80, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.blocksGroup.create(1904, MAP_HEIGHT - 96, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.platforms.create(1904, MAP_HEIGHT - 112, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.blocksGroup.create(1952, MAP_HEIGHT - 64, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.blocksGroup.create(1952, MAP_HEIGHT - 80, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.blocksGroup.create(1952, MAP_HEIGHT - 96, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.platforms.create(1952, MAP_HEIGHT - 112, 'background-objects', 67));
    block.body.immovable = true;
    block = scaleIt(this.game.platforms.create(1920, MAP_HEIGHT - 112, 'background-objects', 69));
    block.body.immovable = true;
    block = scaleIt(this.game.platforms.create(1936, MAP_HEIGHT - 112, 'background-objects', 69));
    block.body.immovable = true;
  };

  createLedge = x => {
    scaleIt(this.game.ledges.create(x, MAP_HEIGHT - 144, 'background-objects', 23));
    scaleIt(this.game.ledges.create(x + 4, MAP_HEIGHT - 92, 'background-objects', 28));
  };

  createElevatedGround = (x1, x2, y) => {
    // Inside Corner
    this.createGroundTile(x1 * 16, MAP_HEIGHT_48, 183);
    // Right Vertical
    for (var j = 0; j < y - 1; j++) {
      this.createTile(x1 * 16, MAP_HEIGHT - (64 + j * 16), 108);
    }
    // Outside Corner
    this.createGroundTile(x1 * 16, MAP_HEIGHT - (48 + y * 16), 83);
    // Top Ground
    for (var i = x1 + 1; i < x2; i += 1) {
      this.createGroundTile(i * 16, MAP_HEIGHT - (48 + y * 16), 84);
      for (var j = 0; j < y; j++) {
        this.createGroundTile(i * 16, MAP_HEIGHT - (48 + j * 16), 109);
      }
    }
    // Outside Corner
    this.createGroundTile(x2 * 16, MAP_HEIGHT - (48 + y * 16), 85);
    // Left Vertical
    for (var j = 0; j < y - 1; j++) {
      const tile = this.createTile(x2 * 16, MAP_HEIGHT - (64 + j * 16), 110);
      tile.body.checkCollision.up = false;
      tile.body.checkCollision.down = false;
    }
    // Inside Corner
    this.createGroundTile(x2 * 16, MAP_HEIGHT_48, 182);
    for (var i = x1; i < x2 + 1; i += 1) {
      this.createGroundTile(i * 16, MAP_HEIGHT_16, 109);
      this.createGroundTile(i * 16, MAP_HEIGHT_32, 109);
    }
  };

  createGap = (x, width) => {
    this.createGroundTile(x * 16, MAP_HEIGHT_48, 85);
    this.createTile(x * 16, MAP_HEIGHT_32, 110);
    this.createTile(x * 16, MAP_HEIGHT_16, 110);
    this.createTile((x + width) * 16, MAP_HEIGHT_32, 108);
    this.createTile((x + width) * 16, MAP_HEIGHT_16, 108);
    this.createGroundTile((x + width) * 16, MAP_HEIGHT_48, 83);
  };

  createDitch = (x1, x2) => {
    this.createGroundTile(x1 * 16, MAP_HEIGHT_48, 85);
    this.createGroundTile(x1 * 16, MAP_HEIGHT_32, 182);
    this.createGroundTile(x1 * 16, MAP_HEIGHT_16, 109);
    for (let i = x1 + 1; i < x2; i += 1) {
      this.createGroundTile(i * 16, MAP_HEIGHT_32, 84);
      this.createGroundTile(i * 16, MAP_HEIGHT_16, 109);
    }
    this.createGroundTile(x2 * 16, MAP_HEIGHT_32, 183);
    this.createGroundTile(x2 * 16, MAP_HEIGHT_16, 109);
    this.createGroundTile(x2 * 16, MAP_HEIGHT_48, 83);
  };

  createGround = (x1, x2) => {
    for (let i = x1; i < x2; i += 1) {
      this.createGroundTile(i * 16, MAP_HEIGHT_48, 84);
      this.createGroundTile(i * 16, MAP_HEIGHT_16, 109);
      this.createGroundTile(i * 16, MAP_HEIGHT_32, 109);
    }
  };

  createGroundTile = (x, y, frame) => {
    const tile = scaleIt(this.game.groundTilesGroup.create(x, y, 'groundTiles', frame));
    tile.body.immovable = true;
  };

  createTile = (x, y, frame) => {
    const tile = this.game.tilesGroup.create(x, y, 'groundTiles', frame);
    tile.body.immovable = true;
    scaleIt(tile);
    return tile;
  };

  createBushes = () => {
    this.createBush(64, MAP_HEIGHT - 64, 73);
    this.createBush(320, MAP_HEIGHT - 64, 72);
    this.createBush(480, MAP_HEIGHT - 64, 72);
    this.createBush(640, MAP_HEIGHT - 64, 73);
    this.createBush(736, MAP_HEIGHT - 64, 72);
    this.createBush(1056, MAP_HEIGHT - 128, 72);
    this.createBush(1616, MAP_HEIGHT - 64, 73);
    this.createBush(1728, MAP_HEIGHT - 64, 73);
    this.createBush(2464, MAP_HEIGHT - 64, 72);
    this.createBush(3200, MAP_HEIGHT - 64, 72);
    this.createBush(3712, MAP_HEIGHT - 64, 72);
    this.createBush(3984, MAP_HEIGHT - 64, 72);
    this.createBush(4224, MAP_HEIGHT - 64, 72);
  };

  createBush = (x, y, frame) => {
    const bush = this.game.add.sprite(x, y, 'background-objects', frame);
    scaleIt(bush);
  };

  buildSlopes = () => {
    // Slopes
    this.game.mapSlope = this.game.add.tilemap('level');
    this.game.mapSlope.addTilesetImage('collision', 'collision-spritesheet');
    // this.game.groundSlope = this.game.mapSlope.createLayer('collision');

    // this.game.slopes.convertTilemapLayer(this.game.groundSlope, {
    //   2: 'FULL',
    //   3: 'HALF_BOTTOM_LEFT',
    //   4: 'HALF_BOTTOM_RIGHT',
    //   6: 'HALF_TOP_LEFT',
    //   5: 'HALF_TOP_RIGHT',
    //   15: 'QUARTER_BOTTOM_LEFT_LOW',
    //   16: 'QUARTER_BOTTOM_RIGHT_LOW',
    //   17: 'QUARTER_TOP_RIGHT_LOW',
    //   18: 'QUARTER_TOP_LEFT_LOW',
    //   19: 'QUARTER_BOTTOM_LEFT_HIGH',
    //   20: 'QUARTER_BOTTOM_RIGHT_HIGH',
    //   21: 'QUARTER_TOP_RIGHT_HIGH',
    //   22: 'QUARTER_TOP_LEFT_HIGH',
    //   23: 'QUARTER_LEFT_BOTTOM_HIGH',
    //   24: 'QUARTER_RIGHT_BOTTOM_HIGH',
    //   25: 'QUARTER_RIGHT_TOP_LOW',
    //   26: 'QUARTER_LEFT_TOP_LOW',
    //   27: 'QUARTER_LEFT_BOTTOM_LOW',
    //   28: 'QUARTER_RIGHT_BOTTOM_LOW',
    //   29: 'QUARTER_RIGHT_TOP_HIGH',
    //   30: 'QUARTER_LEFT_TOP_HIGH',
    //   31: 'HALF_BOTTOM',
    //   32: 'HALF_RIGHT',
    //   33: 'HALF_TOP',
    //   34: 'HALF_LEFT',
    // });
    // return;

    this.game.mapSlope.setCollisionBetween(2, 34, true, 'collision');

    // This should work, but doesn't seem to work for the slopes engine
    this.game.mapSlope.forEach(
      tile => {
        if (tile.index == 3 || tile.index == 4) {
          tile.collideDown = false;
          tile.collideRight = false;
          tile.collideLeft = false;
        }
      },
      this,
      0,
      0,
      this.game.mapSlope.width,
      this.game.mapSlope.height,
      0
    );
  };
  oneWayCollision(platform) {
    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
    scaleIt(platform);
  }
}

export default Map;

function scaleIt(node) {
  node.x *= SCALE;
  node.y *= SCALE;
  node.scale.setTo(SCALE, SCALE);
  // node.width *= scale;
  // node.height *= scale;

  // if (node.body) {
  //   node.body.width = node.width;
  //   node.body.height = node.height;
  // }

  return node;
}
