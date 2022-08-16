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
  cro: "Croatia",
  slo: "Slovenia",
  srb: "Serbia",
  bos: "Bosnia",
  maced: "N.Macedonia",
  mon: "Montenegro",
};

const screen2 = {
  screen2cro: "screen2cro",
  screen2bos: "screen2bos",
  screen2slo: "screen2slo",
  screen2mon: "screen2mon",
  screen2srb: "screen2srb",
  screen2maced: "screen2maced",
};

const assets = {
  intro: "intro",
  start: "start",
  logo: "logo",
  maced: "N.Macedonia",
  startbtn: "startbtn",
  replaybtn: "replaybtn",
  time: "time",
  tapes: "tapes",
  bg: "bg",
  timerb: "timerb",
  button: "button",
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
