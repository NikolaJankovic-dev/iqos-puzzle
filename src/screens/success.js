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
    this.cameras.main.fadeIn(1500);
    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.height - 527.5,
        loader.assets.points
      )
      .setScale(0.75)
      .setInteractive()
      .on("pointerdown", () => {
        window.top.location.href = "http://www.pmiopen.si/s/5-years-points";
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
      this.cameras.main.height - 175,
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
      maced: "?????????? ????????????????",
      cro: "IGRAJ PONOVO",
      srb: "IGRAJ PONOVO",
      mon: "IGRAJ PONOVO",
      slo: "IGRAJ PONOVNO",
      bos: "IGRAJ PONOVO",
    };
    return btnTexts["slo"];
  }

  getTimeText() {
    const texts = {
      maced: `???????????? ?????????? ??`,
      cro: `Tvoje vrijeme je`,
      srb: `Tvoje vreme je`,
      mon: `Tvoje vrijeme je`,
      slo: `Va?? ??as je`,
      bos: `Tvoje vrijeme je`,
    };
    return texts["slo"];
  }

  getSubHeading() {
    const texts = {
      maced: `?????????????? ???? ???????????? ??????????????
???????????????????? ?? ??????????????????!`,
      cro: `Slika tvog omiljenog osvje??enja
je slo??ena!`,
      srb: `Slika tvog omiljenog osve??enja
je slo??ena!`,
      mon: `Slika tvog omiljenog osve??enja
je slo??ena!`,
      slo: `Slika tvoje najljub??e osve??ilne
pija??e je sestavljena!`,
      bos: `Slika tvog omiljenog osvje??enja
je slo??ena!`,
    };
    return texts["slo"];
  }

  getHeading() {
    const texts = {
      maced: `?????????? ???? ????????????????
?? ??????????????????!`,
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
    return texts["slo"];
  }

  create() {
    this.initStatics();
  }
}
