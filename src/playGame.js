var gameOptions = {
    colors: ["0xffffff"],
    columns: 3,
    rows: 4,
    thumbWidth: config.width/9,
    thumbHeight: config.height/7,
    spacing: config.width/20,
    localStorageName: "levelselect"
 };

 import { config } from "./config";
export default class playGame extends Phaser.Scene{
    constructor(){ 
        super("PlayGame");
    }
    preload(){
        this.load.spritesheet("levelthumb", "src/assets/levelthumb.png", {
            frameWidth: 60,
            frameHeight: 60
        });
        this.load.image("levelpages", "src/assets/levelpages.png");
        this.load.image("transp", "src/assets/transp.png");
        this.load.audio('bgMusic', ['src/assets/TownTheme.mp3']);
        this.load.image('background', 'src/assets/ui/BG.png');
        this.load.image('blueButton', 'src/assets/ui/Button_62.png');



    }
    create(){
        this.add.image(400, 300, "background");

        let _this = this;
        
        this.stars = [];
        this.stars[0] = 0;
        this.canMove = true;
        this.itemGroup = this.add.group();
        for(var l = 1; l < gameOptions.columns * gameOptions.rows * gameOptions.colors.length; l++){
            this.stars[l] = -1;
        }
        this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? this.stars.toString() : localStorage.getItem(gameOptions.localStorageName);
        this.stars = this.savedData.split(",");
        this.pageText = this.add.text(config.width / 2, 16, "", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.pageText.setOrigin(0.5);
        this.scrollingMap = this.add.tileSprite(0, 0, gameOptions.colors.length * config.width, config.height, "transp");
        this.scrollingMap.setInteractive();
        this.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0, 0);
        this.currentPage = 0;
        this.pageSelectors = [];
        var rowLength = gameOptions.thumbWidth * gameOptions.columns + gameOptions.spacing * (gameOptions.columns - 1);
        var leftMargin = (config.width - rowLength) / 2 + gameOptions.thumbWidth / 2;
        var colHeight = gameOptions.thumbHeight * gameOptions.rows + gameOptions.spacing * (gameOptions.rows - 1);
        var topMargin = (config.height - colHeight) / 2 + gameOptions.thumbHeight / 2;
        for(var k = 0; k < gameOptions.colors.length; k++){
            for(var i = 0; i < gameOptions.columns; i++){
                for(var j = 0; j < gameOptions.rows; j++){
                    var thumb = this.add.image(k * config.width + leftMargin + i * (gameOptions.thumbWidth + gameOptions.spacing), topMargin + j * (gameOptions.thumbHeight + gameOptions.spacing), "levelthumb");
                    thumb.setTint(gameOptions.colors[k]);
                    thumb.levelNumber = k * (gameOptions.rows * gameOptions.columns) + j * gameOptions.columns + i;
                    thumb.setFrame(parseInt(this.stars[thumb.levelNumber]) + 1);
                    
                    this.itemGroup.add(thumb);
                    var levelText = this.add.text(thumb.x, thumb.y - 12, thumb.levelNumber, {
                        font: "24px Arial",
                        fill: "#FFFFFF"
                    });
                    levelText.setOrigin(0.5);
                    this.itemGroup.add(levelText);
                }
            }
            this.pageSelectors[k] = this.add.sprite(config.width / 2 + (k - Math.floor(gameOptions.colors.length / 2) + 0.5 * (1 - gameOptions.colors.length % 2)) * 40, config.height - 40, "levelpages");
            this.pageSelectors[k].setInteractive();
            this.pageSelectors[k].on("pointerdown", function(){
                if(this.scene.canMove){
                    var difference = this.pageIndex - this.scene.currentPage;
                    this.scene.changePage(difference);
                    this.scene.canMove = false;
                }
            });
            this.pageSelectors[k].pageIndex = k;
            this.pageSelectors[k].tint = gameOptions.colors[k];
            if(k == this.currentPage){
                this.pageSelectors[k].scaleY = 1;
            }
            else{
                this.pageSelectors[k].scaleY = 0.5;
            }
        };

        
        /*this.input.on("pointermove", function(pointer, gameObject){
            gameObject.startPosition = gameObject.x;
            gameObject.currentPosition = gameObject.x;
        });
       /* this.input.on("pointerover", function(pointer, gameObject, dragX, dragY){
            if(dragX <= 10 && dragX >= -gameObject.width + config.width - 10){
                gameObject.x = dragX;
                var delta = gameObject.x - gameObject.currentPosition;
                gameObject.currentPosition = dragX;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            }
        }, this);*/
        this.itemGroup.children.iterate(function(item) {
            if(item.texture.key == "levelthumb"){
                //var boundingBox = item.getBounds();
                item.setInteractive({useHandCursor:true})
                item.on('pointerdown', 
                function (pointer) {
                    if( item.frame.name > 0){
                    _this.scene.start("PlayLevel", {
                    level: item.levelNumber,
                    stars: _this.stars
                })}
            },this)
        }});
        
        
        
       

        /*this.input.on("pointerover", function(pointer, gameObject){
            this.canMove = false;
            //var delta = gameObject.startPosition - gameObject.x;
            //if(delta == 0){
                this.canMove = true;
                this.itemGroup.children.iterate(function(item){
                    if(item.texture.key == "levelthumb"){
                        var boundingBox = item.getBounds();
                        
                        if(Phaser.Geom.Rectangle.Contains(boundingBox, pointer.x, pointer.y) && item.frame.name > 0){
                            _this.scene.start("PlayLevel", {
                                level: item.levelNumber,
                                stars: _this.stars
                            });
                        }
                    }
                }, this);
            }, this);

        /*this.input.on("pointerdown", function(pointer, gameObject){
            this.canMove = false;
            //var delta = gameObject.startPosition - gameObject.x;
            //if(delta == 0){
                this.canMove = true;
                this.itemGroup.children.iterate(function(item){
                    if(item.texture.key == "levelthumb"){
                        var boundingBox = item.getBounds();
                        
                        if(Phaser.Geom.Rectangle.Contains(boundingBox, pointer.x, pointer.y) && item.frame.name > 0){
                            this.scene.start("PlayLevel", {
                                level: item.levelNumber,
                                stars: this.stars
                            });
                        }
                    }
                }, this);
            }
           /*if(delta > config.width / 8){
                this.changePage(1);
            }
            else{
                if(delta < -config.width / 8){
                    this.changePage(-1);
                }
                else{
                    this.changePage(0);
                }
            }
        }, this);*/
        this.return = this.add.sprite(400, 500, 'blueButton').
        setScale(0.5)
        .setInteractive({ useHandCursor: true });
        
    
        this.return.on('pointerdown', function (pointer) {
            this.scene.start("title");
        }.bind(this));
        
    
    
    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
        this.bgMusic.play();
        this.model.bgMusicPlaying = true;
        this.sys.game.globals.bgMusic = this.bgMusic;
      }

    
    }
    changePage(page){
        this.currentPage += page;
        for(var k = 0; k < gameOptions.colors.length; k++){
            if(k == this.currentPage){
                this.pageSelectors[k].scaleY = 1;
            }
            else{
                this.pageSelectors[k].scaleY = 0.5;
            }
        }
        this.pageText.text = "";
        var currentPosition = this.scrollingMap.x;
        this.tweens.add({
            targets: this.scrollingMap,
            x: this.currentPage * -config.width,
            duration: 300,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onUpdate: function(tween, target){
                var delta = target.x - currentPosition;
                currentPosition = target.x;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            },
            onComplete: function(){
                this.canMove = true;
            }
        });
    }
};