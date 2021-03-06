import { config } from "./config";
export default class titleScene extends Phaser.Scene{
    constructor(){
    super("title");
}

preload () {
    this.load.image('background0', '../src/assets/ui/BG.png');

    //this.load.image('logo', require('./../src/assets/logo.png'));
    // load assets needed in our game
    this.load.image('blueButton3', '../src/assets/ui/Button_13.png');
  this.load.image('blueButton1', '../src/assets/ui/blue_button02.png');
  this.load.image('blueButton2', '../src/assets/ui/blue_button03.png');
  this.load.image('logo', '../src/assets/slidypuzz.png');
  this.load.image('box', '../src/assets/ui/grey_box.png');
  this.load.image('checkedBox', '../src/assets/ui/blue_boxCheckmark.png');
  this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);
  this.load.audio('buttonSound', '../src/assets/ui/Coffee1.mp3');

} 
create() {
this.buttonsound = this.sound.add("buttonSound")
    this.add.image(400, 300, "background0");
    const x = this.scale.width * 0.5;
		const y = this.scale.height * 0.25;
        this.add.image(x, y, "logo");
	

    //var bg = this.add.sprite(0,0,'logo');
    //bg.setOrigin(0,0);
    this.startButton = this.add.sprite(400, 400, 'blueButton3').setScale(0.37).
    setInteractive({ useHandCursor: true });
    this.startButton.on('pointerover', () => this.startButton.setTint(0xFFE888).setScale(0.4) )
    .on('pointerout', () => this.startButton.clearTint().setScale(0.37) )

   this.text = this.add.text(300, 350, 'sTaRt!', {  fontFamily: 'cursive', fontSize: '38px', color: "white"});
    var _this = this;
    Phaser.Display.Align.In.Center(this.text, this.startButton);
    this.startButton.on('pointerdown', () => clickButton());
function clickButton() {
  if (_this.model.soundOn === true ) {
    _this.sound.play('buttonSound')}
        _this.scene.start('PlayGame');
    }
    


    this.optionButton = this.add.sprite(400, 475, 'blueButton3').
    setScale(0.37).
    setInteractive({ useHandCursor: true })
    .on('pointerover', () => this.optionButton.setTint(0xFFE888).setScale(0.4) )
    .on('pointerout', () => this.optionButton.clearTint().setScale(0.37) );
    this.optionText = this.add.text(0, 0, 'oPtiOns', {  fontFamily: 'cursive', fontSize: '38px', color: "white"});
    Phaser.Display.Align.In.Center(this.optionText, this.optionButton);

    this.optionButton.on('pointerdown', function (pointer) {
      //play the tile slide sound
      if (_this.model.soundOn === true ) {
        this.sound.play('buttonSound')}
        this.game.config.optionKey = this.scene.key;
      this.scene.start('Options');
    }.bind(this));

    this.creditsButton = this.add.sprite(400, 550, 'blueButton3').setScale(0.37).
    setInteractive({ useHandCursor: true })
    .on('pointerover', () => this.creditsButton.setTint(0xFFE888).setScale(0.4) )
    .on('pointerout', () => this.creditsButton.clearTint().setScale(0.37) )
    ;
    this.creditsText = this.add.text(0, 0, 'cReditS', {  fontFamily: 'cursive', fontSize: '38px', color: "white"});
    Phaser.Display.Align.In.Center(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', function (pointer) {
      if (_this.model.soundOn === true ) {
        this.sound.play('buttonSound')}
      this.scene.start('Credits');
    }.bind(this));

    this.model = this.sys.game.globals.model;
if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
  this.bgMusic.play();
  this.model.bgMusicPlaying = true;
  this.sys.game.globals.bgMusic = this.bgMusic;
};}}