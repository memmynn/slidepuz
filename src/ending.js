export default class Ending extends Phaser.Scene
{
    constructor ()
    {
        super("ending");
    }

    preload ()
    {
        const pictures = [
            'src/assets/pingu-puzzle.png',
            'src/assets/karinna-hotel-uludag-genel_86791.jpg',
            'src/assets/white-Snowhotel-Norway-Ski-Shop-Log-Cabin-Kirkenes-2144793.jpg',
            'src/assets/grass.jpg',
            'src/assets/flowers.jpg',
            'src/assets/bicycle.jpg',
            'src/assets/summer1.jpg',
            'src/assets/summer2.jpg',
            'src/assets/summer3.jpg',
            'src/assets/autumn1.jpg',
            'src/assets/autumn2.jpg',
            'src/assets/autumn3.jpg',
          ];
        
        for (var pic in pictures){
            this.load.image(`${pic}`, pictures[pic]);
        };
        this.load.audio('backGM', 'src/assets/POL-go-time-short.wav');
    }

    create ()
    {
        this.buttonsound = this.sound.add("buttonSound")

        this.model = this.sys.game.globals.model;
        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('backGM', { volume: 0.5, loop: true });
          this.bgMusic.play();
          this.model.bgMusicPlaying = true;
          this.sys.game.globals.bgMusic = this.bgMusic;
        };
        
        let _this = this
        this.input.on("pointerdown", function () {
            if (_this.model.soundOn === true ) {
                this.sound.play('buttonSound')}
            this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
      this.cache.audio.remove('slide-snd');
            this.scene.start('title');
          }.bind(this));

          
        var pictures = [];

        for ( var pic=0; pic < 12; pic++) {
            let picture = this.add.image(50, 50, `${pic}`).setAlpha(0).setInteractive({ useHandCursor: true});
        pictures.push(picture);
        };

        var timeline = this.tweens.createTimeline();

    timeline.add({
        targets: pictures[0],
        x: 600,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[1],
        y: 500,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[2],
        x: 100,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[3],
        y: 100,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[4],
        x: 600,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[5],
        y: 500,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[6],
        x: 100,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[7],
        y: 100,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[8],
        y: 100,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[9],
        x: 600,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[10],
        y: 500,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });

    timeline.add({
        targets: pictures[11],
        x: 100,
        ease: 'Power1',
        alpha: 1,
        duration: 3000
    });
    
    timeline.play();

    console.log(timeline);
    }
}

