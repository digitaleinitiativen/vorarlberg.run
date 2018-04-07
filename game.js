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
        this.load.spritesheet("player",BASE_PATH + 'assets/char-sheet.png?' + ASSET_VERSION, 96, 96, 10);
        this.load.spritesheet("enemy.kid", BASE_PATH + "assets/tile-fan.png?" + ASSET_VERSION, 48, 48, 20);
        this.load.image("background.0", BASE_PATH + "assets/back-0.png?" + ASSET_VERSION, 320, 320);
        this.load.image("background.1", BASE_PATH + "assets/back-1.png?" + ASSET_VERSION, 320, 320);
        this.load.image("background.2", BASE_PATH + "assets/back-2.png?" + ASSET_VERSION, 320, 320);
        //this.load.image("background.3", BASE_PATH + "assets/background-3.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("ground", BASE_PATH + "assets/tile-ground.png?" + ASSET_VERSION, 24, 24);
        this.load.image("teaser", BASE_PATH + "assets/teaser.png?" + ASSET_VERSION, 222, 105);
        this.load.image("platform", BASE_PATH + "assets/platform.png?" + ASSET_VERSION, 72, 6);
        this.load.image("timefreeze", BASE_PATH + "assets/clock.png?" + ASSET_VERSION, 24, 24);
        this.load.image("feather", BASE_PATH + "assets/feather.png?" + ASSET_VERSION, 24, 24);
        this.load.image("extraLife", BASE_PATH + "assets/medikit.png?" + ASSET_VERSION, 24, 24);
        this.load.image("chimney", BASE_PATH + "assets/chimney.png?" + ASSET_VERSION, 24, 96);
        this.load.image("obstacle", BASE_PATH + "assets/obstacle_pear.png?" + ASSET_VERSION, 66, 100);
    },
    create: function() {
        this.levels = [];
        this.levels.push(level_dornbirn);
        this.levels.push(level_dev);
        this.levels.push(level_stefan);

        this.currentLevel = null;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background0 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.0');
        this.background1 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.1');
        this.background2 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.2');
        //this.background3 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.3');

        this.floor = this.add.tileSprite(0, this.world.height - 24, this.world.width, 24, 'ground');
        this.game.physics.enable(this.floor);
        this.floor.body.immovable = true;

        this.enemies = this.add.group();
        this.platforms = this.add.group();
        this.powerUps = this.add.group();
        this.powerUpNotifications = this.add.group();
        this.finishLines = this.add.group();
        this.obstacles = this.add.group();

        this.player = this.add.sprite(0, 0, 'player');
        this.player.animations.add('run', [0, 1, 2, 3, 4, 5], 12, true);
        this.player.animations.add('stand', [6], 1, false);
        this.player.animations.add('jump', [7], 1, false);
        this.player.animations.add('win', [8], 1, false);
        this.player.animations.add('broken', [9], 1, false);

        this.player.animations.play('run');

        this.game.physics.enable(this.player);
        this.player.body.gravity.y = GRAVITY;
        this.player.body.setSize(24, 80, 36, 0);

        this.hints = this.add.group();

        this.levelselect = this.add.group();

        var levelsInRow = 4;
        for(var i = 0; i < this.levels.length; i++) {
            var level = this.add.text(
                10 + Math.floor(i/levelsInRow) * 200,
                50 + 35 * (i % levelsInRow),
                this.levels[i].title.toUpperCase(),
                {
                    fill: '#000',
                    align: 'center',
                    fontSize: 20
                },
                this.levelselect
            );
            level.inputEnabled = true;
            level.data = this.levels[i];
            level.events.onInputDown.add(function(level) {
                this.start(level.data);
            }, this);
        }

        this.scoreText = this.add.text(
            10,
            10,
            "",
            {
                fill: '#000',
                align: 'left',
                fontSize: 20
            }
        );

        this.score = 0;

        this.upFree = true;

        this.reset();
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.floor);
        this.game.physics.arcade.collide(this.powerUps, this.floor);
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.floor);

        if (this.gameStarted) {
            obj = this;
            this.enemies.forEachAlive(function(enemy) {
                if(enemy.body.x + enemy.body.width < this.game.world.bounds.left) {
                    enemy.kill();
                }
            });
            this.powerUps.forEachAlive(function(powerUp) {
                if(powerUp.body.y > this.game.world.height) {
                    powerUp.kill();
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
//            this.background3.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 1.2;
            this.game.physics.arcade.overlap(this.player, this.enemies, this.removeLife, null, this);
            this.game.physics.arcade.overlap(this.enemies, this.presents, this.catchPresent, null, this);
            this.floor.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED;
            this.game.physics.arcade.overlap(this.player, this.powerUps, this.usePowerUp, null, this);
            this.player.body.x = this.world.width / 4;
            this.game.physics.arcade.overlap(this.player, this.finishLines, this.setWin, null, this);
            this.game.physics.arcade.overlap(this.player, this.obstacles, this.setGameOver, null, this);
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
        this.player.lifes = 1;
        this.extraLifeNotifications = [];
        this.enemies.removeAll();
        this.platforms.removeAll();
        this.powerUps.removeAll();
        this.powerUpNotifications.removeAll();
        this.obstacles.removeAll();
        this.finishLines.removeAll();
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
            case "platform":
                this.spawnPlatform(item.conf);
                break;
            case "finish":
                this.spawnFinish(item.conf);
                break;
            case "powerup":
                this.spawnPowerUp(item.conf);
                break;
            case "obstacle":
                this.spawnObstacle(item.conf);
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
        enemy.animations.add('broken', [0], 1, false);

        enemy.animations.play('run');
    },
    spawnObstacle: function(conf) {
        if(!conf) conf = {};
        if(!conf.speed) conf.speed = -BASE_SPEED;
        
        var obstacle = this.obstacles.create(
            this.game.width,
            this.floor.body.top - 50,
            'obstacle'
        );

        this.game.physics.enable(obstacle);
        obstacle.body.velocity.x = conf.speed;
        obstacle.body.immovable = true;
    },
    spawnPlatform: function() {
        var platform = this.platforms.create(
            this.game.width,
            this.floor.body.top - 60,
            'platform'
        );
        this.game.physics.enable(platform);
        platform.body.velocity.x = -BASE_SPEED;
        platform.body.setSize(72, 1, 0, 0);
        platform.body.immovable = true;
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
    spawnPowerUp: function(conf) {
        var powerUp = this.powerUps.create(
            this.game.width,
            this.floor.body.top - 24,
            conf.powerUpType
        );
        powerUp.powerUpType = conf.powerUpType;

        this.game.physics.enable(powerUp);
        powerUp.body.velocity.x = -BASE_SPEED;
    },
    usePowerUp: function(player, powerUp) {
        var notification = this.powerUpNotifications.create(
            this.game.width - 20 - (this.powerUpNotifications.countLiving() + 1) * 30,
            20,
            powerUp.powerUpType);

        var removeCallback = function() { notification.kill(); }

        switch (powerUp.powerUpType) {
            case "timefreeze":
                this.reduceGameSpeed(0.5, 2500, removeCallback);
                break;
            case "feather":
                this.reduceGravity(0.7, 2500, removeCallback);
                break;
            case "shield":
                this.extraLifeNotifications.push(notification);
                this.addLife();
                break;
        }

        powerUp.kill();
    },
    reduceGameSpeed: function(factor, duration, removeCallback) {
        this.game.time.slowMotion = 1 / factor;

        var timer = this.game.time.create(this);
        timer.add(duration, function() {
            this.game.time.slowMotion = 1;
            removeCallback();
            timer.stop();
        }, this);
        timer.start();
    },
    reduceGravity: function(factor, duration, removeCallback) {
        this.player.body.gravity.y *= factor;

        var timer = this.game.time.create(this);
        timer.add(duration, function() {
            this.player.body.gravity.y /= factor;
            removeCallback();
            timer.stop();
        }, this);
        timer.start();
    },
    addLive: function() {
        this.player.lifes++;
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
                fill: '#000',
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
    removeLife: function(player, enemy) {
        player.lifes--;
        if (player.lifes <= 0) {
            this.setGameOver(player, enemy);
        } else {
            this.extraLifeNotifications.pop().kill();
        }
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
        this.platforms.forEachAlive(function(platform) {
            platform.body.velocity.x = 0;
        });
        this.finishLines.forEachAlive(function(finishLine) {
            finishLine.body.velocity.x = 0;
        });
        this.obstacles.forEachAlive(function(obstacle) {
            obstacle.body.velocity.x = 0;
        });
        this.powerUps.forEachAlive(function(powerUp) {
            powerUp.body.velocity.x = 0;
        });
    }    
};

var game = new Phaser.Game(
    680,
    320,
    Phaser.CANVAS,
    document.querySelector('#screen'),
    state
);