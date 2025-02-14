import Phaser from "../lib/phaser.js";

export default class Init extends Phaser.Scene {
    constructor() {
        super('init');
    };
    preload()
    {
        this.load.image('background', 'assets/bg_layer1.png');
    };
    create()
    {
        this.add.image(240, 320, 'background');

        this.add.text(240, 50, '¡Bienvenido!', {
            fontSize: 40,
            fontwidth: 'bold',
            color: "red"
        })
            .setOrigin(0.5);

        const content = [
            '¡Ayuda a Saltarina a recolectar zanahorias!',
            '',
            'Saltarina, la conejita, se encuentra en un mundo',
            'lleno de zanahorias, pero no puede comerlas.',
            'Ayúdala a saltar de plataforma en  plataforma',
            'para recolectar por lo menos cien  zanahorias.',
            '',
            '',
            '',
            'Usa las flechas derecha e izquierda del teclado',
            'para moverte.',
            '',
            '',
            '¡Evita que Saltarina caiga al vacío!',
            '',
            '',
            '',
            '',
            '',
        ];

        this.add.text(30, 100, content, { fontFamily: 'Impact', fontwidth: 'bold', fontSize: 20, color: '#523c08' });
       
      
       
        this.add.text(230, 500, 'Presiona la barra espaciadora para comenzar', {
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