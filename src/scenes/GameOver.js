import Phaser from '../lib/phaser.js';

export default class GameOver extends Phaser.Scene {

    constructor() {
        super('game-over')
    };

    preload() {
        this.load.image('background', 'assets/bg_layer1.png');
    };
    create() {
        this.add.image(240, 320, 'background');
        const width = this.scale.width;
        // const height = this.scale.height;

        const texto = [
            '  ¡OH!',
            ' ¡Pobre',
            'conejita!',
        ];

        this.add.text(200, 250, texto, { fontSize: 80, fontFamily: 'Impact', color: "red" }).setOrigin(0.5);
        /*
                this.add.text(width * 0.5, 200, '¡OH!',  { //width * 0.5, height * 0.5, 
                    fontSize: 80,
                    color: "red"
                })
                .setOrigin(0.5);
                this.add.text(width * 0.5, 300, '¡Pobre',  { //width * 0.5, height * 0.5, 
                    fontSize: 80,
                    color: "red"
                })
                .setOrigin(0.5);
         */
        this.add.text(220, 500, 'Presiona la barra espaciadora para reiniciar', { //width * 0.5, height * 0.5, 
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