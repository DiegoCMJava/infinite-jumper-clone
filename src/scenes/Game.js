import Phaser from "../lib/phaser.js";
import Carrot from "../game/Carrot.js";


export default class Game extends Phaser.Scene  
{
   /** @type {Phaser.Physics.Arcade.StaticGroup} */
   platforms;

   /**@type {Phaser.Physics.Arcade.Sprite} */
   player;
   cursors;

   /** @type {Phaser.Physics.Arcade.Group} */
   carrots;

   carrotCollected = 0;

   /** @type {Phaser.GameObjects.Text}*/
   carrotsCollectedText;

 constructor(){
    super('game');
 };

 init(){
   this.carrotCollected = 0;
 };

 preload(){
    this.load.image('background', 'assets/bg_layer1.png');
    this.load.image('stand', 'assets/bunny2_stand.png');
    this.load.image('jump', 'assets/bunny2_jump.png');
    this.load.image('platform', 'assets/ground_cake_broken.png');
    this.load.image('carrot', 'assets/carrot.png')
   this.load.audio('jumpSound', 'assets/sfx/jump.ogg'); // https://opengameart.org/content/cute-cartoon-jump-sound-effect
    this.cursors = this.input.keyboard.createCursorKeys();
   
 };

 create(){
    this.add.image(240, 320, 'background').setScrollFactor(1, 0);// 240 320

    this.platforms = this.physics.add.staticGroup();

    // creando plataformas
    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between( 40, 400); //80, 400
      const y = 150 * i; // 150
   
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();


    };
    this.player = this.physics.add.sprite(240, 320, 'stand')
    .setScale(0.5);

    this.physics.add.collider(this.platforms, this.player);

      this.carrots = this.physics.add.group({
         classType: Carrot
      });
    

   this.physics.add.collider(this.platforms, this.carrots);

   this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this  
   );

   const style = { color: '#000', fontSize: 24 };
  this.carrotsCollectedText = this.add.text(240, 10, 'Zanahorias: 0', style)
   .setScrollFactor(0)
   .setOrigin(0.5, 0);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5 );

    
 } ;

 update(){
  
   if (!this.player) {
      return;
   };
 
   this.platforms.children.iterate(child => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;
       
      const scrollY = this.cameras.main.scrollY;

      

      if (platform.y >= scrollY + 700){
         platform.y = scrollY - 90; //Phaser.Math.Between(50, 100); // 50 100
         console.log(platform.y +" se cumple");
         console.log(scrollY +" scrollY");
         platform.body.updateFromGameObject();

         this.addCarrotAbove(platform);
      
      };
      
   });

   const touchingDown = this.player.body.touching.down;

   if (touchingDown) {
      this.player.setVelocityY(-300); // el valor original es -300
      this.player.setTexture('jump');
      this.sound.play('jumpSound');
   }
   const vy = this.player.body.velocity.y;
   if (vy > 0 && this.player.texture.key !== 'stand') {
      
      this.player.setTexture('stand');
   }

   if (this.cursors.left.isDown && !touchingDown) {
       this.player.setVelocityX(-200);
   }
   else if(this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
   } 
   else {
      this.player.setVelocityX(0);
   }
   this.horizontalWrap(this.player);

   const bottomPlatform = this.findBottomMostPlatform();
  
   if (this.player.y > bottomPlatform.y + 200) {
      this.scene.start('game-over');
   }

  
 };

 horizontalWrap(sprite){
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    }
    else if ( sprite.x > gameWidth + halfWidth){
      sprite.x = -halfWidth;
    }
 };

 /**
  * 
  * @param {Phaser.GameObjects.Sprite} sprite
  */

 addCarrotAbove(sprite){
   const y = sprite.y - sprite.displayHeight;

   /** @type {Phaser.Physicshysics.Arcade.Sprite} */
   const carrot = this.carrots.get(sprite.x, y, 'carrot');

   carrot.setActive(true);
   carrot.setVisible(true);

   this.add.existing(carrot);

   carrot.body.setSize(carrot.width, carrot.height);

   this.physics.world.enable(carrot);

   return carrot;
 };

   handleCollectCarrot(player, carrot){
      this.carrots.killAndHide(carrot);
      this.physics.world.disableBody(carrot.body);

      this.carrotCollected++;

      const value = `Zanahorias: ${this.carrotCollected}`;
      this.carrotsCollectedText.text = value;

      if (this.carrotCollected == 100) {
         this.scene.start('game-won');
      };
   };

 findBottomMostPlatform(){
   const platforms = this.platforms.getChildren();
   let bottomPlatform = platforms[0];

   for (let i = 1; i < platforms.length; ++i) {
      const platform = platforms[i];
      if (platform.y < bottomPlatform.y){
         continue;
       
      }
      bottomPlatform = platform;
      
   };
   return bottomPlatform;
   
   
 };
  

};