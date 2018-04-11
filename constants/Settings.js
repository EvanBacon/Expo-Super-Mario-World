const SCALE = window.devicePixelRatio * 2;
const buffer_height = window.innerHeight * SCALE;

export default {
  SCALAR: buffer_height / 432,
  MAP_HEIGHT: 432,
  MAP_WIDTH: 5120,

  MAP_HEIGHT_16: 416,
  MAP_HEIGHT_32: 400,
  MAP_HEIGHT_48: 384,

  DEBUG_ON: false,

  MUSIC_ON: false,
  SCALE,
};
