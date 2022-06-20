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
        }
    }

    create ()
    {
        for(var pic=0; pic < 12; pic++) {pic = this.add.image(900, 300, `${pic}`)
        this.tweens.add({
            targets: pic,
            x: 100,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });

        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(6000);
        });

        this.cameras.main.fadeIn(6000);
    }

        
    }
}

