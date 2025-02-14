import Phaser from "../lib/phaser.js";

export default class GameWon extends Phaser.Scene {

    constructor() {
        super('game-won');
    };

    preload() {
        this.load.image('background', 'assets/bg_layer1.png');
    };

    create(){
        this.add.image(240, 320, 'background');

        const width = this.scale.width;
        const height = this.scale.height;

        const texto = [
            '¡Felicidades!',
            '¡Saltarina ha recolectado',
            'las de cien zanahorias!',
        ];

        this.add.text(width * 0.5, 250, texto, {
            fontSize: 40,
            fontFamily: 'Impact',
            color: "red"
        })
            .setOrigin(0.5);

        this.add.text(width * 0.5, height * 0.7, 'Presiona la barra espaciadora para reiniciar', {
            fontSize: 16,
            fontwidth: 'bold',
            color: "red"
        })
            .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE',
            () => {
                this.scene.start('game');
        });
};
};
