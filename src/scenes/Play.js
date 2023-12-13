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

        // attempt at creating opposing team (just the keeper for now)
        this.mNeuer = this.physics.add.sprite(320, height / 10, 'bayern')
        this.mNeuer.body.setCircle(this.mNeuer.width / 2)
        this.mNeuer.setVelocityX(400)
        this.mNeuer.body.setCollideWorldBounds(true)
        this.mNeuer.body.setBounce(1)
        this.mNeuer.body.setImmovable(true)
        
        // attempt at creating player's team with body physics that allow for "passes" forward in attack but not back; only defenders and keeper implemented for now
        // (current issue is sometimes players overlap with random spawn; could be fixed by hardcoding their locations but not ideal)
        // (however, since players irl will sometimes [or often depending on team/strategy/player(s)/etc] overlap, I think this
        // is somewhat fine, but in general, if I can set their spacing and location to be better, that would be ideal)

        this.iCasillas = this.physics.add.sprite(320, height / 2 * 1.88, 'madrid')
        this.iCasillas.body.setCollideWorldBounds(true)
        this.iCasillas.body.setCircle(this.iCasillas.width / 2)
        this.iCasillas.body.setImmovable(true)
        
        this.rCarlos = this.physics.add.sprite(0, height / 4 * 3, 'madrid')
        this.rCarlos.setX(Phaser.Math.Between(0 + this.rCarlos.width / 2, width - this.rCarlos.width / 2))
        this.rCarlos.body.setImmovable(true)
        this.rCarlos.body.checkCollision.down = false

        this.rMarquez = this.physics.add.sprite(0, height / 4 * 3, 'madrid')
        this.rMarquez.setX(Phaser.Math.Between(0 + this.rMarquez.width / 2, width - this.rMarquez.width / 2))
        this.rMarquez.body.setImmovable(true)
        this.rMarquez.body.checkCollision.down = false
        
        this.sRamos = this.physics.add.sprite(0, height / 4 * 3, 'madrid')
        this.sRamos.setX(Phaser.Math.Between(0 + this.sRamos.width / 2, width - this.sRamos.width / 2))
        this.sRamos.body.setImmovable(true)
        this.sRamos.body.checkCollision.down = false

        this.mSalgado = this.physics.add.sprite(0, height / 4 * 3, 'madrid')
        this.mSalgado.setX(Phaser.Math.Between(0 + this.mSalgado.width / 2, width - this.mSalgado.width / 2))
        this.mSalgado.body.setImmovable(true)
        this.mSalgado.body.checkCollision.down = false

        
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

        this.physics.add.collider(this.mNeuer, this.rightBox, (mNeuer, rightBox) => {
            mNeuer.setVelocityX(-400)
        })

        this.physics.add.collider(this.mNeuer, this.leftBox, (mNeuer, leftBox) => {
            mNeuer.setVelocityX(400)
        })

        // keeper collision
        this.physics.add.collider(this.ball, this.mNeuer)

        // player's team collision
        this.physics.add.collider(this.ball, this.iCasillas)
        this.physics.add.collider(this.ball, this.rCarlos)
        this.physics.add.collider(this.ball, this.rMarquez)
        this.physics.add.collider(this.ball, this.sRamos)
        this.physics.add.collider(this.ball, this.mSalgado)

        // goal posts collision to add a bit of extra challenge and logic to the game by forcing the player to score from more of a frontal position
        this.physics.add.collider(this.ball, this.posts)

        // keeper's box collision (for the keeper only); Issue: there is no collision or console outputs callback error; may have to give up; Update: LESSSS GOOOOO; I'M TOO BIG BRAIN
        // this.physics.add.collider(this.mNeuer, this.kB)
        // this.physics.add.collider(this.mNeuer, this.kB, this, null)
        
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
            console.log("gameOver")
        }, null, this)

        this.timer = game.settings.gameTimer
        this.timerText = this.add.text(game.config.width / 1.25, game.config.height / 100, this.timer, timeConfig).setOrigin(0, 0)
    }

    update() {
        this.timer = game.settings.gameTimer - this.clock.elapsed
        this.timerText.text = this.timer/1000 - (this.timer/1000) % 1 + 1
        // console.log(this.timer)
    }
}