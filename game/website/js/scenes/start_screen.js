class StartScreen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }

    create() {
         document.body.style.backgroundColor = 'black'; 

         const width = this.cameras.main.width;
         const height = this.cameras.main.height;
 
        this.add.image(width / 2, height / 2 - 50, 'logo');

        const newGameButton = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: 'NEW GAME',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });
        newGameButton.setInteractive();

        newGameButton.on('pointerover', () => {
            newGameButton.setStyle({
                color: 'fireBrick',
            });
        });
        newGameButton.on('pointerdown', () => {
            newGameButton.setStyle({
                color: 'indianRed',
            });
            // change scene
            this.scene.start('cut_scene_one');
        }, this);

        newGameButton.on('pointerout', () => {
            newGameButton.setStyle({ color: 'white' });
        });

        const loadGameButton = this.make.text({
            x: width / 2,
            y: height / 2 + 150,
            text: 'LOAD GAME',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });
        loadGameButton.setInteractive();
        loadGameButton.on('pointerdown', () => {
            loadGameButton.setStyle({
                color: 'indianRed',
            });
            //change scene
            this.scene.start('level_one');
        }, this);

        loadGameButton.on('pointerover', () => {
            loadGameButton.setStyle({
                color: 'fireBrick',
            });
            console.log('owo');
        });
        loadGameButton.on('pointerout', () => {
            loadGameButton.setStyle({ color: 'white' });
        });

        const settingsButton = this.make.text({
            x: width / 2,
            y: height / 2 + 250,
            text: 'SETTINGS',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });
        settingsButton.setInteractive();
        settingsButton.on('pointerdown', () => {
            settingsButton.setStyle({
                color: 'indianRed',
            });
            //change scene
            this.scene.start('settings_screen');
        }, this);

        settingsButton.on('pointerover', () => {
            settingsButton.setStyle({
                color: 'fireBrick',
            });
        });
        settingsButton.on('pointerout', () => {
            settingsButton.setStyle({ color: 'white' });
        });

        const storyButton = this.make.text({
            x: width / 2,
            y: height / 2 + 200,
            text: 'STORY',
            style: {
                font: '30px impact',
                color: 'white'
            },
            origin: .5
        });
        storyButton.setInteractive();
        storyButton.on('pointerdown', () => {
            storyButton.setStyle({
                color: 'indianRed',
            });
            //change scene
            this.scene.start('story_screen');
        }, this);

        storyButton.on('pointerover', () => {
            storyButton.setStyle({
                color: 'fireBrick',
            });
        });
        storyButton.on('pointerout', () => {
            storyButton.setStyle({ color: 'white' });
        });
    }
}

