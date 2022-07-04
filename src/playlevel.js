import { config } from "./config";
export default class playLevel extends Phaser.Scene{
    constructor(){
        super("PlayLevel");
    }
    init(data){
        this.level = data.level;
        this.stars = data.stars;
    };
    preload(){
        this.load.image('blueButton', 'src/assets/ui/Button_62.png');
        
    }
    create(){
        this.add.image(400, 300, "background");

        this.add.text(config.width / 2, 20, "Play level " + this.level.toString(), {
            font: "32px Arial",
            color: "#ffffff"
        }).setOrigin(0.5);
        
        this.failLevel = this.add.sprite(400, 500, 'blueButton').
    setScale(0.5)
    .setInteractive({ useHandCursor: true });
    

    this.failLevel.on('pointerdown', function (pointer) {
        this.scene.start("PlayGame");
    }.bind(this));
        
        var oneStarLevel = this.add.text(20, 160, "Get 1 star", {
            font: "48px Arial",
            color: "#ff8800"
        });
        oneStarLevel.setInteractive();
        oneStarLevel.on("pointerdown", function(){
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 3,
                starCount: 1
            });
                       
        }, this);
        var twoStarsLevel = this.add.text(20, 260, "Get 2 stars", {
            font: "48px Arial",
            color: "#ffff00"
        });
        twoStarsLevel.setInteractive();
        twoStarsLevel.on("pointerdown", function(){
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 4,
                starCount: 2
            });
            
        }, this);
        var threeStarsLevel = this.add.text(20, 360, "Get 3 stars", {
            font: "48px Arial",
            color: "#00ff00"
        });
        threeStarsLevel.setInteractive();
        threeStarsLevel.on("pointerdown", function(){
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 5,
                starCount: 3
            });
            
        }, this);

        this.model = this.sys.game.globals.model;

    }
}