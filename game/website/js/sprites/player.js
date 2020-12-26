class Player extends Phaser.Physics.Arcade.Sprite {
    MAX_HOR_SPEED = 200;
    MAX_VER_SPEED = 1000;

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setScale(.2);
        this.cursors = scene.cursors;
    }

    preUpdate(time, delta) {
        if (!this.cursors) return;
        const onFloor = this.body.onFloor();

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
            this.anims.stopAfterRepeat(0);
        }

        super.preUpdate(time, delta);
    }

    animations() {
        this.anims.create({
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

//        this.anims.create({
//            key: 'jump',
//            frames: [
//                {
//                    key: 'player',
//                    frame: 'Richard 2'
//                },
//                {
//                    key: 'player',
//                    frame: 'Richard 3'
//                },
//                {
//                    key: 'player',
//                    frame: 'Richard 1'
//                }
//            ],
//            frameRate: 3,
//            repeat: 1
//        });
    }
}
