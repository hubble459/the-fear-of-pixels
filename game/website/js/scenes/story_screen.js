class Story extends Phaser.Scene {
    constructor() {
        super('story_screen');
    }
    create() {
        document.body.style.backgroundColor = 'black'; 

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const storyText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: 'STORY',
            style: {
                font: '70px impact',
                color: 'white'
            },
            origin: .5
        });

        const lore = 'Nick Clark awakes from a strange dreams and \n' +
        'finds the world around him pixel-fied and \n'+
        'riddled with flesh-eating walkers. Help him \n' +
        'navigate this dangerous world, and find \n' +
        'his way back home.'

        const loreText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text:lore,
            // text: 
            // 'hoi,\n' +
            // ' ',
            style: {
                align: 'center',
                font: '25px monospace',
                color: '#ffffff'
            },
            origin: .5
        });

        const backButton = this.make.text({
            x: width / 2,
            y: height / 2 + 200,
            text: 'BACK',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });

        backButton.setInteractive();

        backButton.on('pointerover', () => {
            backButton.setStyle({
                color: 'fireBrick',
            });
        });
        backButton.on('pointerdown', () => {
            backButton.setStyle({
                color: 'indianRed',
            });
            // change scene
            this.scene.start('start_screen');
        }, this);

        backButton.on('pointerout', () => {
            backButton.setStyle({ color: 'white' });
        });
    }
}