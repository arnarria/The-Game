/*
For the five major Phaser components, I have a physics system, text objects, and a timer.
*/
'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Menu, Credits, Tutorial, Play, Lose ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config