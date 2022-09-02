import Phaser from "phaser";
import loader from "../loader";
import state from "../state";
import MyScene from "../utils";

const TILE_SIZE = 380;
const DISPLAY_WIDTH = 960;
const START_TIMER = 5;
const TIMER_TOP_OFFSET = 30;
const NUM_OF_SHUFFLE = 12;
const GAME_DURATION = 90;

export default class Screen3 extends MyScene {
  constructor() {
    super("Screen3");
  }

  initStatics() {
    this.cameras.main.fadeIn(700);
    this.cameras.main.setBackgroundColor("#ffffff");
    this.addCenter("bg");
    this.addCenter("timerb").setY(72).setX(400).setScale(0.5);
    const timer = this.addCenter("time").setY(72).setX(400).setScale(0.5);

    this.mask = this.make.sprite({
      x: 120,
      y: 72,
      add: false,
    });

    this.mask.setScale(1, 1);

    timer.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);

    const container = this.add.container(0, 0);

    // const bg = this.add.sprite(this.X(), this.Y(), loader.assets.bg);
    // bg.displayHeight = DISPLAY_WIDTH;
    // bg.displayWidth = DISPLAY_WIDTH;
    // container.add(bg);
    this.container = container;
  }

  getMMSSFromSec(sec) {
    let totalSeconds = sec;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  getSec(sec) {
    return (sec %= 3600);
  }

  initTiles() {
    let posX = 0;
    let posY = -50;
    let counter = 0;
    this.tiles = [];
    Object.keys(loader.tiles).forEach((tileKey) => {
      if (counter % 3 === 0) {
        posX = -TILE_SIZE / 2;
        posY += TILE_SIZE;
      }
      posX += TILE_SIZE;

      const ref = this.addStr(tileKey).setX(posX).setY(posY).setInteractive();
      ref.displayWidth = TILE_SIZE;
      ref.displayHeight = TILE_SIZE;
      ref.id = counter;

      this.input.setDraggable(ref);

      this.tiles.push({ id: counter, ref });

      counter++;
    });
  }

  calculateAvailableMoves() {
    this.tiles.forEach((el) => {
      if (el.ref) (el.ref.move = null), (el.ref.oldCoords = null);
    });
    const empty = this.tiles.find((el) => !el.ref);
    const emptyId = this.tiles.indexOf(empty);
    let am = [];

    const leftMv = { id: emptyId + 1, move: "left" };
    const upMv = { id: emptyId + 3, move: "up" };
    const rightMv = { id: emptyId - 1, move: "right" };
    const downMv = { id: emptyId - 3, move: "down" };

    am = [upMv, downMv];

    if (emptyId % 3 !== 0 && emptyId % 3 !== 2) {
      am.push(rightMv);
      am.push(leftMv);
    } else if (emptyId % 3 === 0) {
      am.push(leftMv);
    } else if (emptyId % 3 === 2) {
      am.push(rightMv);
    }

    am = am.filter((el) => el.id >= 0 && el.id <= 8);

    am.forEach((a) => {
      const card = this.tiles[a.id];
      if (card && card.ref) {
        card.ref.move = a.move;
        card.ref.oldCoords = { x: card.ref.x, y: card.ref.y };
      }
    });

    const forWon = this.tiles.map((el) => (el.ref && el.ref.id) || 0);
    forWon[0] = 2;

    const isWon = this.isSorted(forWon);

    if (this.started && isWon) {
      this.started = false;
      this.finished = true;
      this.deactivateEvents();

      state.setTime(this.getMMSSFromSec(this.timer));
      console.log(this);
      const ref = this.addStr("3")
        .setX(TILE_SIZE * 2.5)
        .setY(TILE_SIZE - 50);
      ref.displayWidth = TILE_SIZE;
      ref.displayHeight = TILE_SIZE;

      this.tweens.add({
        targets: ref,
        alpha: { from: 0, to: 1 },
        ease: "Linear",
        duration: 2000,
        repeat: 0,
        yoyo: false,
        onComplete: () => {
          this.cameras.main.fade(1500);

          setTimeout(() => {
            this.scene.start("Success");
          }, 1500);
        },
      });
    }
  }

  isSorted(arr) {
    let should = [2, 1, 0, 3, 4, 5, 6, 7, 8];
    return arr.slice(1).every((item, i) => {
      console.log(arr.toString());
      if (arr.toString() == should.toString()) {
        console.log("true");
        return true;
      }
    });
  }

  getNull() {
    return this.tiles.find((el) => el.ref === null);
  }

  tileSnap() {
    if (this.dragObj && this.dragObj.oldCoords) {
      const nil = this.getNull();
      switch (this.dragObj.move) {
        case "left":
          if (this.dragObj.x <= this.dragObj.oldCoords.x - TILE_SIZE / 2) {
            this.dragObj.x = this.dragObj.oldCoords.x - TILE_SIZE;
            nil.ref = this.dragObj;
            const gameObj = this.tiles[nil.id + 1];
            gameObj.ref = null;
          } else {
            this.dragObj.x = this.dragObj.oldCoords.x;
          }

          break;
        case "right":
          if (this.dragObj.x >= this.dragObj.oldCoords.x + TILE_SIZE / 2) {
            this.dragObj.x = this.dragObj.oldCoords.x + TILE_SIZE;
            nil.ref = this.dragObj;
            const gameObj = this.tiles[nil.id - 1];
            gameObj.ref = null;
          } else {
            this.dragObj.x = this.dragObj.oldCoords.x;
          }

          break;
        case "up":
          if (this.dragObj.y <= this.dragObj.oldCoords.y - TILE_SIZE / 2) {
            this.dragObj.y = this.dragObj.oldCoords.y - TILE_SIZE;
            nil.ref = this.dragObj;
            const gameObj = this.tiles[nil.id + 3];
            gameObj.ref = null;
          } else {
            this.dragObj.y = this.dragObj.oldCoords.y;
          }
          break;
        case "down":
          if (this.dragObj.y >= this.dragObj.oldCoords.y + TILE_SIZE / 2) {
            this.dragObj.y = this.dragObj.oldCoords.y + TILE_SIZE;
            nil.ref = this.dragObj;
            const gameObj = this.tiles[nil.id - 3];
            gameObj.ref = null;
          } else {
            this.dragObj.y = this.dragObj.oldCoords.y;
          }
          break;

        default:
          break;
      }

      this.calculateAvailableMoves();
    }
  }

  tileMove(pointer, gameObject, dragX, dragY) {
    this.dragObj = gameObject;
    switch (gameObject.move) {
      case "left":
        if (dragX < gameObject.oldCoords.x) {
          gameObject.x = dragX;
        }
        if (dragX > gameObject.oldCoords.x) {
          gameObject.x = gameObject.oldCoords.x;
        } else if (dragX < gameObject.oldCoords.x - TILE_SIZE) {
          gameObject.x = gameObject.oldCoords.x - TILE_SIZE;
        }
        break;
      case "right":
        if (dragX > gameObject.oldCoords.x) {
          gameObject.x = dragX;
        }
        if (dragX < gameObject.oldCoords.x) {
          gameObject.x = gameObject.oldCoords.x;
        } else if (dragX > gameObject.oldCoords.x + TILE_SIZE) {
          gameObject.x = gameObject.oldCoords.x + TILE_SIZE;
        }
        break;
      case "up":
        if (dragY < gameObject.oldCoords.y) {
          gameObject.y = dragY;
        }
        if (dragY > gameObject.oldCoords.y) {
          gameObject.y = gameObject.oldCoords.y;
        } else if (dragY < gameObject.oldCoords.y - TILE_SIZE) {
          gameObject.y = gameObject.oldCoords.y - TILE_SIZE;
        }
        break;
      case "down":
        if (dragY > gameObject.oldCoords.y) {
          gameObject.y = dragY;
        }
        if (dragY < gameObject.oldCoords.y) {
          gameObject.y = gameObject.oldCoords.y;
        } else if (dragY > gameObject.oldCoords.y + TILE_SIZE) {
          gameObject.y = gameObject.oldCoords.y + TILE_SIZE;
        }
        break;

      default:
        break;
    }
  }

  shuffle() {
    const tiles = this.tiles;

    return new Promise(async (r) => {
      const moves = tiles.filter((el) => el.ref && el.ref.move);
      const index = Math.floor(Math.random() * moves.length);
      const tile = moves[index].ref;
      if (this.dragObj && this.dragObj.id === tile.id) {
        await this.shuffle();
        r();
        return;
      }

      this.dragObj = tile;

      const movesObj = {
        right: {
          x: tile.x + TILE_SIZE,
        },
        left: {
          x: tile.x - TILE_SIZE,
        },
        up: {
          y: tile.y - TILE_SIZE,
        },
        down: {
          y: tile.y + TILE_SIZE,
        },
      };

      const animation = this.tweens.add({
        targets: tile,
        duration: 125,
        ease: "Power2",
        ...movesObj[tile.move],
      });

      animation.on("complete", () => {
        this.tileSnap();
        r();
      });
    });
  }

  initEvents() {
    this.input.on("drag", (a, b, c, d) => this.tileMove(a, b, c, d));
    this.input.on("dragend", (a, b, c, d) => this.tileSnap());
    this.tiles.forEach((tile) => {
      if (tile.ref) {
        tile.ref.on("pointerup", () => this.tileSnap());
      }
    });
  }

  deactivateEvents() {
    this.input.removeAllListeners();
    this.tiles.forEach((tile) => {
      if (tile.ref) {
        tile.ref.removeAllListeners();
      }
    });
  }

  initTimer() {
    return new Promise((r) => {
      this.debug = this.add.graphics();
      this.timer = START_TIMER;
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: () => {
          if (this.finished) return;
          if (!this.started && this.timer <= 0) return;

          if (this.timer >= GAME_DURATION) {
            this.started = false;
            this.finished = true;
            this.cameras.main.fade(1500);
            this.deactivateEvents();
            setTimeout(() => {
              this.scene.start("End");
            }, 1500);

            return;
          }

          if (this.started) {
            ++this.timer;
          } else {
            --this.timer;
            if (this.timer === 0) {
              r();
            }
          }
        },
        callbackScope: this,
        loop: true,
      });

      this.timerText = this.add.text(
        this.cameras.main.width - 165,
        45,
        "00:53",
        {
          fontFamily: "Effra",
        }
      );

      this.timerText.setOrigin(0.5, 0);
      this.timerText.setFontSize(55);
      // this.add
      //   .image(this.X(), TIMER_TOP_OFFSET, "timerb")
      //   .setOrigin(0.5, 0)
      //   .setScale(state.defaultScale);
    });
  }

  update() {
    this.debug.clear();
    // const size = 510;
    // // this.debug.fillStyle(0xf8b600);
    // // this.debug.fillRect(this.X() - size / 2, TIMER_TOP_OFFSET + 5, size, 30);
    // this.debug.fillStyle(0xec6101);
    // this.debug.fillRect(
    //   this.X() - size / 1.2,
    //   TIMER_TOP_OFFSET + 5,
    //   (size * this.timer) / GAME_DURATION,
    //   30
    // );

    this.mask.setScale((35.2 * this.getSec(this.timer)) / GAME_DURATION, 1);

    this.timerText.setText(this.getMMSSFromSec(this.timer));
  }

  async create() {
    this.finished = false;
    this.started = false;
    this.availableMoves = [];
    this.dragObj = null;
    this.mask = null;

    this.initStatics();
    this.initTiles();

    await this.initTimer();
    this.tweens.add({
      targets: this.tiles[2].ref,
      alpha: { from: 1, to: 0 },
      ease: "Linear",
      duration: 1000,
      repeat: 0,
      yoyo: false,
      onComplete: async () => {
        this.tiles[2].ref = null;
        this.calculateAvailableMoves();
        for (let i = 0; i < NUM_OF_SHUFFLE; i++) {
          await this.shuffle();
        }
        this.started = true;
        this.initEvents();
      },
    });
  }
}
