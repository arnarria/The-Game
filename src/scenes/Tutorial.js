class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    create() {
        
        // create title screen image
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'tutorial');

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // add tutorial screen music
        this.tutorialSong = this.sound.add('tutorialMusic', { volume: 0.35 })
        this.tutorialSong.loop = true;
        this.tutorialSong.play();

        // add kickoff whistle
        this.kickoff = this.sound.add('kickoffWhistle')
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyE)) 
        {
            this.tutorialSong.stop();
            this.kickoff.play();
            this.scene.start('playScene');
        }
    }
}