import Phaser from 'phaser';
import loader from '../loader';
import state from '../state';
import MyScene from '../utils';

const HEADING_OFFSET = 400;
const TOP_PADDING = 50;

export default class End extends MyScene {
  constructor() {
    super('End');
  }

  initStatics() {
    this.addCenter('endbg').setScale(state.defaultScale);
    this.cameras.main.fadeIn(1500);
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.height - 245, loader.assets.replaybtn)
      .setScale(state.defaultScale)
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fade(700);
        setTimeout(() => {
          this.scene.start('Intro');
        }, 700);
      });

    // this.add
    //   .image(
    //     this.cameras.main.centerX,
    //     this.cameras.main.height - 175,
    //     loader.assets.button
    //   )
    //   .setScale(state.defaultScale)
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     this.scene.start("Screen2");
    //   });

    // this.heading2 = this.add.text(this.cameras.main.centerX + 3, HEADING_OFFSET + 3 + TOP_PADDING, this.getHeading().toUpperCase(), {
    //   fontFamily: 'Effra',
    //   color: 'red',
    // });
    // this.heading2.setOrigin(0.5, 0.5);
    // this.heading2.setFontSize(80);
    // this.heading2.setAlign('center');
    // this.heading2.setRotation(-0.2);

    // this.heading = this.add.text(this.cameras.main.centerX, HEADING_OFFSET + TOP_PADDING, this.getHeading().toUpperCase(), {
    //   fontFamily: 'Effra',
    // });
    // this.heading.setOrigin(0.5, 0.5);
    // this.heading.setFontSize(80);
    // this.heading.setAlign('center');
    // this.heading.setRotation(-0.2);

    // this.subheading = this.add.text(this.cameras.main.centerX, this.Y() + TOP_PADDING + 100, this.getSubHeading(), {
    //   fontFamily: 'Effra',
    // });
    // this.subheading.setOrigin(0.5, 0.5);
    // this.subheading.setFontSize(50);
    // this.subheading.setAlign('center');

    // this.btnText = this.add.text(
    //   this.cameras.main.centerX,
    //   this.cameras.main.height - 175,
    //   this.getBtnText(),
    //   {
    //     fontFamily: "Effra",
    //   }
    // );
    // this.btnText.setOrigin(0.5, 0.5);
    // this.btnText.setFontSize(42);
  }

  getBtnText() {
    const btnTexts = {
      maced: '?????????? ????????????????',
      cro: 'IGRAJ PONOVO',
      srb: 'IGRAJ PONOVO',
      mon: 'IGRAJ PONOVO',
      slo: 'IGRAJ PONOVNO',
      bos: 'IGRAJ PONOVO',
    };
    return btnTexts[state.getLang()];
  }

  getSubHeading() {
    const texts = {
      maced: `?????????? ???? ???? ???????????? ?????????????????`,
      cro: `??eli?? li poku??ati ponovo?`,
      srb: `Da li ??eli?? da poku??a?? ponovo?`,
      mon: `Da li ??eli?? da poku??a?? ponovo?`,
      slo: `??eli?? poskusiti ??e enkrat?`,
      bos: `??eli?? li poku??ati ponovo?`,
    };
    return texts[state.getLang()];
  }

  getHeading() {
    const texts = {
      slo: `??al je va?? ??as
potekel, slika pa ??e
vedno ni sestavljena.`,
      cro: `Na??alost vrijeme je
isteklo, a slika
jo?? nije slo??ena. `,
      srb: `Na??alost vreme je
isteklo, a slika
jo?? nije slo??ena. `,
      mon: `Na??alost vreme je
isteklo, a slika
jo?? nije slo??ena. `,
      maced: `???? ?????? ??????????????
????????????, ?? ??????????????
????  ???????? ???? ?? 
??????????????????.`,
      bos: `Na??alost vrijeme je
isteklo, a slika
jo?? nije slo??ena.`,
    };
    return texts[state.getLang()];
  }

  create() {
    this.initStatics();
  }
}
