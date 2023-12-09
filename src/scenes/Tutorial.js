class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    create() {

        // this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        // this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        
        // create title screen image
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'tempTutorial');

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // this.scene.start('title')

        // add title screen music
        // this.titleSong = this.sound.add('titleMusic')
        // this.titleSong.loop = true;
        // this.titleSong.play();

        // add kickoff whistle
        this.kickoff = this.sound.add('kickoffWhistle')
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyE)) 
        {
            // this.titleSong.stop();
            this.kickoff.play();
            this.scene.start('playScene');
        }

        /* if(Phaser.Input.Keyboard.JustDown(this.keyT)) 
        {
            this.titleSong.stop();
            this.scene.start('playScene');
        } */
    }
}