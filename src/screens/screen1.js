import Phaser from 'phaser';
import loader from '../loader'
import state from '../state';
import MyScene from '../utils';

export default class Screen1 extends MyScene {
    constructor() {
        super('Screen1');

    }

    initScene() {
        this.addCenter("intro").setScale(state.defaultScale);
    }

    initButtons() {
        let pos = this.Y();

        Object.keys(loader.countries).forEach(c => {
            const btn = this.add.image(this.cameras.main.centerX, pos, loader.assets[c]).setInteractive().setScale(state.defaultScale);
            pos += 90;
            btn.on('pointerdown', () => {
                state.setLang(c);
                if (!['cro', 'bos', 'slo'].includes(c)) {
                    loader.assets[12] = 'zova15';
                }
                this.scene.start('Screen2');
            })
        });
    }

    init() {
        this.initScene();
        this.initButtons();
    }

    create() {
        this.init();
    }
}