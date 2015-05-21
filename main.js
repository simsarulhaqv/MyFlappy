
var game = new Phaser.Game(400,490,Phaser.AUTO,'gameDiv');

var mainState = {
	
		preload: function () {
			
				// This gives backgroung features
				game.stage.backgroundColor = '#FF8465';
				game.load.image('bird','assets/bird.png');
				game.load.image('pipe','assets/pipe.png');
		},
		
		create: function () {
		
				//To create the bird
				game.physics.startSystem(Phaser.Physics.ARCADE);
				this.bird=this.game.add.sprite(100,245,'bird');
				//To make the bird move
				game.physics.arcade.enable(this.bird);
				//add score
				this.score = 0;
			
				//Add gravity in  y axis
				this.bird.body.gravity.y = 1000; // if -300 given, it will go up
				
				//To use space bar to make flappy bird in opposite of gravity
				// make a variable to use spacebar
				var spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				//To make the above variable workable
				spacekey.onDown.add(this.jump,this);
				
				
				//create pipe
				this.pipes = game.add.group();
				this.pipes.enableBody = true;
				//To create multiple pipes
				this.pipes.createMultiple(20,'pipe'); //This is considered as dead pipes, we need to make it visible one by one
				this.timer = game.time.events.loop(1500,this.addRowOfPipes,this);
				
				this.score = 0;
				this.labelScore = game.add.text(20, 20 , "0", {
						font: "30px Arial",
						fill: "#ffffff"
					});
		},
		
		
		
		
		// Function to add pipe one by one
		addOnePipe: function(x,y) {
			
				var pipe = this.pipes.getFirstDead();
				pipe.reset(x,y);
				pipe.body.velocity.x = -200;
				pipe.checkWorldBounds = true;
				pipe.outOfBoundsKill = true;
		},
		
		
		addRowOfPipes: function () {
			//pick where the hole will be
			var hole = Math.floor(Math.random()*5) + 1;
		
			//Add the six pipe
			for(var i=0;i<8;i++) {
					if(i != hole && i != hole + 1) {
							this.addOnePipe(400,i*60+10);
					}
			}
			this.score += 1;
			this.labelScore.text =this.score;
		},		
		
		
		
		
		update: function() {
		
				// If bird is out of the box, then gameover
				if(this.bird.inWorld == false) {
						this.restartGame();
						
				}	
				game.physics.arcade.overlap(this.bird,this.pipes,this.restartGame, null, this);
		},
		
		//create jump function to make jump possible
		jump: function() {
				this.bird.body.velocity.y = -350;
		},
		
		//We need a restart function
		restartGame: function() {
					game.state.start('main');
		}
	
};

// To load main stage
game.state.add('main',mainState);
game.state.start('main');	
