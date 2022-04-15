import Phaser from 'phaser';
import OptionsScene from '../src/OptionsScene';

//import logoImg from './assets/logo.png';
document.body.style.backgroundColor = "black";

var titleScene = new Phaser.Scene("title");

var gameOptions = {
   colors: ["0xffffff"],
   columns: 3,
   rows: 4,
   thumbWidth: 60,
   thumbHeight: 60,
   spacing: 20,
   localStorageName: "levelselect"
}
// We no longer add the scene to the config
var config = {
   title: 'Sliding Puzzly',
	type: Phaser.AUTO,
	width: 800,
	height: 600,
   backgroundColor: "#F5F5DC",
    scale: {  //the scale configuration can make a canvas responsive, though you don't need to include one
        mode: Phaser.Scale.FIT, //Scale.FIT adjusts the canvas to fit inside it's parent while maintaining its aspect ratio
        autoCenter: Phaser.Scale.CENTER_BOTH,
     },
};

// Our game Object
var game = new Phaser.Game(config);

// Our scenes
class gameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(data){
        this.level = data.level;
        this.stars = data.stars;
        this.difficuty = data.difficuty;
        this.starCount = data.starCount;
    }
    preload () {
       //level sliding puzzle picture array
       const pictures = [
         'src/assets/pingu-puzzle.png',
         'src/assets/karinna-hotel-uludag-genel_86791.jpg',
         'src/assets/white-Snowhotel-Norway-Ski-Shop-Log-Cabin-Kirkenes-2144793.jpg',
         'src/assets/grass.jpg',
         'src/assets/flowers.jpg',
         'src/assets/bicycle.jpg'
       ];
       const slideSounds = [
        'src/assets/dragslide.mp3',
        'src/assets/dragslide.mp3',
        'src/assets/dragslide.mp3',
        'src/assets/grass.mp3',
        'src/assets/grass.mp3',
        'src/assets/grass.mp3',


       ]
        //set up a small pre-loader progress bar using Phaser's built-in loader plugin
        var progress = this.add.graphics();
       
        this.load.on('progress', function (percent) {
           //Style our loading bar outline and fill
           let lineWidth = 4;
           let lineColor = 0x009FDA;
           let barColor = 0xffffff;
       
           progress.clear();
           progress.lineStyle(lineWidth, lineColor) //Pingu's English blue!
           progress.fillStyle(barColor);
       
           //Set up the dimensions of our bar (this could be loaded from json or something)
           let barWidth = 500;
           let barHeight = 25;
           let barMargin = 2;
           let barX = (game.canvas.width - barWidth) * 0.5;
           let barY = (game.canvas.height - barHeight) * 0.5;
       
           //Draw the outline for our loading bar and fill it in
           progress.strokeRect(barX, barY, barWidth, barHeight);
           progress.fillRect(barX + barMargin + lineWidth * 0.5, barY + barMargin + lineWidth * 0.5, percent * (barWidth - lineWidth - barMargin * 2), barHeight - lineWidth - barMargin * 2);
        });
       
        this.load.on('complete', function () {
           progress.destroy();
        });
       
        //load in the complete puzzle image
        this.load.image('puzzle_bg', pictures[this.level]);
       
        
        //load in the slide sound effect, the background music, and the win sound
        this.load.audio('snowfall-bgm', 'src/assets/snowfall.mp3');
        this.load.audio('slide-snd', slideSounds[this.level]);
        this.load.audio('noot-snd', 'src/assets/noot.mp3');
        

       
    };
    
    create () {let tileWidth, halfWidth;  //the width of each tile in pixels (and half that, since the origin of each tile is the centerpoint)

    let gridSize = this.difficuty;          //the number of rows and columns in our puzzle (this global should be set in the HTML, but in case it's not...)
    let grid = [];              //an array which holds the rows of tiles in our puzzle
       
    var _this = this;

    
    
    let puzzleTex;
        puzzleTex = this.textures.get('puzzle_bg');
      let puzzleScale;
      puzzleScale = (game.canvas.width * 0.75) / puzzleTex.source[0].width;
      
     let frameWidth;
      frameWidth = puzzleTex.source[0].width / gridSize;
   
      tileWidth = (game.canvas.width * 0.75) / gridSize;
      halfWidth = tileWidth * 0.5;
   var returne = this.add.text(game.canvas.width * 0.78, game.canvas.height * 0.1, "Return back", {
            font: "30px Arial",
            color: "#ff0000"
        });
        returne.setInteractive();
        returne.on("pointerdown", function(){
            puzzleTex.destroy();
            this.sound.removeAll()
            this.cache.audio.remove('slide-snd');

        this.scene.start("PlayGame");
        }, this);

              //store a list of shuffled tile numbers
      var tileFrames = shuffleGrid();
      
      //this could have be done automatically by loading the image as a spritesheet, but doing it manually allows us to accept different sized images
      for (let i = 0; i < gridSize; ++i) {
         for (let j = 0; j < gridSize; ++j) {
            //calling "add" on a texture adds frames to that texture
            //args: frame ID, texture source index, frame x pos, frame y pos, frame width, frame height
            puzzleTex.add(i * gridSize + j, 0, j * frameWidth, i * frameWidth, frameWidth, frameWidth);
         }
      }
   

   //add frames to the puzzle image representing the tiles
       //calculate the width of a puzzle tile based on the size of the puzzle image, the canvas, and the grid
       for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
           if (i > 0 || j < gridSize - 1) { //leave a blank space in the top-right of the grid
              //calling "add.<type>" in a scene adds a game object of that type to the scene
              //args: x position, y position, texture key, and the frame we want the image to display
              let tile = this.add.image(j * tileWidth + halfWidth, i * tileWidth + halfWidth, 'puzzle_bg', tileFrames.pop());
              tile.row = i;
              tile.col = j;
  
              //scale the image and tell it to receive input events
              tile.setScale(puzzleScale);
              tile.setInteractive();
  
              row.push(tile);
           } else {
              row.push(null);
           }
        }
        grid.push(row);
     };
      //create the puzzle tiles — each tile has an image game object, and a row and column
      
      //store references to the background music and noot sounds in the scene
      let bgm = this.sound.add('snowfall-bgm', { volume: 0.3, loop: true });
      this.noot = this.sound.add('noot-snd', { volume: 0.5 });
   
      //play the background music, and begin listening for clicks/taps on game objects
      bgm.play();
      this.input.on('gameobjectdown', tileClicked);

      function shuffleGrid() {
        //create an array of tile numbers based on the grid size
        var tileNumbers = Phaser.Utils.Array.NumberArray(0, gridSize * gridSize - 1); //Returns an array containing numbers in a range (inclusive)
        Phaser.Utils.Array.Remove(tileNumbers, gridSize - 1); //Remove a frame for the blank space in the top-right
        Phaser.Utils.Array.Shuffle(tileNumbers); //Phaser has a built-in Fisher–Yates shuffle
     
        //to determine solvability, we need to calculate the number of "inversions" in our shuffle
        //see: https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
        var inversions = 0;
        for (let i = 0; i < tileNumbers.length - 1; ++i) {
           for (let j = i + 1; j < tileNumbers.length; ++j) {
              if (tileNumbers[i] > tileNumbers[j]) {
                 ++inversions;
              }
           }
        }
     
        //if the gridsize is odd, an even number of inversions means the puzzle is solvable
        //if the gridsize is even, an odd number of inversions means the puzzle is solvable
        let solvable = gridSize % 2 ^ inversions % 2;
     
        //if the puzzle isn't solvable, swap the two lowest tile numbers (0 and 1)
        if (!solvable) {
           Phaser.Utils.Array.Swap(tileNumbers, 0, 1);
        }
     
        return tileNumbers;
        };

        function tileClicked(pointer, tile) {
            //check for a blank space above
            if (tile.row > 0 &&
               !grid[tile.row - 1][tile.col]) {
               slideTile(tile, tile.row - 1, tile.col);
            }
            //...and below
            else if (tile.row < gridSize - 1 &&
               !grid[tile.row + 1][tile.col]) {
               slideTile(tile, tile.row + 1, tile.col);
            }
            //...and left
            else if (tile.col > 0 &&
               !grid[tile.row][tile.col - 1]) {
               slideTile(tile, tile.row, tile.col - 1);
            }
            //...and right
            else if (tile.col < gridSize - 1 &&
               !grid[tile.row][tile.col + 1]) {
               slideTile(tile, tile.row, tile.col + 1);
            }
         };
         
         function checkWin() {
            //starting from the top-left of the grid...
            for (let i = 0; i < gridSize; ++i) {
               for (let j = 0; j < gridSize; ++j) {
                  //...if we're not on the empty space, and the tile isn't displaying the expected frame, stop checking
                  if (grid[i][j] != null && grid[i][j].frame.name != gridSize * i + j) {
                     return;
                  }
               }
             }
             
               //if we've made it this far the game has been won!
               _this.input.off('gameobjectdown');
               bgm.stop();
               if( !_this.noot.isPlaying ){
                _this.noot.play();
               };
               if( _this.starCount === 3) {
                _this.stars[_this.level] = 3;
                 } else {_this.stars[_this.level] = Math.max(_this.stars[_this.level], _this.starCount);}
                 
                 if(_this.stars[_this.level + 1] != undefined && _this.stars[_this.level + 1] == -1){
                    _this.stars[_this.level + 1] = 0;
                     }
                 localStorage.setItem(gameOptions.localStorageName, _this.stars.toString());
         
         };
        
         function slideTile(tile, newRow, newCol) {
            //tween the tile into the blank space
            tile.scene.tweens.add({
               targets: tile,
               duration: 600,
               ease: 'Cubic.easeInOut',
               x: newCol * tileWidth + halfWidth,
               y: newRow * tileWidth + halfWidth,
               onComplete: checkWin, //when the tween completes, check to see if the player has won
               onCompleteScope: tile.scene //allows me to access the current scene from 'this' in the onComplete function
            });
         
            //swap the tile into the blank grid space, and update its row/column
            grid[newRow][newCol] = tile;
            grid[tile.row][tile.col] = null;
            tile.row = newRow;
            tile.col = newCol;
         
            //play the tile slide sound
            tile.scene.sound.play('slide-snd');
         };
    
         var r3 = this.add.rectangle((game.canvas.width * 0.75)/2, (game.canvas.width * 0.75)/2, game.canvas.width * 0.76 , game.canvas.width * 0.76);

         r3.setStrokeStyle(12, 0x1a65ac);
   
    }
    
};

class playGame extends Phaser.Scene{
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
    }
    create(){let _this = this;
        
        this.stars = [];
        this.stars[0] = 0;
        this.canMove = true;
        this.itemGroup = this.add.group();
        for(var l = 1; l < gameOptions.columns * gameOptions.rows * gameOptions.colors.length; l++){
            this.stars[l] = -1;
        }
        this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? this.stars.toString() : localStorage.getItem(gameOptions.localStorageName);
        this.stars = this.savedData.split(",");
        this.pageText = this.add.text(game.config.width / 2, 16, "Swipe to select level page (1 / " + gameOptions.colors.length + ")", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.pageText.setOrigin(0.5);
        this.scrollingMap = this.add.tileSprite(0, 0, gameOptions.colors.length * game.config.width, game.config.height, "transp");
        this.scrollingMap.setInteractive();
        this.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0, 0);
        this.currentPage = 0;
        this.pageSelectors = [];
        var rowLength = gameOptions.thumbWidth * gameOptions.columns + gameOptions.spacing * (gameOptions.columns - 1);
        var leftMargin = (game.config.width - rowLength) / 2 + gameOptions.thumbWidth / 2;
        var colHeight = gameOptions.thumbHeight * gameOptions.rows + gameOptions.spacing * (gameOptions.rows - 1);
        var topMargin = (game.config.height - colHeight) / 2 + gameOptions.thumbHeight / 2;
        for(var k = 0; k < gameOptions.colors.length; k++){
            for(var i = 0; i < gameOptions.columns; i++){
                for(var j = 0; j < gameOptions.rows; j++){
                    var thumb = this.add.image(k * game.config.width + leftMargin + i * (gameOptions.thumbWidth + gameOptions.spacing), topMargin + j * (gameOptions.thumbHeight + gameOptions.spacing), "levelthumb");
                    thumb.setTint(gameOptions.colors[k]);
                    thumb.levelNumber = k * (gameOptions.rows * gameOptions.columns) + j * gameOptions.columns + i;
                    thumb.setFrame(parseInt(this.stars[thumb.levelNumber]) + 1);
                    this.itemGroup.add(thumb);
                    var levelText = this.add.text(thumb.x, thumb.y - 12, thumb.levelNumber, {
                        font: "24px Arial",
                        fill: "#000000"
                    });
                    levelText.setOrigin(0.5);
                    this.itemGroup.add(levelText);
                }
            }
            this.pageSelectors[k] = this.add.sprite(game.config.width / 2 + (k - Math.floor(gameOptions.colors.length / 2) + 0.5 * (1 - gameOptions.colors.length % 2)) * 40, game.config.height - 40, "levelpages");
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
        }
        this.input.on("dragstart", function(pointer, gameObject){
            gameObject.startPosition = gameObject.x;
            gameObject.currentPosition = gameObject.x;
        });
        this.input.on("drag", function(pointer, gameObject, dragX, dragY){
            if(dragX <= 10 && dragX >= -gameObject.width + game.config.width - 10){
                gameObject.x = dragX;
                var delta = gameObject.x - gameObject.currentPosition;
                gameObject.currentPosition = dragX;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            }
        }, this);
        this.input.on("dragend", function(pointer, gameObject){
            this.canMove = false;
            var delta = gameObject.startPosition - gameObject.x;
            if(delta == 0){
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
            if(delta > game.config.width / 8){
                this.changePage(1);
            }
            else{
                if(delta < -game.config.width / 8){
                    this.changePage(-1);
                }
                else{
                    this.changePage(0);
                }
            }
        }, this);
        var returne = this.add.text(game.canvas.width * 0.4, game.canvas.height * 0.8, "Return back", {
            font: "30px Arial",
            color: "#ff0000"
        });
        
        returne.setInteractive();
        returne.on("pointerdown", function(){
        _this.scene.start("title");
        }, this);

        this.optionButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.optionText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#000000' });
    Phaser.Display.Align.In.Center(this.optionText, this.optionButton);

    this.optionButton.on('pointerdown', function (pointer) {
      this.scene.switch('Options');
    }.bind(this));
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
        this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + gameOptions.colors.length + ")";
        var currentPosition = this.scrollingMap.x;
        this.tweens.add({
            targets: this.scrollingMap,
            x: this.currentPage * -game.config.width,
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

class playLevel extends Phaser.Scene{
    constructor(){
        super("PlayLevel");
    }
    init(data){
        this.level = data.level;
        this.stars = data.stars;
    }
    create(){
        this.add.text(game.config.width / 2, 20, "Play level " + this.level.toString(), {
            font: "32px Arial",
            color: "#ffffff"
        }).setOrigin(0.5);
        var failLevel = this.add.text(20, 60, "Return back", {
            font: "48px Arial",
            color: "#ff0000"
        });
        failLevel.setInteractive();
        failLevel.on("pointerdown", function(){
            this.scene.start("PlayGame");
        }, this);
        var oneStarLevel = this.add.text(20, 160, "Get 1 star", {
            font: "48px Arial",
            color: "#ff8800"
        });
        oneStarLevel.setInteractive();
        oneStarLevel.on("pointerdown", function(){
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
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 3,
                starCount: 2
            });
            
        }, this);
        var threeStarsLevel = this.add.text(20, 360, "Get 3 stars", {
            font: "48px Arial",
            color: "#00ff00"
        });
        threeStarsLevel.setInteractive();
        threeStarsLevel.on("pointerdown", function(){
            this.scene.start("GameScene", {
                level: this.level,
                stars: this.stars,
                difficuty: 4,
                starCount: 3
            });
            
        }, this);
    }
}


 












titleScene.preload = function() {
    this.load.image('logo', require('./assets/logo.png'));
    // load assets needed in our game
  this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
  this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
  this.load.image('phaserLogo', 'src/assets/logo.png');
  this.load.image('box', 'src/assets/ui/grey_box.png');
  this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
  this.load.audio('bgMusic', ['src/assets/TownTheme.mp3']);
};

titleScene.create = function() {
    var bg = this.add.sprite(0,0,'logo');
    bg.setOrigin(0,0);

    var text = this.add.text(350, 350, 'START!', {color: "black"});
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => clickButton());
    function clickButton() {
        titleScene.scene.start('PlayGame');
    }

    this.optionButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.optionText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#000000' });
    Phaser.Display.Align.In.Center(this.optionText, this.optionButton);

    this.optionButton.on('pointerdown', function (pointer) {
      this.scene.switch('Options');
    }.bind(this));

};






// Add both scenes (it does not start them)
game.scene.add('title', titleScene);
game.scene.add('PlayGame', playGame);
game.scene.add('PlayLevel', playLevel);
game.scene.add("GameScene", gameScene);
game.scene.add("Options", OptionsScene);
// Start the title scene
game.scene.start('title');