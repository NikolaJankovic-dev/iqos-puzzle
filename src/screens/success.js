import Phaser from "phaser";
import loader from "../loader";
import state from "../state";
import MyScene from "../utils";

const HEADING_OFFSET = 400;
const TOP_PADDING = 50;

export default class Success extends MyScene {
  constructor() {
    super("Success");
  }

  initStatics() {
    this.addCenter("success").setScale(state.defaultScale);

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.height - 475,
        loader.assets.points
      )
      .setScale(0.75)
      .setInteractive()
      .on("pointerdown", () => {
        window.top.location.href = "http://hr.pmiopen.com/s/slagalica-poeni";
      });

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.height - 150,
        loader.assets.replaybtn
      )
      .setScale(0.65)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Screen2");
      });

    // this.add
    //   .image(this.cameras.main.centerX, 200 + TOP_PADDING, loader.assets.effect)
    //   .setScale(state.defaultScale);

    // this.heading2 = this.add.text(
    //   this.cameras.main.centerX + 3,
    //   HEADING_OFFSET + 3 + TOP_PADDING,
    //   this.getHeading().toUpperCase(),
    //   {
    //     fontFamily: "Effra",
    //     color: "red",
    //   }
    // );
    // this.heading2.setOrigin(0.5, 0.5);
    // this.heading2.setFontSize(92);
    // this.heading2.setAlign("center");
    // this.heading2.setRotation(-0.2);

    // this.heading = this.add.text(
    //   this.cameras.main.centerX,
    //   HEADING_OFFSET + TOP_PADDING,
    //   this.getHeading().toUpperCase(),
    //   {
    //     fontFamily: "Effra",
    //   }
    // );
    // this.heading.setOrigin(0.5, 0.5);
    // this.heading.setFontSize(92);
    // this.heading.setAlign("center");
    // this.heading.setRotation(-0.2);

    // this.subheading = this.add.text(
    //   this.cameras.main.centerX,
    //   this.Y() + TOP_PADDING,
    //   this.getSubHeading(),
    //   {
    //     fontFamily: "Effra",
    //   }
    // );
    // this.subheading.setOrigin(0.5, 0.5);
    // this.subheading.setFontSize(50);
    // this.subheading.setAlign("center");

    this.timeText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 275,
      `${this.getTimeText()}: ${state.getTime() || 0} s.`,
      {
        fontFamily: "Arial",
      }
    );
    this.timeText.setOrigin(0.5, 0.5);
    this.timeText.setFontSize(65);

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

  getTimeText() {
    const texts = {
      maced: `Твоето време е`,
      cro: `Tvoje vrijeme je`,
      srb: `Tvoje vreme je`,
      mon: `Tvoje vrijeme je`,
      slo: `Tvoj čas je`,
      bos: `Tvoje vrijeme je`,
    };
    return texts["cro"];
  }

  getSubHeading() {
    const texts = {
      maced: `Сликата од твоето омилено
освежување е составена!`,
      cro: `Slika tvog omiljenog osvježenja
je složena!`,
      srb: `Slika tvog omiljenog osveženja
je složena!`,
      mon: `Slika tvog omiljenog osveženja
je složena!`,
      slo: `Slika tvoje najljubše osvežilne
pijače je sestavljena!`,
      bos: `Slika tvog omiljenog osvježenja
je složena!`,
    };
    return texts[state.getLang()];
  }

  getHeading() {
    const texts = {
      maced: `Браво за брзината
и умешноста!`,
      cro: `Bravo za brzinu
i spretnost!`,
      srb: `Bravo za brzinu
i spretnost!`,
      mon: `Bravo za brzinu
i spretnost!`,
      slo: `Bravo za hitrost
in spretnost!`,
      bos: `Bravo za brzinu
i spretnost!`,
    };
    return texts[state.getLang()];
  }

  create() {
    this.initStatics();
  }
}
