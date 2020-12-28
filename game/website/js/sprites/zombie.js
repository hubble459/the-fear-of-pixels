class Zombie extends Phaser.Physics.Arcade.Sprite {
    MAX_HOR_SPEED = 100;

    constructor(scene, width, height, x, y, type) {
        super(scene, x, y, 'zombie' + type);
        this.key = 'zombie' + type;

        const scale = .75;
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(scale);
        this.setBodySize(this.displayWidth / 2.5, height, true);
        this.anims.play('walk1');

        this.setVelocityX(this.MAX_HOR_SPEED)
    }

    preUpdate(time, delta) {
        const direction = ~~(Math.random() * 100);
        if (direction === 0) {
            this.setVelocityX(this.MAX_HOR_SPEED)
            this.setFlipX(false);
        } else if (direction === 1) {
            this.setVelocityX(-this.MAX_HOR_SPEED)
            this.setFlipX(true);
        }

        super.preUpdate(time, delta);
    }

    animations() {
        this.anims.create({
            key: 'walk1',
            frames: [
                {
                    key: this.key,
                    frame: 'frame_1'
                },
                {
                    key: this.key,
                    frame: 'frame_2'
                },
                {
                    key: this.key,
                    frame: 'frame_3'
                },
                {
                    key: this.key,
                    frame: 'frame_4'
                },
                {
                    key: this.key,
                    frame: 'frame_5'
                },
                {
                    key: this.key,
                    frame: 'frame_6'
                },
                {
                    key: this.key,
                    frame: 'frame_7'
                },
                {
                    key: this.key,
                    frame: 'frame_0'
                }
            ],
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'walk2',
            frames: [
                {
                    key: this.key,
                    frame: 'frame_9'
                },
                {
                    key: this.key,
                    frame: 'frame_10'
                },
                {
                    key: this.key,
                    frame: 'frame_11'
                }
            ],
            frameRate: 12,
            repeat: -1
        });
    }
}
