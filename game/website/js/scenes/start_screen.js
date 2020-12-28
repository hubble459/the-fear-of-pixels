class StartScreen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }

    create() {
        console.log("owo");
        this.scene.switch('level_one');
    }

    update(time, delta) {
        
    }
}
