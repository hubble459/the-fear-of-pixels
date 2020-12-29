class LevelOne extends Phaser.Scene {
    constructor() {
        super('level_one');
    }

    map;
    player;
    background;
    cursors;


    create() {
        this.cameras.main.fadeIn(500);


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

        for (let i = 1; i <= 10; i++) {
            const z_from = this.map.findObject('sprites', object => object.name === 'z' + i && object.type === 'from');
            const z_to = this.map.findObject('sprites', object => object.name === 'z' + i && object.type === 'to');          

            const zombie = new Zombie(this, this.player.displayWidth, this.player.displayHeight, z_from, z_to, (i % 3) + 1);
            this.physics.add.collider(zombie, wall);
            this.physics.add.collider(zombie, world);

            this.physics.add.overlap(zombie, this.player, (zombie, player) => {
                if (!player.dead && player.y + player.displayHeight > zombie.y + zombie.displayHeight / 2) {
                    player.setDead(true);

                    zombie.setStop(true);
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
        })

        // Sizes
        this.cameras.main.setBounds(0, 0, width, height);
        this.physics.world.setBounds(0, 0, width, height);
        this.cameras.main.scaleManager.setGameSize(2000, height);

        this.background = this.add.tileSprite(
            0,
            0,
            width,
            height,
            'skyline'
        ).setDepth(-1)
            .setOrigin(0)
            .setScrollFactor(0);
    }

    update(time, delta) {
        if (this.background && this.cameras.main) {
            this.background.tilePositionX = this.cameras.main.scrollX * .3;
        }
    }

    
}
