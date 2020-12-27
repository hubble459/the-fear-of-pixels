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
        const before_wall = this.map.createLayer('before wall', [brickTiles, curbTiles, graffTiles,trashTiles, kingTiles,skelTiles, banksyTiles, postersTiles]);


        before_wall.setCollisionByProperty({'collision': true});
        this.player = new Player(this, 200, 0);
        this.physics.add.collider(this.player, before_wall);

        // Sizes
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.scaleManager.setGameSize(2000, this.map.heightInPixels);



        this.cameras.main.startFollow(this.player, true, .1, .1)
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
