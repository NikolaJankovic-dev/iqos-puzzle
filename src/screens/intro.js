import loader from '../loader';
import state from '../state';
import MyScene from '../utils';

export default class Intro extends MyScene {
  constructor() {
    super('Intro');
  }

  create() {
    this.addCenter('intro').setScale(0.5, 0.5);
    this.cameras.main.fadeIn(700);
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.height - 245, loader.assets.startbtn)
      .setScale(state.defaultScale)
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fade(700);
        setTimeout(() => {
          this.scene.start('Screen3');
        }, 700);
      });
  }
}
