import loader from "./loader";

export default class MyScene extends Phaser.Scene {
    constructor(param) {
        super(param);
        this.X = () => this.cameras.main.centerX;
        this.Y = () => this.cameras.main.centerY;
    }

    /**
     * 
     * @param {string} val 
     * @returns Phaser.GameObjects.Image
     */
    addCenter(val) {
        return this.add.image(this.X(), this.Y(), loader.assets[val]).setOrigin(0.5, 0.5);
    }

    /**
      * 
      * @param {string} val 
      * @returns Phaser.GameObjects.Image
      */
    addStr(val) {
        return this.add.image(this.X(), this.Y(), loader.assets[val])
    }
}