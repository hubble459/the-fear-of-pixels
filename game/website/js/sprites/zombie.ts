class Zombie extends Phaser.Physics.Arcade.Sprite {
    MAX_HOR_SPEED = 100;
    key: string;
    from: any;
    to: any;
    right: boolean;


    constructor(scene, width: number, height: number, from: any, to: any, type: number) {
        super(scene, from.x, from.y, 'zombie' + type);
        this.key = 'zombie' + type;
        this.from = from;
        this.to = to;

        this.right = from.x < to.x;
        if (!this.right) {
            this.from = to;
            this.to = from;
        }

        const scale = .75;
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(scale);
        this.setFlipX(!this.right);
        (this as any).setBodySize(this.displayWidth / 2.5, height, true);
        this.setImmovable(true);
        (this.body as any).setImmovable(true);
        const listener = () => {
            const openMouth = ~~(Math.random() * 4) === 0;
            if (openMouth) {
                this.anims.play('walk2', true);
            } else {
                this.anims.play('walk1', true);//.on('animationcomplete', listener);
            }
        };
        this.anims.play('walk1', true).on('animationcomplete', listener);

    }

    preUpdate(time: number, delta: number) {
        this.setFlipX(!this.right);
        if (this.right) {
            this.setVelocityX(this.MAX_HOR_SPEED);
            this.right = this.x < this.to.x;
        } else {
            this.setVelocityX(-this.MAX_HOR_SPEED);
            this.right = this.x < this.from.x;
        }

        super.preUpdate(time, delta);
    }

    animations() {
        (this.anims as any).create({
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
            repeat: 1
        });

        (this.anims as any).create({
            key: 'walk2',
            frames: [
                {
                    key: this.key,
                    frame: 'frame_8'
                },
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
                },
                {
                    key: this.key,
                    frame: 'frame_12'
                },
                {
                    key: this.key,
                    frame: 'frame_13'
                },
                {
                    key: this.key,
                    frame: 'frame_14'
                },
                {
                    key: this.key,
                    frame: 'frame_15'
                }
            ],
            frameRate: 12,
            repeat: 1
        });
    }
}
