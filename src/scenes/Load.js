class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload()
    {

        //loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, game.config.height - 20, game.config.width * value, 10);
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // set load path
        this.load.path = './assets/'

        // this.load.path = './assets/img/'
        // this.load.path = './assets/sounds/'

        // image asset loading; Note: Title is unfinished and Tutorial is temp, will complete and add later
        this.load.image('title', 'TitleScreen.png')
        this.load.image('tempTutorial', 'TempTutorial.png')
        this.load.image('field', 'SoccerField.png')
        this.load.image('goal', 'Goal.png')
        this.load.image('post', 'Post.png')
        this.load.image('kBox', 'KBox.png')
        this.load.image('ball', 'SoccerBall.png')
        this.load.image('bayern', 'Bayern.png')
        this.load.image('madrid', 'Madrid.png')

        // audio loading; Note: volume in scenes need tweaking, will do later; also, a couple are probably temp depending on time
        this.load.audio('titleMusic', 'TitleMusic.mp3')
        this.load.audio('kickoffWhistle', 'KickoffWhistle.wav')
        this.load.audio('ambiance', 'StadiumAmbiance.wav')
        this.load.audio('kick', 'BallKick.wav')
        this.load.audio('scored', 'Goal.wav')
    }

    create()
    {
        this.scene.start("menuScene");
    }
}