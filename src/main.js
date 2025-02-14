import Phaser from "./lib/phaser.js";
import Init from "./scenes/init.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import GameWon from "./scenes/GameWon.js";



export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 480, //480
    height: 640, // 640
    scene: [
        Init,
        Game,
        GameOver,
        GameWon
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            },
            debug: false
        }
    }
});
