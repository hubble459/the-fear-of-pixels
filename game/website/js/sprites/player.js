class Player extends Phaser.Physics.Arcade.Sprite {
    MAX_HOR_SPEED = 400;
    MAX_VER_SPEED = 1000;
    dead = false;
    jumping = false;
    movable = true;
    cursors;

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.animations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
        this.setScale(.175);
        this.bindKeys();
    }

    setDead(dead) {
        this.dead = dead;
        this.setMaxVelocity(dead ? 0 : this.MAX_VER_SPEED);
    }

    preUpdate(time, delta) {
        if (this.movable) {
            if (!this.cursors) return;
            if (this.dead) return;

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
                // this.anims.stopAfterRepeat(0);
                this.anims.stop();
                this.setFrame('frame-0');
            }
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
                }
            ],
            frameRate: 12,
            repeat: -1
        });
    }

    bindKeys() {
        // Bind cursor keys
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });
    }

    setMovable(movable) {
        this.movable = movable;
    }
}
