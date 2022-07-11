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
        this.load.image('star', 'src/assets/ui/star.png');
        
    }
    create(){
        this.add.image(400, 300, "background");

        this.add.text(config.width / 2, 20, "Play level " + this.level.toString(), {
            font: "32px Arial",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.failLevel = this.add.sprite(700, 500, 'blueButton').
    setScale(0.5)
    .setInteractive({ useHandCursor: true }).on('pointerover', () => this.failLevel.setTint(0xFFE888).setScale(0.55) )
    .on('pointerout', () => this.failLevel.clearTint().setScale(0.5) );
    

    this.failLevel.on('pointerdown', function (pointer) {
        this.scene.start("PlayGame");
    }.bind(this));
    var star = this.add.image(0, 0, 'star');
    var star1 = this.add.image(0,0, 'star');
    var star2 = this.add.image(50,0, 'star');
    var star3 = this.add.image(0, 0, 'star');
    var star4 = this.add.image(50,0, 'star');
    var star5 = this.add.image(100,0, 'star');

        var oneStarLevel = this.add.text(-150, -10, "Get ", {  fontFamily: 'cursive', fontSize: '58px', color: "white", stroke: '#D08B8B', strokeThickness: 5,
        shadow: { color: '#A98E8E', fill: true, offsetX: -5, offsetY: -5, blur: 1 }})
        var container = this.add.container(400, 150, [ star, oneStarLevel ]);
        container.setSize(star.width, star.height);


        container.setInteractive({ useHandCursor: true }).on('pointerover', () => {star.setTint(0xFFE888).setScale(1.3); oneStarLevel.setScale(1.3) })
        .on('pointerout', () => { star.clearTint().setScale(1); oneStarLevel.setScale(1) });
        container.on("pointerdown", function(){
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 3,
                starCount: 1
            });
                       
        }, this);
        
        var twoStarLevel = this.add.text(-150, -10, "Get ", {  fontFamily: 'cursive', fontSize: '58px', color: "white", stroke: '#D08B8B', strokeThickness: 5,
        shadow: { color: '#A98E8E', fill: true, offsetX: -5, offsetY: -5, blur: 1 }})
        var container2 = this.add.container(400, 300, [ star1, star2, twoStarLevel ]);
        container2.setSize(star1.width, star1.height);


        container2.setInteractive({ useHandCursor: true }).on('pointerover', () => {star2.setTint(0xFFE888).setScale(1.3);star1.setTint(0xFFE888).setScale(1.3); twoStarLevel.setScale(1.3) })
        .on('pointerout', () => { star1.clearTint().setScale(1);star2.clearTint().setScale(1); twoStarLevel.setScale(1) });
        container2.on("pointerdown", function(){
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 4,
                starCount: 2
            });
                       
        }, this);
        
        var threeStarLevel = this.add.text(-150, -10, "Get ", {  fontFamily: 'cursive', fontSize: '58px', color: "white", stroke: '#D08B8B', strokeThickness: 5,
        shadow: { color: '#A98E8E', fill: true, offsetX: -5, offsetY: -5, blur: 1 }})
        var container3 = this.add.container(400, 450, [ star3, star4, star5, threeStarLevel ]);
        container3.setSize(star1.width, star1.height);


        container3.setInteractive({ useHandCursor: true }).on('pointerover', () => {star3.setTint(0xFFE888).setScale(1.3);star4.setTint(0xFFE888).setScale(1.3);star5.setTint(0xFFE888).setScale(1.3); threeStarLevel.setScale(1.3) })
        .on('pointerout', () => { star3.clearTint().setScale(1);star4.clearTint().setScale(1); star5.clearTint().setScale(1);threeStarLevel.setScale(1) });
        container3.on("pointerdown", function(){
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
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