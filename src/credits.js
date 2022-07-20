import { config } from "./config";
export default class CreditsScene extends Phaser.Scene {
    constructor () {
      super('Credits');
    }
  
    preload() {
        this.load.image('background', '../src/assets/ui/BG.png');
    }
    create () {
      var _this = this;
      this.buttonsound = this.sound.add("buttonSound")

        this.add.image(400, 300, "background");
      
        this.model = this.sys.game.globals.model;
if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
  this.bgMusic.play();
  this.model.bgMusicPlaying = true;
  this.sys.game.globals.bgMusic = this.bgMusic;
};

        this.input.on("pointerdown", function () {
        if (_this.model.soundOn === true ) {
          this.sound.play('buttonSound')}
        this.madeByTween.destroy;
        this.scene.start('title');
      }.bind(this))


      this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
      this.madeByText = this.add.text(0, 0, `Created By: Mehmet Emin Uyar
      
      
      Music by: Bensound.com`, { fontSize: '45px', fill: '#fff' });
      this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);
  
      Phaser.Display.Align.In.Center(
        this.creditsText,
        this.zone
      );
  
      Phaser.Display.Align.In.Center(
        this.madeByText,
        this.zone
      );
  
      this.madeByText.setY(1000);
  
      this.creditsTween = this.tweens.add({
        targets: this.creditsText,
        y: -100,
        ease: 'Power1',
        duration: 3000,
        delay: 1000,
        onComplete: function () {
          this.destroy;
        }
      });
  
      this.madeByTween = this.tweens.add({
        targets: this.madeByText,
        y: -300,
        ease: 'Power1',
        duration: 8000,
        delay: 1000,
        onComplete: function () {
          this.madeByTween.destroy;
          this.scene.start('title');
        }.bind(this)
      });
    }
  };