import { config } from "./config";
var gameOptions = {
   colors: ["0xffffff"],
   columns: 3,
   rows: 4,
   thumbWidth: config.width/9,
   thumbHeight: config.height/7,
   spacing: config.width/20,
   localStorageName: "levelselect"
}

export default class gameScene extends Phaser.Scene{
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
         'src/assets/bicycle.jpg',
         'src/assets/summer1.jpg',
         'src/assets/summer2.jpg',
         'src/assets/summer3.jpg',
         'src/assets/autumn1.jpg',
         'src/assets/autumn2.jpg',
         'src/assets/autumn3.jpg',
       ];
       const slideSounds = [
        'src/assets/dragslide.mp3',
        'src/assets/dragslide.mp3',
        'src/assets/dragslide.mp3',
        'src/assets/grass.mp3',
        'src/assets/grass.mp3',
        'src/assets/grass.mp3',
        'src/assets/water.wav',
        'src/assets/water.wav',
        'src/assets/water.wav',
        'src/assets/leaves-14478.mp3',
        'src/assets/leaves-14478.mp3',
        'src/assets/leaves-14478.mp3',
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
           let barX = (config.width - barWidth) * 0.5;
           let barY = (config.height - barHeight) * 0.5;
       
           //Draw the outline for our loading bar and fill it in
           progress.strokeRect(barX, barY, barWidth, barHeight);
           progress.fillRect(barX + barMargin + lineWidth * 0.5, barY + barMargin + lineWidth * 0.5, percent * (barWidth - lineWidth - barMargin * 2), barHeight - lineWidth - barMargin * 2);
        });
       
        this.load.on('complete', function () {
           progress.destroy();
        });
       
        //load in the complete puzzle image
        this.load.image('puzzle_bg', pictures[this.level]);
        this.load.image('puzzle_bg1', pictures[this.level]);

        this.load.image('background', 'src/assets/ui/BG.png');
        
        //load in the slide sound effect, the background music, and the win sound
        this.load.audio('snowfall-bgm', 'src/assets/snowfall.mp3');
        this.load.audio('slide-snd', slideSounds[this.level]);
        this.load.audio('noot-snd', 'src/assets/noot.mp3');
        this.load.image('blueButton', 'src/assets/ui/Button_62.png');
        this.load.image('blueButton3', 'src/assets/ui/Button_13.png');
        this.load.image('optionsButton', 'src/assets/ui/Button_29.png');
        this.load.image('Button_15', 'src/assets/ui/Button_15.png');
        

       
    };
    
    create () {
        this.add.image(400, 300, "background");

        let tileWidth, halfWidth;  //the width of each tile in pixels (and half that, since the origin of each tile is the centerpoint)

    let gridSize = this.difficuty;          //the number of rows and columns in our puzzle (this global should be set in the HTML, but in case it's not...)
    let grid = [];              //an array which holds the rows of tiles in our puzzle
       
    var _this = this;

    
    
    let puzzleTex, imge;
        puzzleTex = this.textures.get('puzzle_bg');
      let puzzleScale;
      puzzleScale = (config.width * 0.75) / puzzleTex.source[0].width;
      
     let frameWidth;
      frameWidth = puzzleTex.source[0].width / gridSize;
   
      tileWidth = (config.width * 0.75) / gridSize;
      halfWidth = tileWidth * 0.5;

      this.returne = this.add.sprite(config.width * 0.88, config.height * 0.1, 'blueButton').
    setScale(0.5)
    .setInteractive({ useHandCursor: true });
    

    this.returne.on('pointerdown', function (pointer) {
      puzzleTex.destroy();
      this.textures.remove('puzzle_bg1');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
      this.cache.audio.remove('slide-snd');
        this.scene.start("PlayGame");
    }.bind(this));

    this.optionButton = this.add.sprite(config.width * 0.88, config.height * 0.30, 'optionsButton').
    setScale(0.5).
    setInteractive({ useHandCursor: true });
    
    this.optionButton.on('pointerdown', function (pointer) {
        this.game.config.optionKey = this.scene.key;
      this.scene.switch('Options');
    }.bind(this));
   

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
      this.noot = this.sound.add('noot-snd', { volume: 0.5 });
   
      //play the background music, and begin listening for clicks/taps on game objects
      this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
    this.bgMusic = this.sound.add('snowfall-bgm', { volume: 0.3, loop: true });
  this.bgMusic.play();
  this.model.bgMusicPlaying = true;
  this.sys.game.globals.bgMusic = this.bgMusic;
};
 imge = _this.add.image(0, 0, 'puzzle_bg1').setOrigin(0,0);
        imge.alpha = 0;
        imge.setDisplaySize(_this.sys.canvas.width/1.33, _this.sys.canvas.height);

        

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
             
             
  
        _this.tweens.add({
            targets: imge,
            duration: 2000,
            alpha: 1
        });

  
 _this.input.off('gameobjectdown');
            
               //if we've made it this far the game has been won!
               setTimeout(won, 3000);
               function won() {
                  
                  
               
              
               if(this.bgMusic){
               this.bgMusic.stop()};
               if( !_this.noot.isPlaying && _this.model.soundOn === true ){
                
                _this.noot.play();
               };
               if( _this.starCount === 3) {
                _this.stars[_this.level] = 3;
                 } else {_this.stars[_this.level] = Math.max(_this.stars[_this.level], _this.starCount);}
                 
                 if(_this.stars[_this.level + 1] != undefined && _this.stars[_this.level + 1] == -1){
                    _this.stars[_this.level + 1] = 0;
                     }
                 localStorage.setItem(gameOptions.localStorageName, _this.stars.toString());

                _this.winButton = _this.add.sprite(330, 395, 'Button_15').setInteractive();
                _this.winText = _this.add.text(0, 0, 'WELL DONE!', {fontFamily: 'cursive', fontSize: '60px', fill: 'white' });
                Phaser.Display.Align.In.Center(_this.winText, _this.winButton);
                if(_this.level<11){
                  _this.nextButton = _this.add.sprite(330, 85, 'Button_15').setInteractive();
                  _this.nextText = _this.add.text(0, 0, 'NEXT LEVEL', {fontFamily: 'cursive', fontSize: '60px', fill: 'white' });
                  _this.nextButton.on("pointerdown", function(){
                    
                    puzzleTex.destroy();
                    _this.sys.game.globals.bgMusic.stop();
                    _this.model.bgMusicPlaying = false;
                    _this.cache.audio.remove('slide-snd');
                    
                        _this.scene.start("GameScene", {
                        level: _this.level+1,
                        stars: _this.stars,
                        difficuty: _this.difficuty,
                        starCount: _this.starCount
                    }); 
                        

                
                }, _this);
                
    
    Phaser.Display.Align.In.Center(_this.nextText, _this.nextButton);

} else {_this.scene.start('ending')}};
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
            if (_this.model.soundOn === true ) {
                tile.scene.sound.play('slide-snd');
            }
         };
    
         var r3 = this.add.rectangle((config.width * 0.75)/2, (config.width * 0.75)/2, config.width * 0.76 , config.width * 0.76);

         r3.setStrokeStyle(12, 0x1a65ac);
   
    }
    
};