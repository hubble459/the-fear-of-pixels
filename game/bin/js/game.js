class LoadScreen extends Phaser.Scene {
    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 50, 320, 50);
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 75,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#ffffff'
            },
            origin: .5
        });
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 25,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            },
            origin: .5
        });
        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 25,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            },
            origin: .5
        });
        this.load.on('progress', (value) => {
            percentText.setText(value * 100 + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 40, 300 * value, 30);
        });
        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        // Load scenes
        this.load.setPath('/js/scenes/');
        this.load.sceneFile('StartScreen', 'start_screen.js');
        this.load.sceneFile('DeathScene', 'death_scene.js');
        this.load.sceneFile('LevelOne', 'level_one.js');
        // Sprites JS
        this.load.setPath('/js/sprites/');
        this.load.script('playerScript', 'player.js');
        this.load.script('zombieScript', 'zombie.js');
        // Sprites Images
        this.load.setPath('/assets/sprites/');
        this.load.atlas('player', 'nick_clark.png', 'nick_clark.json');
        this.load.atlas('zombie1', 'zombie1.png', 'zombie1.json');
        this.load.atlas('zombie2', 'zombie2.png', 'zombie2.json');
        this.load.atlas('zombie3', 'zombie3.png', 'zombie3.json');
        // Levels
        this.load.setPath('/assets/levels/');
        this.load.tilemapTiledJSON('level_1', 'level_1.json');
        // Images
        this.load.setPath('/assets/images/');
        this.load.image('skyline', 'LA_skyline.png');
        // Tile-sets
        const tile_sets = '/assets/tile_sets/';
        this.load.setPath(tile_sets + 'level_one');
        this.load.spritesheet('bricks_level_one', 'bricks_level_one.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('curb_level_one', 'curb_level_one.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('trash_level_one', 'trash_level_one.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('skeleton_king', 'skeleton_king.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tower_of_skel', 'tower_of_skel.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('banksy_graff', 'banksy_graff.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('posters', 'posters.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tile1', 'tile1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('streetlight', 'streetlight.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('clouds', 'clouds.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('LA_sign', 'LA_sign.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('stopsign', 'stopsign.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('carton', 'carton.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('cars', 'cars.png', { frameWidth: 32, frameHeight: 32 });
    }
    create() {
        this.scene.switch('start_screen');
        // this.scene.switch('death_scene');
    }
}
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'phaser',
    pixelArt: true,
    antialias: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 2500 }
        }
    },
    scene: LoadScreen
};
const game = new Phaser.Game(config);
class DeathScene extends Phaser.Scene {
    constructor() {
        super('death_scene');
        this.adviceTexts = [
            'Maybe try evading them next time.',
            `Geesh, I thought you'd survive longer.`,
            `Don't give up on us yet! We'll get there`,
            'Hey, be careful out there!',
            'Again...'
        ];
    }
    // preload(){
    //     this.load.setPath('/js/scenes/');
    //     this.load.sceneFile('LevelOne', 'level_one.js');
    // }
    create() {
        // document.body.style.backgroundColor = 'black'; 
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        // this.add.image(400, 300, 'skyline');
        const deathText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: 'YOU DIED.',
            style: {
                font: '70px impact',
                color: '#ffffff'
            },
            origin: .5
        });
        const adviceText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: this.adviceTexts[~~(Math.random() * this.adviceTexts.length)],
            style: {
                font: '30px monospace',
                color: '#ffffff'
            },
            origin: .5
        });
        const newGameButton = this.make.text({
            x: width / 2,
            y: height / 2 + 150,
            text: 'NEW GAME',
            style: {
                font: '30px impact',
                color: '#fff'
            },
            origin: .5
        });
        newGameButton.setInteractive();
        newGameButton.on('pointerdown', () => {
            // this.clickCountText.setText(`Button has been clicked ${++clickCount} times.`);
            newGameButton.setStyle({
                color: 'indianRed',
            });
            // change scene
            this.scene.start('level_one');
        }, this);
        newGameButton.on('pointerover', () => {
            newGameButton.setStyle({
                color: 'fireBrick',
            });
        });
        newGameButton.on('pointerout', () => {
            newGameButton.setStyle({ color: 'white' });
        });
        const quitButton = this.make.text({
            x: width / 2,
            y: height / 2 + 200,
            text: 'QUIT',
            style: {
                font: '30px impact',
                color: '#fff'
            },
            origin: .5
        });
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            quitButton.setStyle({
                color: 'indianRed',
            });
        });
        quitButton.on('pointerover', () => {
            quitButton.setStyle({
                color: 'fireBrick',
            });
        });
        quitButton.on('pointerout', () => {
            quitButton.setStyle({ color: 'white' });
        });
    }
}
class LevelOne extends Phaser.Scene {
    constructor() {
        super('level_one');
    }
    create() {
        this.cameras.main.fadeIn(500);
        console.log('owo');
        this.bindKeys();
        this.cameras.main.setBackgroundColor('#456789');
        this.physics.world.TILE_BIAS = 64;
        this.map = this.make.tilemap({ key: 'level_1' });
        const brickTiles = this.map.addTilesetImage('bricks_level_one');
        const curbTiles = this.map.addTilesetImage('curb_level_one');
        const trashTiles = this.map.addTilesetImage('trash_level_one');
        const kingTiles = this.map.addTilesetImage('skeleton_king');
        const skelTiles = this.map.addTilesetImage('tower_of_skel');
        const banksyTiles = this.map.addTilesetImage('banksy_graff');
        const postersTiles = this.map.addTilesetImage('posters');
        const tile1Tiles = this.map.addTilesetImage('tile1');
        const streetlightTiles = this.map.addTilesetImage('streetlight');
        const cloudsTiles = this.map.addTilesetImage('clouds');
        const LAsignTiles = this.map.addTilesetImage('LA_sign');
        const stopsignTiles = this.map.addTilesetImage('stopsign');
        const cartonTiles = this.map.addTilesetImage('carton');
        const carsTiles = this.map.addTilesetImage('cars');
        // create the layers
        const city = this.map.createLayer('city', [streetlightTiles, cloudsTiles]);
        const wall = this.map.createLayer('wall', [brickTiles, curbTiles, tile1Tiles]);
        const grass = this.map.createLayer('grass', [tile1Tiles, cartonTiles]);
        const before_wall = this.map.createLayer('before wall', [brickTiles, curbTiles, trashTiles, kingTiles, skelTiles, banksyTiles, postersTiles, streetlightTiles, cloudsTiles, LAsignTiles, stopsignTiles]);
        const world = this.map.createLayer('world', [trashTiles, cartonTiles, carsTiles]);
        wall.setCollisionByProperty({ 'collision': true });
        world.forEachTile(tile => {
            if (!!tile.properties.car && !!tile.properties.collision) {
                tile.setCollision(false, false, true, false, true);
            }
        });
        const playerSpawn = this.map.findObject('sprites', object => object.name === 'spawn');
        this.player = new Player(this, playerSpawn.x, playerSpawn.y);
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, world);
        this.cameras.main.startFollow(this.player, true, .1, .1);
        const width = this.map.widthInPixels;
        const height = this.map.heightInPixels;
        for (let i = 1; i <= 5; i++) {
            const z_from = this.map.findObject('sprites', object => object.name === 'z' + i && object.type === 'from');
            const z_to = this.map.findObject('sprites', object => object.name === 'z' + i && object.type === 'to');
            const zombie = new Zombie(this, this.player.displayWidth, this.player.displayHeight, z_from, z_to, (i % 3) + 1);
            this.physics.add.collider(zombie, wall);
            this.physics.add.collider(zombie, world);
            this.physics.add.overlap(zombie, this.player, (zombie, player) => {
                if (!player.dead && player.y + player.displayHeight > zombie.y + zombie.displayHeight / 2) {
                    player.setDead(true);
                    const x = player.x;
                    const zX = zombie.x;
                    zombie.setFlipX(zX > x);
                    zombie.setMaxVelocity(0);
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                }
            });
        }
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('death_scene');
            // this.scene.transition({target: 'death_scene', duration: 2000});
        });
        // Sizes
        this.cameras.main.setBounds(0, 0, width, height);
        this.physics.world.setBounds(0, 0, width, height);
        this.cameras.main.scaleManager.setGameSize(2000, height);
        this.background = this.add.tileSprite(0, 0, width, height, 'skyline').setDepth(-1)
            .setOrigin(0)
            .setScrollFactor(0);
    }
    update(time, delta) {
        if (this.background && this.cameras.main) {
            this.background.tilePositionX = this.cameras.main.scrollX * .3;
        }
    }
    bindKeys() {
        // Bind cursor keys
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });
    }
}
class StartScreen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }
    create() {
        this.scene.start('level_one');
    }
}
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.MAX_HOR_SPEED = 400;
        this.MAX_VER_SPEED = 1000;
        this.dead = false;
        this.jumping = true;
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
        this.setScale(.175);
        this.cursors = scene.cursors;
    }
    setDead(dead) {
        this.dead = dead;
        this.setMaxVelocity(dead ? 0 : this.MAX_VER_SPEED);
    }
    preUpdate(time, delta) {
        if (!this.cursors)
            return;
        if (this.dead)
            return;
        const onFloor = this.body.onFloor();
        if (onFloor) {
            if (this.cursors.space.isDown) {
                this.jumping = true;
                //                this.anims.play('jump', false);
                this.setVelocityY(-this.MAX_VER_SPEED);
            }
            else {
                this.jumping = false;
            }
        }
        if (this.cursors.right.isDown || this.cursors.right2.isDown) {
            this.setVelocityX(this.MAX_HOR_SPEED);
            this.setFlipX(false);
            if (!this.jumping) {
                this.anims.play('run', true);
            }
        }
        else if (this.cursors.left.isDown || this.cursors.left2.isDown) {
            this.setVelocityX(-this.MAX_HOR_SPEED);
            this.setFlipX(true);
            if (!this.jumping) {
                this.anims.play('run', true);
            }
        }
        else if (onFloor && !this.jumping) {
            this.setVelocity(0);
            // this.anims.stopAfterRepeat(0);
            this.anims.stop();
            this.setFrame('frame-0');
        }
        super.preUpdate(time, delta);
    }
    animations() {
        this.anims.create({
            key: 'run',
            frames: [
                {
                    key: 'player',
                    frame: 'frame-1'
                },
                {
                    key: 'player',
                    frame: 'frame-2'
                },
                {
                    key: 'player',
                    frame: 'frame-3'
                },
                {
                    key: 'player',
                    frame: 'frame-4'
                },
                {
                    key: 'player',
                    frame: 'frame-5'
                },
                {
                    key: 'player',
                    frame: 'frame-6'
                },
                {
                    key: 'player',
                    frame: 'frame-7'
                },
                {
                    key: 'player',
                    frame: 'frame-0'
                },
            ],
            frameRate: 12,
            repeat: -1
        });
    }
}
class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, width, height, from, to, type) {
        super(scene, from.x, from.y, 'zombie' + type);
        this.MAX_HOR_SPEED = 100;
        this.key = 'zombie' + type;
        this.from = from;
        this.to = to;
        this.right = from.x < to.x;
        if (!this.right) {
            this.from = to;
            this.to = from;
        }
        const scale = .75;
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(scale);
        this.setFlipX(!this.right);
        this.setBodySize(this.displayWidth / 2.5, height, true);
        this.setImmovable(true);
        this.body.setImmovable(true);
        const listener = () => {
            const openMouth = ~~(Math.random() * 4) === 0;
            if (openMouth) {
                this.anims.play('walk2', true);
            }
            else {
                this.anims.play('walk1', true); //.on('animationcomplete', listener);
            }
        };
        this.anims.play('walk1', true).on('animationcomplete', listener);
    }
    preUpdate(time, delta) {
        this.setFlipX(!this.right);
        if (this.right) {
            this.setVelocityX(this.MAX_HOR_SPEED);
            this.right = this.x < this.to.x;
        }
        else {
            this.setVelocityX(-this.MAX_HOR_SPEED);
            this.right = this.x < this.from.x;
        }
        super.preUpdate(time, delta);
    }
    animations() {
        this.anims.create({
            key: 'walk1',
            frames: [
                {
                    key: this.key,
                    frame: 'frame_1'
                },
                {
                    key: this.key,
                    frame: 'frame_2'
                },
                {
                    key: this.key,
                    frame: 'frame_3'
                },
                {
                    key: this.key,
                    frame: 'frame_4'
                },
                {
                    key: this.key,
                    frame: 'frame_5'
                },
                {
                    key: this.key,
                    frame: 'frame_6'
                },
                {
                    key: this.key,
                    frame: 'frame_7'
                },
                {
                    key: this.key,
                    frame: 'frame_0'
                }
            ],
            frameRate: 12,
            repeat: 1
        });
        this.anims.create({
            key: 'walk2',
            frames: [
                {
                    key: this.key,
                    frame: 'frame_8'
                },
                {
                    key: this.key,
                    frame: 'frame_9'
                },
                {
                    key: this.key,
                    frame: 'frame_10'
                },
                {
                    key: this.key,
                    frame: 'frame_11'
                },
                {
                    key: this.key,
                    frame: 'frame_12'
                },
                {
                    key: this.key,
                    frame: 'frame_13'
                },
                {
                    key: this.key,
                    frame: 'frame_14'
                },
                {
                    key: this.key,
                    frame: 'frame_15'
                }
            ],
            frameRate: 12,
            repeat: 1
        });
    }
}
