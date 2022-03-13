
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
    
    
};

export default playGame;