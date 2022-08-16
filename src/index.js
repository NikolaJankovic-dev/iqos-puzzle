import "./regsw";
import Phaser from "phaser";
import loader from "./loader";
import screens from "./screens";
import state from "./state";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0xffffff, 0.15);
    progressBox.fillRect(1137 / 3 + 20, 1280 / 2, 320, 50);

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(1137 / 3 + 30, 1280 / 2 + 10, 300 * value, 30);
    });

    loader.load(this);
  }

  // Normal flow is from Screen1
  //   create() {
  //     this.scene.start("Screen1");
  //   }

  create() {
    state.setLang("srb");
    this.scene.start("Screen2");
  }
}

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.RESIZE,
  parent: "phaser-example",
  width: 1137,
  height: 1280,
  scene: [MyGame, ...screens],
};

const game = new Phaser.Game(config);
