class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    /* preload() {
        this.load.path = './assets/img/'
        this.load.image('field', 'SoccerField.png')
        this.load.image('goal', 'Goal.png')
        this.load.image('post', 'Post.png')
        this.load.image('ball', 'SoccerBall.png')
        this.load.image('bayern', 'Bayern.png')
        this.load.image('madrid', 'Madrid.png')
    } */

    create() {

        this.stadium = this.sound.add('ambiance')
        this.stadium.loop = true;
        this.stadium.play();

        this.ballKick = this.sound.add('kick')

        this.scoredGoal = this.sound.add('scored')

        // add soccer field background
        this.field = this.add.image(0, 0, 'field').setOrigin(0)

        // add opposing team goal hitbox
        this.goal = this.physics.add.sprite(width / 2, height / 40, 'goal')
        this.goal.body.setSize(this.goal.width, this.goal.height)
        this.goal.body.setImmovable(true)
        this.goal.setAlpha(0)

        // add opposing team's keeper box hitbox ---> Issue: no collision detected; will come back to this later to try to get it to work
        this.leftBox = this.physics.add.sprite(width / 3.55, height / 14, 'kBox')
        this.leftBox.body.setSize(this.leftBox.width, this.leftBox.height)
        this.leftBox.body.setImmovable(true)
        this.leftBox.setAlpha(0)

        this.rightBox = this.physics.add.sprite(462, height / 14, 'kBox')
        this.rightBox.body.setSize(this.rightBox.width, this.rightBox.height)
        this.rightBox.body.setImmovable(true)
        this.rightBox.setAlpha(0)

        // opposing keeper's box hitbox group (yes, the wording is weird)
        // this.kB = this.add.group([this.leftBox, this.rightBox])

        // add hitboxes to posts and corner edges of goal
        
        this.leftPost = this.physics.add.sprite(width / 2.55, height / 36, 'post')
        this.leftPost.body.setSize(this.leftPost.width, this.leftPost.height)
        this.leftPost.body.setImmovable(true)
        this.leftPost.setAlpha(0)

        this.rightPost = this.physics.add.sprite(388, height / 36, 'post')
        this.rightPost.body.setSize(this.rightPost.width, this.rightPost.height)
        this.rightPost.body.setImmovable(true)
        this.rightPost.setAlpha(0)

        // posts' hitbox group

        this.posts = this.add.group([this.leftPost, this.rightPost])

        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // Opposing team (Note: I'm purposefully allowing defenders to overlap each other for balance purposes)
        this.oKahn = this.physics.add.sprite(320, height / 10, 'bayern')
        this.oKahn.body.setCircle(this.oKahn.width / 2)
        this.oKahn.setVelocityX(600)
        this.oKahn.body.setCollideWorldBounds(true)
        this.oKahn.body.setBounce(1)
        this.oKahn.body.setImmovable(true)

        this.pLahm = this.physics.add.sprite(50, height / 5, 'bayern')
        this.pLahm.body.setCircle(this.pLahm.width / 2)
        this.pLahm.setVelocityX(400)
        this.pLahm.body.setCollideWorldBounds(true)
        this.pLahm.body.setBounce(1)
        this.pLahm.body.setImmovable(true)

        this.deLigt = this.physics.add.sprite(200, height / 5, 'bayern')
        this.deLigt.body.setCircle(this.deLigt.width / 2)
        this.deLigt.setVelocityX(-500)
        this.deLigt.body.setCollideWorldBounds(true)
        this.deLigt.body.setBounce(1)
        this.deLigt.body.setImmovable(true)

        this.fBeckenbauer = this.physics.add.sprite(420, height / 5, 'bayern')
        this.fBeckenbauer.body.setCircle(this.fBeckenbauer.width / 2)
        this.fBeckenbauer.setVelocityX(400)
        this.fBeckenbauer.body.setCollideWorldBounds(true)
        this.fBeckenbauer.body.setBounce(1)
        this.fBeckenbauer.setImmovable(true)

        this.aDavies = this.physics.add.sprite(550, height / 5, 'bayern')
        this.aDavies.body.setCircle(this.aDavies.width / 2)
        this.aDavies.setVelocityX(-800)
        this.aDavies.body.setCollideWorldBounds(true)
        this.aDavies.body.setBounce(1)
        this.aDavies.body.setImmovable(true)

        this.bSchweinsteiger = this.physics.add.sprite(200, height / 2.3, 'bayern')
        this.bSchweinsteiger.body.setCircle(this.bSchweinsteiger.width / 2)
        // this.bSchweinsteiger.setVelocityX(-500)
        // this.bSchweinsteiger.body.setCollideWorldBounds(true)
        // this.bSchweinsteiger.body.setBounce(1)
        this.bSchweinsteiger.body.setImmovable(true)

        this.jKimmich = this.physics.add.sprite(320, height / 2.7, 'bayern')
        this.jKimmich.body.setCircle(this.jKimmich.width / 2)
        // this.jKimmich.setVelocityX(-500)
        // this.jKimmich.body.setCollideWorldBounds(true)
        // this.jKimmich.body.setBounce(1)
        this.jKimmich.body.setImmovable(true)

        this.lMatthaus = this.physics.add.sprite(420, height / 2.3, 'bayern')
        this.lMatthaus.body.setCircle(this.lMatthaus.width / 2)
        // this.lMatthaus.setVelocityX(-500)
        // this.lMatthaus.body.setCollideWorldBounds(true)
        // this.lMatthaus.body.setBounce(1)
        this.lMatthaus.body.setImmovable(true)

        this.jMusiala = this.physics.add.sprite(35, height / 1.9, 'bayern')
        this.jMusiala.body.setCircle(this.jMusiala.width / 2)
        // this.jMusiala.setVelocityX(-500)
        // this.jMusiala.body.setCollideWorldBounds(true)
        // this.jMusiala.body.setBounce(1)
        this.jMusiala.body.setImmovable(true)

        this.gMuller = this.physics.add.sprite(322, height / 1.5, 'bayern')
        this.gMuller.body.setCircle(this.gMuller.width / 2)
        // this.gMuller.setVelocityX(-500)
        // this.gMuller.body.setCollideWorldBounds(true)
        // this.gMuller.body.setBounce(1)
        this.gMuller.body.setImmovable(true)

        this.kRummenigge = this.physics.add.sprite(600, height / 1.9, 'bayern')
        this.kRummenigge.body.setCircle(this.kRummenigge.width / 2)
        // this.kRummenigge.setVelocityX(-500)
        // this.kRummenigge.body.setCollideWorldBounds(true)
        // this.kRummenigge.body.setBounce(1)
        this.kRummenigge.body.setImmovable(true)

        // Bayern Munich All-time 11 group
        this.bayernMunich = this.add.group([this.oKahn, 
            this.pLahm, this.deLigt, this.fBeckenbauer, this.aDavies, 
            this.bSchweinsteiger, this.jKimmich, this.lMatthaus, 
            this.jMusiala, this.gMuller, this.kRummenigge])
        
        // Player's Team (Allow passes forward but not back)

        this.iCasillas = this.physics.add.sprite(320, height / 2 * 1.88, 'madrid')
        this.iCasillas.body.setCollideWorldBounds(true)
        this.iCasillas.body.setCircle(this.iCasillas.width / 2)
        this.iCasillas.body.setImmovable(true)
        
        this.rCarlos = this.physics.add.sprite(50, height / 1.65, 'madrid')
        // this.rCarlos.setX(Phaser.Math.Between(0 + this.rCarlos.width / 2, width - this.rCarlos.width / 2))
        this.rCarlos.body.setImmovable(true)
        this.rCarlos.body.checkCollision.down = false

        this.rMarquez = this.physics.add.sprite(200, height / 1.65, 'madrid')
        // this.rMarquez.setX(Phaser.Math.Between(0 + this.rMarquez.width / 2, width - this.rMarquez.width / 2))
        this.rMarquez.body.setImmovable(true)
        this.rMarquez.body.checkCollision.down = false
        
        this.sRamos = this.physics.add.sprite(420, height / 1.65, 'madrid')
        // this.sRamos.setX(Phaser.Math.Between(0 + this.sRamos.width / 2, width - this.sRamos.width / 2))
        this.sRamos.body.setImmovable(true)
        this.sRamos.body.checkCollision.down = false

        this.mSalgado = this.physics.add.sprite(550, height / 1.65, 'madrid')
        // this.mSalgado.setX(Phaser.Math.Between(0 + this.mSalgado.width / 2, width - this.mSalgado.width / 2))
        this.mSalgado.body.setImmovable(true)
        this.mSalgado.body.checkCollision.down = false

        this.modric = this.physics.add.sprite(100, height / 2.2, 'madrid')
        this.modric.body.setImmovable(true)
        this.modric.body.checkCollision.down = false

        this.bellingol = this.physics.add.sprite(322, height / 2.2, 'madrid')
        this.bellingol.body.setImmovable(true)
        this.bellingol.body.checkCollision.down = false

        this.ozil = this.physics.add.sprite(500, height / 2.2, 'madrid')
        this.ozil.body.setImmovable(true)
        this.ozil.body.checkCollision.down = false

        this.cRonaldo = this.physics.add.sprite(100, height / 3, 'madrid')
        this.cRonaldo.body.setImmovable(true)
        this.cRonaldo.body.checkCollision.down = false

        this.fPuskas = this.physics.add.sprite(322, height / 3.5, 'madrid')
        this.fPuskas.body.setImmovable(true)
        this.fPuskas.body.checkCollision.down = false

        this.lFigo = this.physics.add.sprite(500, height / 3, 'madrid')
        this.lFigo.body.setImmovable(true)
        this.lFigo.body.checkCollision.down = false

        // Real Madrid All-time 11 group
        this.realMadrid = this.add.group([this.iCasillas, 
            this.rCarlos, this.rMarquez, this.sRamos, this.mSalgado, 
            this.modric, this.bellingol, this.ozil, 
            this.cRonaldo, this. fPuskas, this.lFigo])

        
        // variables
        this.score = 0
        game.settings = {gameTimer: 10000}

        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100

        // score text
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.goals = "Score: " + this.score.toString()
        this.scoreText = this.add.text(game.config.width / 14, game.config.height / 100, this.goals, textConfig).setOrigin(0, 0)

        // mouse input for "kicks"
        this.input.on('pointerdown', (pointer) => {
            let shotDirectionX
            let shotDirectionY
            pointer.x <= this.ball.x ? shotDirectionX = 1 : shotDirectionX = -1
            pointer.y <= this.ball.y ? shotDirectionY = 1 : shotDirectionY = -1
            this.ball.body.setVelocityX(Phaser.Math.Between(this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X) * shotDirectionX)
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirectionY)
            this.ballKick.play()
        })

        this.physics.add.collider(this.ball, this.goal, (ball, goal) => {
            ball.setX(width / 2)
            ball.setY(height - height / 11)
            this.ball.setVelocityX(0)
            this.ball.setVelocityY(0)
            this.scoredGoal.play()
            this.score++
            if(this.score != 0) this.goalScored = parseInt(this.score)
            this.goals = "Shots: " + this.score
            this.scoreText.text = this.goals
            // ball.destroy()
        })

        this.physics.add.collider(this.oKahn, this.rightBox, (oKahn, rightBox) => {
            oKahn.setVelocityX(-400)
        })

        this.physics.add.collider(this.oKahn, this.leftBox, (oKahn, leftBox) => {
            oKahn.setVelocityX(400)
        })

        // keeper collision
        this.physics.add.collider(this.ball, this.bayernMunich)

        // player's team collision
        /* this.physics.add.collider(this.ball, this.iCasillas)
        this.physics.add.collider(this.ball, this.rCarlos)
        this.physics.add.collider(this.ball, this.rMarquez)
        this.physics.add.collider(this.ball, this.sRamos)
        this.physics.add.collider(this.ball, this.mSalgado) */
        this.physics.add.collider(this.ball, this.realMadrid)

        // goal posts collision to add a bit of extra challenge and logic to the game by forcing the player to score from more of a frontal position
        this.physics.add.collider(this.ball, this.posts)

        // keeper's box collision (for the keeper only); Issue: there is no collision or console outputs callback error; may have to give up / Update: LESSSS GOOOOO; I'M TOO BIG BRAIN
        // this.physics.add.collider(this.oKahn, this.kB)
        // this.physics.add.collider(this.oKahn, this.kB, this, null)

        // time text
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            color: '#843605',
            align: 'right', 
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }
        this.gameOver = false;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOver = true
            // console.log("gameOver")
        }, null, this)

        this.timer = game.settings.gameTimer
        this.timerText = this.add.text(game.config.width / 1.25, game.config.height / 100, this.timer, timeConfig).setOrigin(0, 0)
    }

    update() {
        this.timer = game.settings.gameTimer - this.clock.elapsed
        this.timerText.text = this.timer/1000 - (this.timer/1000) % 1 + 1
        // console.log(this.timer)

        if(this.gameOver) {
            this.stadium.stop();
            this.ballKick.stop();
            this.scoredGoal.stop();
            this.scene.stop('playScene');
            // this.scene.start("menuScene");
            // console.log("It's Jover")
        }
    }
}