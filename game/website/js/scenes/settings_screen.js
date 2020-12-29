class Settings extends Phaser.Scene {
    constructor() {
        super('settings_screen');
    }
    create() {
        document.body.style.backgroundColor = 'black';

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const settingsText = this.make.text({
            x: width / 2,
            y: height / 2 - 150,
            text: 'SETTINGS',
            style: {
                font: '70px impact',
                color: '#ffffff'
            },
            origin: .5
        });

        const explainText = this.make.text({
            x: width / 2,
            y: height / 2 - 80,
            text: 'Click to change',
            style: {
                font: '15px monospace',
                color: 'white'
            },
            origin: .5
        });

        const consoleImage1 = this.add.image(width / 2, height / 2, 'consolesoption1');
        const consoleImage2 = this.add.image(width / 2, height / 2, 'consolesoption2');
        consoleImage2.setVisible(false);
        consoleImage1.setScale(1.2);
        consoleImage2.setScale(1.2);

        consoleImage1.setInteractive();
        consoleImage2.setInteractive();
        consoleImage1.on('pointerdown', () => {
            consoleImage2.setVisible(true);
        });
        consoleImage2.on('pointerdown', () => {
            consoleImage2.setVisible(false);
        });

        const soundOn = this.add.image(width / 2, height / 2 + 150, 'sound_on');
        const soundOff = this.add.image(width / 2, height / 2 + 150, 'sound_off');
        soundOff.setVisible(false);
        soundOn.setScale(0.8);
        soundOff.setScale(0.8);


        soundOn.setInteractive();
        soundOff.setInteractive();
        soundOn.on('pointerdown', () => {
            soundOff.setVisible(true);
        });
        soundOff.on('pointerdown', () => {
            soundOff.setVisible(false);
        });

        

        const backButton = this.make.text({
            x: width / 2,
            y: height / 2 + 220,
            text: 'BACK',
            style: {
                font: '30px impact',
                color: '#fff'
            },
            origin: .5
        });
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            backButton.setStyle({
                color: 'indianRed',
            });
            this.scene.start('start_screen');
        }, this);

        backButton.on('pointerover', () => {
            backButton.setStyle({
                color: 'fireBrick'
            });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ color: 'white' });
        });
    }
}