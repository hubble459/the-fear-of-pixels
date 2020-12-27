class start_screen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }

    create() {
        this.#bindKeys();

        this.cameras.main.setBackgroundColor('#456789');

        this.physics.world.TILE_BIAS = 64;

        this.map = this.make.tilemap({key: 'level_1'});
        const brickTiles = this.map.addTilesetImage('bricks_level_one');
        const curbTiles = this.map.addTilesetImage('curb_level_one');
        const graffTiles = this.map.addTilesetImage('death_graff');
        const trashTiles = this.map.addTilesetImage('trash_level_one');
        const kingTiles = this.map.addTilesetImage('skeleton_king');
        const skelTiles = this.map.addTilesetImage('tower_of_skel');
        const banksyTiles = this.map.addTilesetImage('banksy_graff');
        const postersTiles = this.map.addTilesetImage('posters');
        const tile1Tiles = this.map.addTilesetImage('tile1');
        const streetlightTiles = this.map.addTilesetImage('streetlight');

        // create the layers
        const city = this.map.createLayer('city', [streetlightTiles]);
        const wall = this.map.createLayer('wall', [brickTiles, curbTiles, graffTiles, tile1Tiles]);
        const grass = this.map.createLayer('grass', [tile1Tiles]);
        const before_wall = this.map.createLayer('before wall', [brickTiles, curbTiles, graffTiles,trashTiles, kingTiles,skelTiles, banksyTiles, postersTiles, streetlightTiles]);
        wall.setCollisionByProperty({'collision': true});
        this.player = new Player(this, 200, 0);
        this.physics.add.collider(this.player, wall);
        this.cameras.main.startFollow(this.player, true, .1, .1);

        const width = this.map.widthInPixels;
        const height = this.map.heightInPixels;

        // Sizes
        this.cameras.main.setBounds(0, 0, width, height);
        this.physics.world.setBounds(0, 0, width, height);
        this.cameras.main.scaleManager.setGameSize(2000, height);

        const skyLine = this.textures.get('skyline');
        const offset = skyLine.frames[skyLine.firstFrame].halfHeight;

        this.background = this.add.tileSprite(
            0,
            offset,
            width,
            height,
            'skyline'
        ).setDepth(-1)
            .setOrigin(0)
            .setScrollFactor(0);
    }

    update(time, delta) {
        if (this.background) {
            this.background.tilePositionX = this.cameras.main.scrollX * .3;
        }
    }

    #bindKeys() {
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
