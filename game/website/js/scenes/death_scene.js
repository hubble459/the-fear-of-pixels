class DeathScene extends Phaser.Scene {
    constructor() {
        super('death_scene');
    }

    adviceTexts = [
        'Maybe try evading them next time.',
        `Geesh, I thought you'd survive longer.`,
        `Don't give up yet! We'll get there`,
        'Hey, be careful out there!',
        'Again...'
    ];

    create() {
        document.body.style.backgroundColor = 'black'; 

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const deathText = this.make.text({
            x: width / 2,
            y: height / 2 - 100
            ,
            text: 'YOU DIED.',
            style: {
                font: '70px impact',
                fill: '#ffffff'
            },
            origin: .5
        });

        const adviceText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: this.adviceTexts[~~(Math.random() * this.adviceTexts.length)],
            style: {
                font: '30px monospace',
                fill: '#ffffff'
            },
            origin: .5
        });

        this.newGameButton = this.make.text({
            x: width / 2,
            y: height / 2 + 150,
            text: 'NEW GAME',
            style: {
                font: '30px impact',
                fill: '#fff'
            },
            origin: .5
        });
        this.newGameButton.setInteractive();
        this.newGameButton.on('pointerdown', () => {
            // this.clickCountText.setText(`Button has been clicked ${++clickCount} times.`);
            this.newGameButton.setStyle({
                color: 'indianRed',
            });
        });
        this.newGameButton.on('pointerover', () => {
            this.newGameButton.setStyle({
                color: 'fireBrick',
            });
        });
        this.newGameButton.on('pointerout', () => {
            this.newGameButton.setStyle({ color: 'white' });
        });
        this.QuitButton = this.make.text({
            x: width / 2,
            y: height / 2 + 200,
            text: 'QUIT',
            style: {
                font: '30px impact',
                fill: '#fff'
            },
            origin: .5
        });
        this.QuitButton.setInteractive();
        this.QuitButton.on('pointerdown', () => {
            this.QuitButton.setStyle({
                color: 'indianRed',
            });
        });
        this.QuitButton.on('pointerover', () => {
            this.QuitButton.setStyle({
                color: 'fireBrick',
            });
        });
        this.QuitButton.on('pointerout', () => {
            this.QuitButton.setStyle({ color: 'white' });
        });
    }

}
