const fps = {
  mysteryBox: {
    spin: 8,
  },
  coin: {
    spin: 8,
  },
};

export default {
  coin: {
    basic: {
      spin: { frames: [4, 5, 6, 7], fps: fps.coin.spin },
    },
    blue: {
      spin: { frames: [19, 20, 21, 22], fps: fps.coin.spin },
    },
  },
  mysteryBox: {
    basic: {
      spin: { frames: [146, 147, 144, 145], fps: fps.mysteryBox.spin },
    },
    red: {
      spin: { frames: [155, 156, 153, 154], fps: fps.mysteryBox.spin },
    },
  },
  powers: {
    feather: 8,
    yellowStar: 9,
    redStar: 10,
    moon: 23,
    fireFlower: 24,
    redMushroom: 25,
    greenMushroom: 26,
  },
};
