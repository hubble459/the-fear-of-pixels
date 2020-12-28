class Player extends Phaser.Physics.Arcade.Sprite {
    MAX_HOR_SPEED = 400;
    MAX_VER_SPEED = 1000;
    dead = false;
    jumping = true;
    cursors: any;

    constructor(scene: LevelOne, x: number, y:number) {
        super(scene, x, y, 'player');
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
        this.setScale(.175);
        this.cursors = scene.cursors;
    }

    setDead(dead) {
        this.dead = dead;
        this.setMaxVelocity(dead ? 0 : this.MAX_VER_SPEED);
    }

    preUpdate(time, delta) {
        if (!this.cursors) return;
        if (this.dead) return;

        const onFloor = (this.body as any).onFloor();

        if (onFloor) {
            if (this.cursors.space.isDown) {
                this.jumping = true;
                //                this.anims.play('jump', false);
                this.setVelocityY(-this.MAX_VER_SPEED);
            } else {
                this.jumping = false;
            }
        }

        if (this.cursors.right.isDown || this.cursors.right2.isDown) {
            this.setVelocityX(this.MAX_HOR_SPEED);
            this.setFlipX(false);
            if (!this.jumping) {
                this.anims.play('run', true)
            }
        } else if (this.cursors.left.isDown || this.cursors.left2.isDown) {
            this.setVelocityX(-this.MAX_HOR_SPEED);
            this.setFlipX(true);
            if (!this.jumping) {
                this.anims.play('run', true)
            }
        } else if (onFloor && !this.jumping) {
            this.setVelocity(0);
            // this.anims.stopAfterRepeat(0);
            this.anims.stop();
            this.setFrame('frame-0');
        }

        super.preUpdate(time, delta);
    }

    animations() {
        (this.anims as any).create({
            key: 'run',
            frames: [
                {
                    key: 'player',
                    frame: 'frame-1'
                },
                {
                    key: 'player',
                    frame: 'frame-2'
                },
                {
                    key: 'player',
                    frame: 'frame-3'
                },
                {
                    key: 'player',
                    frame: 'frame-4'
                },
                {
                    key: 'player',
                    frame: 'frame-5'
                },
                {
                    key: 'player',
                    frame: 'frame-6'
                },
                {
                    key: 'player',
                    frame: 'frame-7'
                },
                {
                    key: 'player',
                    frame: 'frame-0'
                },
            ],
            frameRate: 12,
            repeat: -1
        });
    }
}
