var config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
    height: window.innerHeight,
		physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
let cursors, player
var game = new Phaser.Game(config);

function preload ()
{
	this.load.audio('boden', ['../music.mp3'])
	this.load.image('ff', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
	this.load.image("cenario", "https://cdn.discordapp.com/attachments/818482486517694464/946931598425739314/cenario.png")
	this.load.image('bola', 'https://cdn.discordapp.com/attachments/722887140723392625/947213009107972126/PngItem_3784506.png')
}

function create ()
{
	cursors = this.input.keyboard.createCursorKeys();
	//let start = this.add.text(window.innerWidth / 2 - 150, window.innerHeight / 2, 'Clique para começar', { fill: '#00ff00', fontFamily: 'font1' });

	player = this.physics.add.image(window.innerWidth / 2, window.innerHeight / 2 - 200, 'bola');
	player.setScale(0.1)
	player.setCollideWorldBounds(true);
	this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db")
	music = this.sound.add('boden')
    music.play();
}
function update ()
{
   // player.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);
    }
	else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(300);
    }
}