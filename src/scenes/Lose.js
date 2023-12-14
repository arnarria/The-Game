class Lose extends Phaser.Scene {
    constructor() {
        super('loseScene')
    }

    create()
    {
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'lost');
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) 
        {
            this.game.sound.stopAll();
            this.scene.start('menuScene');
        } else if(Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.game.sound.stopAll();
            this.scene.start('playScene');
        }
    }
}