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
        this.load.spritesheet('bricks_level_one', 'bricks_level_one.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('curb_level_one', 'curb_level_one.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('trash_level_one', 'trash_level_one.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('skeleton_king', 'skeleton_king.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('tower_of_skel', 'tower_of_skel.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('banksy_graff', 'banksy_graff.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('posters', 'posters.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('tile1', 'tile1.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('streetlight', 'streetlight.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('clouds', 'clouds.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('LA_sign', 'LA_sign.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('stopsign', 'stopsign.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('carton', 'carton.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('cars', 'cars.png', {frameWidth: 32, frameHeight: 32});
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
            gravity: {y: 2500}
        }
    },
    scene: LoadScreen
}

const game = new Phaser.Game(config);
