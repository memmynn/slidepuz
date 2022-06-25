// We no longer add the scene to the config
export const config = {
    title: 'Sliding Puzzly',
     type: Phaser.AUTO,
     width: 800,
     height: 600,
    backgroundColor: "#F5F5DC",
     scale: {  //the scale configuration can make a canvas responsive, though you don't need to include one
         mode: Phaser.Scale.FIT, //Scale.FIT adjusts the canvas to fit inside it's parent while maintaining its aspect ratio
         autoCenter: Phaser.Scale.CENTER_BOTH,
      },
     optionKey: ""
 };
 