class DeathScene extends Phaser.Scene {
    constructor() {
        super('death_scene');
    }

    adviceTexts = [
        'Maybe try evading them next time.',
        `Geesh, I thought you'd survive longer.`,
        `Don't give up on us yet! We'll get there`,
        'Hey, be careful out there!',
        'Again...'
    ];

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
            y: height / 2 - 100
            ,
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
            this.scene.start('start_screen');
        }, this);

        quitButton.on('pointerover', () => {
            quitButton.setStyle({
                color: 'fireBrick'
            });
        });
        quitButton.on('pointerout', () => {
            quitButton.setStyle({ color: 'white' });
        });
    }
}