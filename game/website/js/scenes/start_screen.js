class StartScreen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }

    create() {
         document.body.style.backgroundColor = 'black'; 

         const width = this.cameras.main.width;
         const height = this.cameras.main.height;
 
        this.add.image(width / 2, height / 2, 'logo');

        const startGameButton = this.make.text({
            x: width / 2,
            y: height / 2 + 150,
            text: 'START GAME',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });
        startGameButton.setInteractive();

        startGameButton.on('pointerover', () => {
            startGameButton.setStyle({
                color: 'fireBrick',
            });
        });
        startGameButton.on('pointerdown', () => {
            startGameButton.setStyle({
                color: 'indianRed',
            });
            // change scene
            this.scene.start('level_one');
        }, this);

        startGameButton.on('pointerout', () => {
            startGameButton.setStyle({ color: 'white' });
        });

        const optionsButton = this.make.text({
            x: width / 2,
            y: height / 2 + 200,
            text: 'OPTIONS',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });
        optionsButton.setInteractive();
        optionsButton.on('pointerdown', () => {
            optionsButton.setStyle({
                color: 'indianRed',
            });
        });
        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({
                color: 'fireBrick',
            });
        });
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ color: 'white' });
        });
    }
 
        //this.scene.start('level_one');
    }

