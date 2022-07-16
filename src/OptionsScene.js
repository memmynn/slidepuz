import Phaser from "phaser";

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  
preload(){
  // load assets needed in our game
  this.load.image('blueButton', 'src/assets/ui/Button_62.png');
 
  this.load.image('phaserLogo', 'src/assets/logo.png');
  this.load.image('musicBox', 'src/assets/ui/slice_Button_93.png');
  this.load.image('soundBox', 'src/assets/ui/slice_Button_94.png');
  this.load.image('sBox', 'src/assets/ui/slice_Button_133.png');
  this.load.image('mBox', 'src/assets/ui/slice_Button_132.png');
  this.load.audio('bgMusic', ['src/assets/TownTheme.mp3']);
  this.load.image('background', 'src/assets/ui/BG.png');

};

  create () {
    var _this = this;
    //this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#FF6666");
    this.add.image(400, 300, "background");
    this.buttonsound = this.sound.add("buttonSound")

    this.model = this.sys.game.globals.model;

    this.text = this.add.text(330, 60, 'OpTionS', {  fontFamily: 'cursive', fontSize: '38px', color: "white"});
    this.musicButton = this.add.image(400, 200, 'musicBox');

    this.soundButton = this.add.image(400, 300, 'soundBox');

    this.musicButton.    setScale(0.5).
    setInteractive({ useHandCursor: true }).on('pointerover', () => this.musicButton.setTint(0xFFE888).setScale(0.55) )
    .on('pointerout', () => this.musicButton.clearTint().setScale(0.5) );
    this.soundButton.    setScale(0.5).
    setInteractive({ useHandCursor: true }).on('pointerover', () => this.soundButton.setTint(0xFFE888).setScale(0.55) )
    .on('pointerout', () => this.soundButton.clearTint().setScale(0.5) );

    this.musicButton.on('pointerdown', function () {
      if (_this.model.soundOn === true ) {
        this.sound.play('buttonSound')}
      
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      if (_this.model.soundOn === true ) {
        this.sound.play('buttonSound')}
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = this.add.sprite(400, 500, 'blueButton').
    setScale(0.5)
    .setInteractive({ useHandCursor: true }).on('pointerover', () => this.menuButton.setTint(0xFFE888).setScale(0.55) )
    .on('pointerout', () => this.menuButton.clearTint().setScale(0.5) );
    

    this.menuButton.on('pointerdown', function (pointer) {
      if (_this.model.soundOn === true ) {
        this.sound.play('buttonSound')}
      this.scene.switch(this.game.config.optionKey);
    }.bind(this));

    this.updateAudio();
  }
  updateAudio() {
    let _this = this;
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('mBox');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('musicBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('sBox');
    } else {
      this.soundButton.setTexture('soundBox');
    }

    /* if (_this.model.musicOn === false) {
      _this.musicButton.setTexture('box');
      if(_this.game.sound.get('snowfall-bgm')){
      _this.game.sound.stopByKey('snowfall-bgm')};
    } else {
      _this.musicButton.setTexture('checkedBox');
      if(_this.game.sound.get('snowfall-bgm')){
      _this.game.sound.play('snowfall-bgm')};
    }

    if (_this.model.soundOn === false) {
      _this.soundButton.setTexture('box');
      _this.game.sound.stopByKey(['slide-snd', 'noot-snd']);
    } else {
      _this.soundButton.setTexture('checkedBox');
      _this.game.sound.resumeAll(['slide-snd', 'noot-snd']);
    }*/
  }
};
