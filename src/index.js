import Phaser from 'phaser';
import { config } from './config';
var game = new Phaser.Game(config);
import titleScene from './titleScene';
import OptionsScene from '../src/OptionsScene';
import Model from './Model';
import Ending from './ending';
import CreditsScene from './credits';
import playGame from './playGame';
import playLevel from './playlevel';


import gameScene from './gameScene';

// Our game Object

const model = new Model();
game.globals = { model, bgMusic : null};

// Our scenes














// Add both scenes (it does not start them)
game.scene.add('title', titleScene);
game.scene.add('PlayGame', playGame);
game.scene.add('PlayLevel', playLevel);
game.scene.add("GameScene", gameScene);
game.scene.add("Options", OptionsScene);
game.scene.add("Credits", CreditsScene);
game.scene.add("ending", Ending);

// Start the title scene
game.scene.start('title');
