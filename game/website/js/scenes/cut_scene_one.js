class CutSceneOne extends Phaser.Scene {
    constructor() {
        super('cut_scene_one');
    }

    create() {
        this.cameras.main.fadeIn(3000);

        document.body.style.backgroundColor = '#111';
        this.cameras.main.setBackgroundColor('#111');

        this.width = 1000;
        this.height = this.cameras.main.height / 2 + 105;
        const map = this.make.tilemap({ width: this.width, height: this.height, tileWidth: 1, tileHeight: 1 })
        this.physics.world.setBounds(-map.widthInPixels * 2, 0, map.widthInPixels * 4, map.heightInPixels);
        this.cameras.main.setSize(map.widthInPixels * 4, map.heightInPixels * 2);

        this.player = new Player(this, 0, this.height);
        this.player.setCollideWorldBounds(true);
        this.player.setMovable(false);


        this.zombie = new Zombie(this, { x: this.width / 2, y: this.height }, { x: this.width * 100, y: this.height }, 1);
        this.zombie.setCollideWorldBounds(true);

        this.cameras.main.setPosition(-100, 0);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('level_one');
        });
    }

    async update(time, delta) {
        if (~this.zombie.x > -this.width + 100 && ~this.zombie.x < -this.width + 150) {
            this.player.setVelocityX(100);
            this.player.anims.play('run', true);
        }

        if (~this.player.x < -this.width / 2 && !this.playerStopped) {
            this.playerStopped = true;

            // Stop moving
            this.player.setVelocityX(0);
            
            // Stop running
            this.player.anims.stop(2000);
            this.player.setFrame('frame-0');

            // Look around
            await this.sleep(500);
            this.player.setFlipX(true);
            await this.sleep(500);
            this.player.setFlipX(false);
            await this.sleep(500);

            this.subtitle = 0;
            this.show = true;
        }
        
        if (this.show) {
            this.show = false;
            switch (this.subtitle) {
                case 0:
                    this.addSubtitle(`Huh? What was that?`, 2000);
                    break;
                    
                case 1:
                    this.player.setFlipX(true);
                    await this.sleep(500);
                    this.player.setFlipX(false);
                    await this.sleep(500);
                    this.addSubtitle(`Guess I'll follow it to find out.`, 2000);
                    break;

                case 2:
                    this.player.anims.play('run', true);
                    this.player.setVelocityX(130);
                    break;
            }
        }
        if (~this.player.x > -this.width + 100) {
            this.cameras.main.fadeOut(2000);
        }

    }

    addSubtitle(text, duration) {
        const sub = this.add.text(
            0,
            this.player.y - this.player.displayHeight * .75,
            text,
            {
                color: 'white',
                align: 'center'
            }
        );
        const pos = this.player.x - sub.width / 2;
        sub.setPosition(pos, sub.y);

        setTimeout(() => {
            sub.destroy();
            this.show = true;
            this.subtitle++;
        }, duration);
    }

    async sleep(millis) {
        return new Promise((resolve => setTimeout(resolve, millis)));
    }
}
