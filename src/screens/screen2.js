import Phaser from "phaser";
import loader from "../loader";
import state from "../state";
import MyScene from "../utils";

export default class Screen2 extends MyScene {
  constructor() {
    super("Screen2");
  }

  initStatics() {
    const bg = this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        loader.assets[`screen2${state.getLang()}`]
      )
      .setScale(state.defaultScale);
    bg.setOrigin(0.5, 0.5);

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.height - 245,
        loader.assets.startbtn
      )
      .setScale(state.defaultScale)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Intro");
      });
  }

  create() {
    this.initStatics();
  }
}
