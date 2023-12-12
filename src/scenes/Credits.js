class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create()
    {
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'tempTutorial');
    }
}