var config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
    height: window.innerHeight,
		physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 2000 }
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
let cursors, player, lastKey, start, firstText
var game = new Phaser.Game(config);

function preload ()
{
	this.load.audio('boden', ['../music.mp3'])
	this.load.image('ff', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
	this.load.image("grass", "https://labs.phaser.io/src/games/firstgame/assets/platform.png")
	this.load.image("cenario", "https://cdn.discordapp.com/attachments/818482486517694464/946931598425739314/cenario.png")
	this.load.image('bola', 'https://media.discordapp.net/attachments/823374583188553728/947956127847567380/1646080518873-depositphotos-bgremover.png', {frameWidth: 32, frameHeight: 48})
}
	function create ()
{
	cursors = this.input.keyboard.createCursorKeys();
	this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db")
	music = this.sound.add('boden')
    music.play();
	firstText = this.add.text(window.innerWidth / 2 - 225, window.innerHeight / 2 , 'Clique no texto para iniciar!', { fill: '#00ff00', strokeThickness: 10, fontFamily: 'font1' })
	firstText.setInteractive()
	firstText.on('pointerdown', () => {
		firstText.setText("")
	if(start) return 0;
	start = true
	player = this.physics.add.image(window.innerWidth / 2, window.innerHeight / 2 - 200, 'bola');
	player.setScale(0.2)
	player.setCollideWorldBounds(true);
	player.setBounce(0.5, 0.5)
	this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
	this.cameras.main.startFollow(player, true, 0.05, 0.05);
	var platforms = this.physics.add.staticGroup();
	this.physics.add.collider(player, platforms);
    platforms.create(400, 568, 'grass').setScale(2).refreshBody();
	})
}
function update ()
{
	if(!start) return 0
	//if(!cursors.left.isDown || !cursors.right.isDown) player.setVelocity(0)
	if (cursors.left.isDown)
    {
		lastKey = "left"
        player.setVelocityX(-300);
		player.rotation += -0.10
    }
	if(cursors.left.isUp && !cursors.right.isDown)  player.setVelocityX(0);
	else if (cursors.right.isDown)
    {
		lastKey = "right"
		player.rotation += 0.10
		player.setVelocityX(300);
    }

    if(!cursors.up.isDown && player.body.blocked.down){
			player.allowedToJump = true;
    }
	if(cursors.up.isDown && player.body.blocked.down && player.allowedToJump){
		//player.setVelocity(300)
		player.setVelocityY(-700)
		lastKey = "up"
		player.allowedToJump = false;
	 }
}