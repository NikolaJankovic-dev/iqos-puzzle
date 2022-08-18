const tiles = {
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
};

const countries = {


};

const screen2 = {

  screen2srb: "screen2srb",

};

const assets = {
  intro: "intro",
  start: "start",


  startbtn: "startbtn",
  replaybtn: "replaybtn",
  time: "time",
  tapes: "tapes",
  bg: "bg",
  timerb: "timerb",

  effect: "effect",
  endbg: "endbg",
  success: "success",
  points: "points",
  ...tiles,
  ...countries,
  ...screen2,
};

export default {
  /**
   *
   * @param {Phaser.Scene} app
   */
  load: (app) => {
    Object.values(assets).forEach((a) => {
      // console.log(`Loaded: ${a}!`)
      app.load.image(a, require(`./assets/${a}.png`));
    });
  },
  assets,
  countries,
  tiles,
};
