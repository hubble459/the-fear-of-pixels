class StartScreen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }
    create() {
        this.scene.start('level_one');
    }
}
