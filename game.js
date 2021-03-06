var BASE_SPEED = 110;
var ENEMY_SPEED = BASE_SPEED * 1.8;
var GRAVITY = 1200;
var JUMP = 580;
var ASSET_VERSION = 2; //(new Date()).getTime();
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

var preloadState = {
    preload: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.load.spritesheet("player",BASE_PATH + 'assets/char-sheet.png?' + ASSET_VERSION, 96, 96, 10);
        this.load.spritesheet("enemy-red", BASE_PATH + "assets/enemy-red.png?" + ASSET_VERSION, 96, 96, 3);
        this.load.spritesheet("enemy-blue", BASE_PATH + "assets/enemy-blue.png?" + ASSET_VERSION, 96, 96, 3);
        this.load.spritesheet("enemy-yellow", BASE_PATH + "assets/enemy-yellow.png?" + ASSET_VERSION, 96, 96, 3);
        this.load.spritesheet("jetpack-char", BASE_PATH + "assets/jetpack-char.png?" + ASSET_VERSION, 32, 32, 5);
        this.load.image("background.0", BASE_PATH + "assets/back-0.png?" + ASSET_VERSION, 320, 320);
        this.load.image("background.1", BASE_PATH + "assets/back-1.png?" + ASSET_VERSION, 320, 320);
        this.load.image("background.2", BASE_PATH + "assets/back-2.png?" + ASSET_VERSION, 320, 320);
        //this.load.image("background.3", BASE_PATH + "assets/background-3.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("ground", BASE_PATH + "assets/tile-ground.png?" + ASSET_VERSION, 24, 24);
        this.load.image("platform", BASE_PATH + "assets/platform.png?" + ASSET_VERSION, 72, 6);
        this.load.image("timefreeze", BASE_PATH + "assets/clock.png?" + ASSET_VERSION, 24, 24);
        this.load.image("feather", BASE_PATH + "assets/jetpack.png?" + ASSET_VERSION, 24, 24);
        this.load.image("extraLife", BASE_PATH + "assets/medikit.png?" + ASSET_VERSION, 24, 24);
        this.load.image("cow", BASE_PATH + "assets/cow.png?" + ASSET_VERSION, 64, 51);
        this.load.image("flower0", BASE_PATH + "assets/flower0.png?" + ASSET_VERSION, 26, 32);
        this.load.image("flower1", BASE_PATH + "assets/flower1.png?" + ASSET_VERSION, 26, 32);
        this.load.image("flower2", BASE_PATH + "assets/flower2.png?" + ASSET_VERSION, 26, 32);
        this.load.image("flower3", BASE_PATH + "assets/flower3.png?" + ASSET_VERSION, 26, 32);
        this.load.image("finish-feldkirch", BASE_PATH + "assets/fin.png?" + ASSET_VERSION, 179, 160);
        this.load.image("finish-dornbirn", BASE_PATH + "assets/fin0.png?" + ASSET_VERSION, 179, 160);
        this.load.image("finish-bludenz", BASE_PATH + "assets/fin2.png?" + ASSET_VERSION, 179, 160);
        this.load.image("finish-bregenz", BASE_PATH + "assets/ship.png?" + ASSET_VERSION, 407, 160);
        this.load.image("obstacle", BASE_PATH + "assets/obstacle_pear.png?" + ASSET_VERSION, 66, 100);
        this.load.image("traphole", BASE_PATH + "assets/traphole.png?" + ASSET_VERSION, 24, 24);
        this.load.image("car", BASE_PATH + "assets/car.png?" + ASSET_VERSION, 64, 24);
        this.load.image("pfiff", BASE_PATH + "assets/pfiff.png?" + ASSET_VERSION, 66, 100);
        this.load.image("spezial", BASE_PATH + "assets/spezial.png?" + ASSET_VERSION, 66, 100);
        this.load.image('splash', BASE_PATH + 'assets/startscreen.png?' + ASSET_VERSION, 680, 320);
        this.load.image('water', BASE_PATH + 'assets/water.png?' + ASSET_VERSION, 64, 41);
        this.load.image('fish', BASE_PATH + 'assets/fish.png?' + ASSET_VERSION, 24, 32);
        this.load.image('gameover', BASE_PATH + 'assets/gameover.png?' + ASSET_VERSION, 680, 320);
    },
    create: function() {
        this.state.start('splash');
    }
}
var splashState = {
    create: function() {
        var splash = this.add.sprite(0, 0, 'splash');
        splash.inputEnabled = true;
        splash.events.onInputDown.add(function() {
            this.state.start('game');
        }, this);
    }
}
var gameoverState = {
    create: function() {
        var gameover = this.add.sprite(0, 0, 'gameover');
        gameover.inputEnabled = true;
        gameover.events.onInputDown.add(function() {
            this.state.start('game');
        }, this);
    }
}
var gameState = {
    
    create: function() {        
        this.levels = [];
        this.levels.push(level_dornbirn);
        this.levels.push(level_feldkirch);
        this.levels.push(level_bludenz);
        this.levels.push(level_bregenz);
        this.levels.push(level_uebersaxen);

        this.currentLevel = null;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background0 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.0');
        this.background1 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.1');
        this.background2 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.2');
        //this.background3 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.3');

        this.floor = this.add.tileSprite(0, this.world.height - 24, this.world.width, 24, 'ground');
        this.game.physics.enable(this.floor);
        this.floor.body.immovable = true;

        this.finishLines = this.add.group();
        this.trapholes = this.add.group();
        this.platforms = this.add.group();
        this.decorations = this.add.group();
        this.enemies = this.add.group();
        this.obstacles = this.add.group();
        this.floorstacles = this.add.group();
        this.powerUps = this.add.group();
        this.powerUpNotifications = this.add.group();

        this.jetpack = this.add.sprite(0, 0, "jetpack-char");
        this.jetpack.animations.add("fly", [1, 2], 6, true);
        this.jetpack.animations.add("off", [0], 1, false);
        this.jetpack.animations.play("off");

        this.game.physics.enable(this.jetpack);

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
            level.events.onInputOver.add(function(level) {
                level.fill = "#ffa500";
            });
            level.events.onInputOut.add(function(level) {
                level.fill = "#000";
            });
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

        this.cityText = this.add.text(
            10,
            40,
            "hello",
            {
                fill: '#333',
                align: 'center',
                fontSize: 10
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

            if(!this.gameStopped) this.addScore(Math.round(this.time.physicsElapsed * 100));
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) 
            || this.game.input.activePointer.isDown
        ) {
            if(this.upFree) {
                if(!this.gameStarted) {
                } else if(this.gameStopped) {
                } else {
                    if(this.player.body.touching.down)
                        this.player.body.velocity.y -= JUMP;
                }
            }
            this.upFree = false;
        } else {
            this.upFree = true;
        }

        if (!this.gameStopped) {
            this.background0.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 5;
            this.background1.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 3;
            this.background2.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 1.5;
//            this.background3.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED / 1.2;
            this.game.physics.arcade.overlap(this.player, this.enemies, this.removeLife, null, this);
            this.game.physics.arcade.overlap(this.enemies, this.presents, this.catchPresent, null, this);
            this.floor.tilePosition.x -= this.time.physicsElapsed * BASE_SPEED;
            this.game.physics.arcade.overlap(this.player, this.powerUps, this.usePowerUp, null, this);
            this.floorstacles.forEachAlive(function(floorstacle) {
                if(floorstacle.tilePosition)
                    floorstacle.tilePosition.x += this.time.physicsElapsed * 150;
            }, this);
            this.player.body.x = this.world.width / 4;
            this.jetpack.body.x = (this.world.width / 4) - 14;
            this.jetpack.body.y = this.player.body.y + 32;
            this.game.physics.arcade.overlap(this.player, this.finishLines, this.setWin, null, this);
            this.game.physics.arcade.overlap(this.player, this.obstacles, this.setGameOver, null, this);
            this.game.physics.arcade.overlap(this.player, this.trapholes, this.fallDown, null, this);
            this.game.physics.arcade.overlap(this.player, this.floorstacles, this.fallDown, null, this);
            if(!this.player.body.touching.down) {
                if (this.player.hasJetpack) {
                    this.jetpack.animations.play("fly");
                }

                this.player.animations.play('jump');
            }
            else {
                this.jetpack.animations.play("off");
                this.player.animations.play('run');
            }
        } else {
            if(this.gameWon) this.player.animations.play('win');
            else this.player.animations.play('broken');
        }

    },
    start: function(level) {
        this.reset();
        this.gameStarted = true;

        this.currentLevel = level;
        this.levelselect.visible = false;
        this.currentSpawnItem = 0;
        this.setSpawnTimer();
        this.scoreText.setText("SCORE: "+this.score);
        this.cityText.setText(level.welcome.toUpperCase());
    },
    reset: function() {
        this.gameStarted = false;
        this.gameStopped = false;
        this.gameWon = false;
        this.score = 0;
        this.scoreText.setText("HOWDY, SELECT LEVEL:");
        this.cityText.setText("");
        this.floor.reset(0, this.world.height - this.floor.body.height);
        this.player.reset(this.world.width / 4, this.floor.body.y - this.player.body.height);
        this.player.lifes = 1;
        this.player.hasJetpack = false;
        this.jetpack.visible = false;
        this.extraLifeNotifications = [];
        this.enemies.removeAll();
        this.platforms.removeAll();
        this.decorations.removeAll();
        this.powerUps.removeAll();
        this.trapholes.removeAll();
        this.powerUpNotifications.removeAll();
        this.obstacles.removeAll();
        this.floorstacles.removeAll();
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
            case "long-obstacle":
                this.spawnLongObstacle(item.conf);
                break;
            case "decoration":
                this.spawnDecoration(item.conf);
                break;
            case "traphole":
                this.spawnTraphole(item.conf);
                break;
            case "floorstacle":
                this.spawnFloorstacle(item.conf);
                break;
        }

        this.currentSpawnItem++;
        this.setSpawnTimer();
    },
    spawnEnemy: function(conf) {
        if(!conf.speed) conf.speed = -ENEMY_SPEED;
        if(!conf.gravity) conf.gravity = GRAVITY;
        if(!conf.image) conf.image = conf.jumps ? "enemy-red" : 'enemy-yellow';

        var enemy = this.enemies.create(
            this.game.width,
            this.floor.body.top - 96,
            conf.image
        );
        this.game.physics.enable(enemy);
        enemy.body.velocity.x = conf.speed;
        enemy.body.gravity.y = conf.gravity;
        enemy.body.setSize(36, 50, 30, 30);

        if (conf.jumps) {
            var jumpTimer = this.game.time.create(this);
            jumpTimer.add(2200 / (conf.speed / -ENEMY_SPEED), function() {
                enemy.body.velocity.y -= JUMP;
            });
            jumpTimer.start();
        }

        enemy.animations.add('run', [0, 1], 8, true);
        enemy.animations.add('broken', [2], 1, false);

        enemy.animations.play('run');
    },
    spawnFloorstacle: function(conf) {
        if(!conf) conf = {};

        var floorstacle = this.add.tileSprite(
            this.game.width,
            this.floor.body.top - 5,
            50,
            41,
            'water',
            0,
            this.floorstacles
        );
        this.game.physics.enable(floorstacle);
        floorstacle.body.velocity.x = -BASE_SPEED;
        floorstacle.body.immovable = true;

        var fish = this.add.sprite(
            this.game.width + floorstacle.body.width / 2,
            this.floor.body.top + 30,
            'fish',
            0,
            this.floorstacles
        );
        this.game.physics.enable(fish);
        fish.body.velocity.x = -BASE_SPEED;
        fish.body.immovable = true;
        fish.anchor.x = 0.5;
        fish.anchor.y = 0.5;

        var jumpTimer = this.game.time.create(this);
        jumpTimer.add(3900, function() {
            fish.body.gravity.y = GRAVITY * 0.9;
            fish.body.velocity.y -= JUMP * 0.8;
            jumpTimer.add(400, function() {
                fish.rotation = Math.PI;
            });
        });
        jumpTimer.start();
    },
    spawnObstacle: function(conf) {
        if(!conf) conf = {};
        if(!conf.speed) conf.speed = -BASE_SPEED;
        if(!conf.image) conf.image = 'obstacle';
        
        var obstacle = this.obstacles.create(
            this.game.width,
            this.floor.body.top - 50,
            conf.image
        );

        this.game.physics.enable(obstacle);
        obstacle.body.velocity.x = conf.speed;
        obstacle.body.immovable = true;
    },
    spawnTraphole: function() {
        var traphole = this.trapholes.create(
            this.game.width,
            this.floor.body.top,
            "traphole"
        );

        this.game.physics.enable(traphole);
        traphole.body.velocity.x = -BASE_SPEED;
        traphole.body.immovable = true;
        traphole.body.setSize(24, 25, 0, -1);
    },
    spawnLongObstacle: function(conf) {
        if(!conf) conf = {};
        if(!conf.speed) conf.speed = -BASE_SPEED;
        if(!conf.image) conf.image = 'car';
        
        var obstacle = this.obstacles.create(
            this.game.width,
            this.floor.body.top - 24,
            conf.image
        );

        this.game.physics.enable(obstacle);
        obstacle.body.velocity.x = conf.speed;
        obstacle.body.immovable = true;
    },
    spawnDecoration: function(conf) {        
        var decoration = this.decorations.create(
            this.game.width,
            this.floor.body.top - 32,
            conf.image
        );
        decoration.alpha = 0.5;

        this.game.physics.enable(decoration);
        decoration.body.velocity.x = -BASE_SPEED;
        decoration.body.immovable = true;
    },
    spawnPlatform: function(conf) {
        if(!conf) conf = {};
        if(!conf.height) conf.height = 60;
        var platform = this.platforms.create(
            this.game.width,
            this.floor.body.top - conf.height,
            'platform'
        );
        this.game.physics.enable(platform);
        platform.body.velocity.x = -BASE_SPEED;
        platform.body.setSize(72, 1, 0, 0);
        platform.body.immovable = true;
    },
    spawnFinish: function(conf) {
        if(!conf) conf = {};
        if(!conf.image) conf.image = 'finish-feldkirch';
        var finishLine = this.add.sprite(
            this.game.width,
            this.floor.body.top - 160,
            conf.image,
            0,
            this.finishLines
        );

        this.game.physics.enable(finishLine);

        if (this.currentLevel.title == 'Bludenz') {
            finishLine.body.setSize(100, 160, 40, 0)
        }

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
                this.player.hasJetpack = true;
                this.jetpack.visible = true;
                var that = this;
                this.reduceGravity(0.7, 4000, function() {
                    removeCallback();
                    that.jetpack.visible = false;
                    that.player.hasJetpack = false;
                });
                break;
            case "extraLife":
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
    addLife: function() {
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
            enemy.kill();
            this.extraLifeNotifications.pop().kill();
        }
    },
    fallDown: function(player, traphole) {
        this.setGameOver(player, traphole);
        this.player.body.velocity.x = BASE_SPEED;
        this.player.body.y += 10;
    },
    setGameOver: function(player, enemy) {
        this.gameWon = false;
        this.endGame();

        if(this.player.body.velocity.y < 0) this.player.body.velocity.y = 0;

        this.showHint(enemy, 'CARAMBOOOOOOLAGEEEE');
        this.player.animations.play('broken');
        var timer = this.game.time.create(this);
        timer.add(2000, function() {
            this.state.start('gameover');
        }, this);
        timer.start();

    },
    setWin: function(player, finishLine) {
        this.gameWon = true;
        this.endGame();
        this.showHint(finishLine, 'YOU ARE A WINNER!');
        this.player.animations.play('win');
        this.levelselect.visible = true;
    },
    endGame: function() {
        this.timeOver = this.game.time.now;
        this.gameStopped = true;
        this.spawnTimer.stop();
        this.scoreText.setText("FINAL SCORE: " + this.score +". SELECT LEVEL:");
        this.cityText.setText("");

        this.player.body.velocity.x = 0;
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
        this.decorations.forEachAlive(function(decoration) {
            decoration.body.velocity.x = 0;
        });
        this.obstacles.forEachAlive(function(obstacle) {
            obstacle.body.velocity.x = 0;
        });
        this.floorstacles.forEachAlive(function(floorstacle) {
            floorstacle.body.velocity.x = 0;
        });
        this.powerUps.forEachAlive(function(powerUp) {
            powerUp.body.velocity.x = 0;
        });
        this.trapholes.forEachAlive(function(traphole) {
            traphole.body.velocity.x = 0;
        });
    }    
};

var game = new Phaser.Game(
    680,
    320,
    Phaser.CANVAS,
    document.querySelector('#screen')
);

game.state.add('preload', preloadState);
game.state.add('game', gameState);
game.state.add('splash', splashState);
game.state.add('gameover', gameoverState);
game.state.start('preload');