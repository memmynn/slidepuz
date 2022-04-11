import Phaser from "phaser";

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }
preload(){
  // load assets needed in our game
  this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
  this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
  this.load.image('phaserLogo', 'src/assets/logo.png');
  this.load.image('box', 'src/assets/ui/grey_box.png');
  this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
  this.load.audio('bgMusic', ['src/assets/TownTheme.mp3']);
};

  create () {
    this.musicOn = true;
    this.soundOn = true;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 , fill: '#000000'});

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24, fill: '#000000' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      this.musicOn = !this.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.soundOn = !this.soundOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.menuText = this.add.text(0, 0, 'Main Menu', { fontSize: '32px', fill: '#000000' });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', function (pointer) {
      this.scene.start('title');
    }.bind(this));

    this.updateAudio();
  }

  updateAudio() {
    if (this.musicOn === false) {
      this.musicButton.setTexture('box');
    } else {
      this.musicButton.setTexture('checkedBox');
    }

    if (this.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
};
