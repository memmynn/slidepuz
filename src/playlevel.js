class playLevel extends Phaser.Scene{
    constructor(){
        super("PlayLevel");
    }
    init(data){
        this.level = data.level;
        this.stars = data.stars;
    }
    
}

export default playLevel;