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
                fill: '#ffffff'
            },
            origin: .5
        });

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 25,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            },
            origin: .5
        });

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 25,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
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

        // Load assets
        this.load.setPath('/js/scenes/');
        this.load.sceneFile('start_screen', 'start_screen.js');

        this.load.setPath('/js/sprites/');
        this.load.script('playerScript', 'player.js');

        this.load.setPath('/assets/sprites/')
        this.load.atlas('player', 'richard.png', 'richard.json');
    }

    create() {
        this.scene.switch('start_screen');
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
