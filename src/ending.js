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
        var pictures = [];

        for ( var pic=0; pic < 12; pic++) {
            let picture = this.add.image(50, 50, `${pic}`).setAlpha(0);
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

