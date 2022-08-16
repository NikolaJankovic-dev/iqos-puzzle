import Phaser from "phaser";
import loader from "../loader";
import state from "../state";
import MyScene from "../utils";

const HEADING_OFFSET = 400;
const TOP_PADDING = 50;

export default class End extends MyScene {
  constructor() {
    super("End");
  }

  initStatics() {
    this.addCenter("endbg").setScale(state.defaultScale);

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.height - 245,
        loader.assets.replaybtn
      )
      .setScale(state.defaultScale)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Screen2");
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
      maced: "ИГРАЈ ПОВТОРНО",
      cro: "IGRAJ PONOVO",
      srb: "IGRAJ PONOVO",
      mon: "IGRAJ PONOVO",
      slo: "IGRAJ PONOVNO",
      bos: "IGRAJ PONOVO",
    };
    return btnTexts[state.getLang()];
  }

  getSubHeading() {
    const texts = {
      maced: `Сакаш ли да пробаш повторно?`,
      cro: `Želiš li pokušati ponovo?`,
      srb: `Da li želiš da pokušaš ponovo?`,
      mon: `Da li želiš da pokušaš ponovo?`,
      slo: `Želiš poskusiti še enkrat?`,
      bos: `Želiš li pokušati ponovo?`,
    };
    return texts[state.getLang()];
  }

  getHeading() {
    const texts = {
      slo: `Žal je vaš čas
potekel, slika pa še
vedno ni sestavljena.`,
      cro: `Nažalost vrijeme je
isteklo, a slika
još nije složena. `,
      srb: `Nažalost vreme je
isteklo, a slika
još nije složena. `,
      mon: `Nažalost vreme je
isteklo, a slika
još nije složena. `,
      maced: `За жал времето
истече, а сликата
сè  уште не е 
составена.`,
      bos: `Nažalost vrijeme je
isteklo, a slika
još nije složena.`,
    };
    return texts[state.getLang()];
  }

  create() {
    this.initStatics();
  }
}
