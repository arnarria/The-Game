class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create()
    {
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'Bellingol');
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) 
        {
            this.game.sound.stopAll();
            this.scene.start('menuScene');
        }
    }
}