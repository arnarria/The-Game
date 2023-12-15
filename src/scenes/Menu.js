class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        
        // create title screen image
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'title');

        // add title screen music
        this.titleSong = this.sound.add('titleMusic', { volume: 0.75 })
        this.titleSong.loop = true;
        this.titleSong.play();

        // add kickoff whistle
        this.kickoff = this.sound.add('kickoffWhistle')

        // add sound effect for entering credits directly from the menu
        this.creditSFX = this.sound.add('bellingolCredits', { volume: 0.75 })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyE)) 
        {
            this.titleSong.stop();
            this.kickoff.play();
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyT)) 
        {
            this.titleSong.stop();
            this.scene.start('tutorialScene');
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.titleSong.stop();
            this.creditSFX.play();
            this.scene.start('creditScene');
        }
    }
}