var BASE_SPEED = 100;
var ENEMY_SPEED = BASE_SPEED * 1.8;
var GRAVITY = 1200;
var JUMP = 580;
var ASSET_VERSION = 1; //(new Date()).getTime();
var BASE_PATH = '';
var YAY_WORDS = [
    'YAY, A GAME BOY',
    'YAMM',
    'LUV U SANTA',
    'WOW',
    'AWESOME'
];

var NEJ_WORDS = [
    "MAMA WON'T GET A PRESENT",
    'LOST',
    'DAMN',
    'THAT WAS BAD',
    'THROW IT AWAY DIEGO',
    'WHAT WAS THAT',
    'LOOOOOOOOL'
];

var state = {
    preload: function() {
        this.load.spritesheet("player",BASE_PATH + 'assets/tile-santa.png?' + ASSET_VERSION, 48, 48, 10);
        this.load.spritesheet("enemy.kid", BASE_PATH + "assets/tile-fan.png?" + ASSET_VERSION, 48, 48, 20);
        this.load.image("background.0", BASE_PATH + "assets/background.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("background.1", BASE_PATH + "assets/background-1.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("background.2", BASE_PATH + "assets/background-2.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("background.3", BASE_PATH + "assets/background-3.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("floor", BASE_PATH + "assets/floor.png?" + ASSET_VERSION, 800, 8);
        this.load.image("present", BASE_PATH + "assets/present.png?" + ASSET_VERSION, 24, 24);
        this.load.image("teaser", BASE_PATH + "assets/teaser.png?" + ASSET_VERSION, 222, 105);
        this.load.image("chimney", BASE_PATH + "assets/chimney.png?" + ASSET_VERSION, 24, 96);
    },
    create: function() {
        this.levels = [];
        this.levels.push(level_dornbirn);

        this.currentLevel = null;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background0 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.0');
        this.background1 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.1');
        this.background2 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.2');
        this.background3 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.3');

        this.floor = this.add.sprite(0, this.world.height, 'floor');
        this.game.physics.enable(this.floor);
        this.floor.body.immovable = true;

        this.enemies = this.add.group();
        this.presents = this.add.group();

        this.player = this.add.sprite(0, 0, 'player');
        this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
        this.player.animations.add('jump', [8], 1, false);
        this.player.animations.add('win', [8], 1, false);
        this.player.animations.add('broken', [9], 1, false);

        this.player.animations.play('run');

        this.game.physics.enable(this.player);
        this.player.body.gravity.y = GRAVITY;
        this.player.body.setSize(24, 36, 12, 0);

        this.hints = this.add.group();

        this.levelselect = this.add.group();

        this.finishLines = this.add.group();

        var levelsInRow = 4;
        for(var i = 0; i < this.levels.length; i++) {
            var level = this.add.text(
                10 + Math.floor(i/levelsInRow) * 200,
                50 + 35 * (i % levelsInRow),
                this.levels[i].title.toUpperCase(),
                {
                    fill: '#ffdd00',
                    align: 'center',
                    fontSize: 20
                },
                this.levelselect
            );
            level.inputEnabled = true;
            var c = this.levels[i];
            level.events.onInputDown.add(function() {
                console.log(c);
                this.start(c);
            }, this);
        }

        this.scoreText = this.add.text(
            10,
            10,
            "",
            {
                fill: '#ffdd00',
                align: 'left'
            }
        );
        this.scoreText.fontSize = 20;


        this.score = 0;


        this.upFree = true;

        this.reset();
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.floor);
        this.game.physics.arcade.collide(this.enemies, this.floor);

        if (this.gameStarted) {
            obj = this;
            this.enemies.forEachAlive(function(enemy) {
                if(enemy.body.x + enemy.body.width < this.game.world.bounds.left) {
                    enemy.kill();
                }
            });
            this.presents.forEachAlive(function(present) {
                if(present.body.y > this.game.world.height) {
                    obj.showHint(present, NEJ_WORDS[Math.floor(Math.random() * NEJ_WORDS.length)]);
                    present.kill();
                    obj.addScore(-1000);
                }
            });

            if(!this.gameOver) this.addScore(Math.round(this.time.physicsElapsed * 100));

        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) 
            || this.game.input.activePointer.isDown
        ) {
            if(this.upFree) {
                if(!this.gameStarted) {
                } else if(this.gameOver) {
                } else {
                    if(this.player.body.touching.down)
                        this.player.body.velocity.y -= JUMP;
                    else
                        this.spawnPresent();
                }
            }
            this.upFree = false;
        } else {
            this.upFree = true;
        }



        if (!this.gameOver) {
            this.background0.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 5;
            this.background1.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 3;
            this.background2.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 1.5;
            this.background3.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 1.2;
            this.game.physics.arcade.overlap(this.player, this.enemies, this.setGameOver, null, this);
            this.game.physics.arcade.overlap(this.enemies, this.presents, this.catchPresent, null, this);
            this.game.physics.arcade.overlap(this.player, this.finishLines, this.setWin, null, this);
            if(!this.player.body.touching.down)
                this.player.animations.play('jump');
            else
                this.player.animations.play('run');
        } else this.player.animations.play('broken');

    },
    start: function(level) {
        this.reset();

        this.currentLevel = level;
        this.levelselect.visible = false;

        this.currentSpawnItem = 0;
        this.setSpawnTimer();

        this.scoreText.setText("SCORE: "+this.score);

        this.gameStarted = true;
        this.gameOver = false;
    },
    reset: function() {
        this.gameStarted = false;
        this.gameOver = false;
        this.score = 0;
        this.scoreText.setText("HOWDY, SELECT LEVEL:");
        this.floor.reset(0, this.world.height - this.floor.body.height);
        this.player.reset(this.world.width / 4, this.floor.body.y - this.player.body.height);
        this.enemies.removeAll();
    },
    setSpawnTimer: function() {
        if(this.currentSpawnItem >= this.currentLevel.spawns.length) return;
        this.spawnTimer = this.game.time.create(this);
        this.spawnTimer.add(this.currentLevel.spawns[this.currentSpawnItem].time, this.spawn, this);
        this.spawnTimer.start();
    },
    spawn: function() {
        this.spawnTimer.stop();

        var item = this.currentLevel.spawns[this.currentSpawnItem];
        switch(item.type) {
            case "enemy":
                this.spawnEnemy(item.conf);
            break;
            case "finish":
                this.spawnFinish(item.conf);
            break;
        }

        this.currentSpawnItem++;
        this.setSpawnTimer();
    },
    spawnEnemy: function(conf) {
        if(!conf.speed) conf.speed = -ENEMY_SPEED;
        if(!conf.gravity) conf.gravity = GRAVITY;

        var enemy = this.enemies.create(
            this.game.width,
            this.floor.body.top - this.player.body.height,
            'enemy.kid'
        );
        this.game.physics.enable(enemy);
        enemy.body.velocity.x = conf.speed;
        enemy.body.gravity.y = conf.gravity;
        enemy.body.setSize(24, 36, 12, 0);

        enemy.animations.add('run', [9, 8, 7, 6, 5, 4, 3, 2], 12, true);
        enemy.animations.add('run-present', [17, 16, 15, 14, 13, 12, 11, 10], 12, true);
        enemy.animations.add('broken', [0], 1, false);

        enemy.animations.play('run');
    },
    spawnFinish: function() {
        var finishLine = this.add.sprite(
            this.game.width,
            this.floor.body.top - 96,
            'chimney',
            0,
            this.finishLines
        );

        this.game.physics.enable(finishLine);
        finishLine.body.velocity.x = -BASE_SPEED;
    },
    spawnPresent: function() {
        if(this.presents.countLiving() > 0) return;
        var present = this.presents.create(
            this.player.body.x + this.player.body.width / 2 - 12,
            this.player.body.bottom,
            'present'
        );
        this.game.physics.enable(present);
        present.body.velocity.x = -BASE_SPEED * 1.8;
        present.body.gravity.y = GRAVITY;
    },
    catchPresent: function(enemy, present) {
        enemy.body.velocity.x *= 1.1;
        enemy.body.velocity.y -= 60;
        enemy.animations.play('run-present');
        present.kill();
        this.addScore(5000);
        this.showHint(enemy, YAY_WORDS[Math.floor(Math.random() * YAY_WORDS.length)]);
    },
    addScore: function(addWhat) {
        this.score += addWhat;
        this.scoreText.setText("SCORE: " + this.score);  
    },
    showHint: function(focusOn, text) {
        var hint = this.game.add.text(
            focusOn.x,
            focusOn.y,
            text,
            {
                fill: '#ffdd00',
                align: 'center'
            }
        );
        hint.anchor.setTo(0.5, 0.5);
        hint.fontSize = 20;

        var move = this.game.add.tween(hint);
        move.to({ y: hint.y - 100, x: hint.x - 100 * Math.random() + 50}, 1000);
        move.onComplete.add(function() { hint.kill() }, this);
        move.start();

    },
    setGameOver: function(player, enemy) {
        this.endGame();

        this.showHint(enemy, 'CARAMBOOOOOOLAGEEEE');
        this.player.animations.play('broken');
    },
    setWin: function(player, finishLine) {
        this.endGame();
        this.showHint(finishLine, 'YOU ARE A WINNER!');
        this.player.animations.play('win');
    },
    endGame: function() {
        this.timeOver = this.game.time.now;
        this.gameOver = true;
        this.spawnTimer.stop();
        this.scoreText.setText("FINAL SCORE: " + this.score +". SELECT LEVEL:");
        this.levelselect.visible = true;

        this.enemies.forEachAlive(function(enemy) {
            enemy.body.velocity.x = 0;
            enemy.animations.play('broken');
        });
        this.finishLines.forEachAlive(function(finishLine) {
            finishLine.body.velocity.x = 0;
        });
    }    
};

var game = new Phaser.Game(
    800,
    200,
    Phaser.CANVAS,
    document.querySelector('#screen'),
    state
);