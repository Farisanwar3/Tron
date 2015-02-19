
// Define our main state
var main = {
  preload: function() {
    // This function will be executed at the beginning     
        // That's where we load the game's assets  
		game.load.image('paddle', 'assets/bikepaddle.png');
		game.load.image('brick', 'assets/robotbrick1.png');
		game.load.image('ball', 'assets/ball2.png');
		game.load.image('background', 'assets/background.jpg');
  },

  create: function() { 
    // This function is called after the preload function     
        // Here we set up the game, display sprites, etc. 
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.cursor = game.input.keyboard.createCursorKeys();
		game.add.sprite(0, 0, 'background');
		this.paddle = game.add.sprite(200, 400, 'paddle');
		game.physics.arcade.enable(this.paddle);
		this.paddle.body.immovable = true;
		this.score = 0;
		this.lives = 128;
		this.bricks = game.add.group();
		this.bricks.enableBody = true;
		this.numBricks = 0;
		this.numBricks = 24 + this.numBricks;
		for (var i = 0; i < 5; i++)
			for (var j = 0; j < 5; j++)
			    
				game.add.sprite(55+i*60, 55+j*35, 'brick', 0, this.bricks);
				this.numBricks++;
		
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(120+i*60, 110+j*35, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
				
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(55+i*90, 110+j*55, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(55+i*200, 110+j*55, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(55+i*200, 110+j*55, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(55+i*200, 110+j*55, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(85+i*200, 110+j*75, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(85+i*200, 130+j*75, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}	
		
		for (var i = 0; i < 5; i++){
			for (var j = 0; j < 5; j++){
				game.add.sprite(115+i*200, 175+j*75, 'brick', 0, this.bricks);
				this.numBricks++;
				}
			}
		
		this.bricks.setAll('body.immovable', true);
		
		//this.bg = this.game.add.tileSprite(0,0,1024,480,'background');
		//this.bg1Speed = 4;
		//this.bg.autoScroll(-this.bg1Speed,0);
		
		// Create the ball with physics
		this.ball = game.add.sprite(200, 300, 'ball');
		game.physics.arcade.enable(this.ball);

		// Add velocity to the ball
		this.ball.body.velocity.x = 250; 
		this.ball.body.velocity.y = 250;//200

		// Make the ball bouncy 
		this.ball.body.collideWorldBounds = true;
		this.ball.body.bounce.x = 1; //1
		this.ball.body.bounce.y = 1;//1
		this.paddle.body.collideWorldBounds = true;
		var style = { font: "25px Arial", fill: "#DE5F3D", align: "left" };
		this.livesText = this.game.add.text(0,28,"Ball hit by car : "+this.lives,style);
		this.scoreText = this.game.add.text(0,0,"Score : "+this.score,style);
		this.numBricksText = this.game.add.text(0,56,"Robots left to kill: "+this.numBricks,style);
  },

  update: function() {
    // This function is called 60 times per second    
        // It contains the game's logic     
		//game.physics.arcade.collide(this.paddle, this.ball);
		game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
		game.physics.arcade.collide(this.paddle,this.ball, this.ballHitbike,null, this);
		if (this.cursor.right.isDown) 
			this.paddle.body.velocity.x = 350;
		else if (this.cursor.left.isDown) 
			this.paddle.body.velocity.x = -350;
		else 
			this.paddle.body.velocity.x = 0;  
		
  },
  hit: function(ball, brick) {
			// When the ball hits a brick, kill the brick
			brick.kill();
			this.score += 50;
			this.numBricks--;
			this.numBricksText.setText("Robots left to kill: "+this.numBricks);
			if(this.numBricks == 0){
				var text = "- You're Winner: Play Again by hitting refresh";
				var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

				var t = game.add.text(game.world.centerX-300, 150, text, style)
				//this.game.state.start('menu');
				}
			this.scoreText.setText("Score : "+this.score);
			var text = "- Umma gonna kill ya all robots \n for killin lots of my fellow citizens and for messing the United States \n y'all robots are traitors okay";
			var style = { font: "19px Arial", fill: "#ff0044", align: "center" };

			var t = game.add.text(game.world.centerX-300, 0, text, style);
			
		},
	ballHitbike : function(paddle, ball) {
			this.lives -= 1;
			this.livesText.setText("Ball hit by car : "+this.lives);
			this.score += 250;
			this.scoreText.setText("Score : "+this.score);
			//this.ball.body.velocity.x = 250; 
			//this.ball.body.velocity.y = 250;//200
			if(this.lives == 0){
				var text = "- You've lost: please try again";
				var style = { font: "45px Arial", fill: "#ff0044", align: "center" };

				var t = game.add.text(game.world.centerX-300, 150, text, style);
				this.game.state.start('menu');
				}
		},
		
};
var menuState = {
		preload : function(){
			game.load.image('background', 'assets/background.jpg');
		},

		create : function(){
			this.speed = 10;

			this.bg = this.game.add.tileSprite(0,0,1024,480,'background');
			this.bg.autoScroll(-this.speed,0);

			var style = { font: "48px Arial", fill: "#DE5F3D", align: "center" };
			this.title = this.game.add.text(250,170,"Breakout: Tron Style",style);

			var style2 = { font: "28px Arial", fill: "#DE5F3D", align: "center" };
			this.help = this.game.add.text(250,230,"Press enter to to play",style2);
		},

		update : function(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
				this.game.state.start('main');
		    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.P))
				this.game.state.start('menu');
		    
		}
	}
// Initialize Phaser, and start our 'main' state 
//var game = new Phaser.Game(400, 450, Phaser.AUTO, 'gameDiv');
var WIDTH = 1024;
	var HEIGHT = 480;
	//increase bullet capacity when you hit a heart
	//
	var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameDiv');
game.state.add('menu', menuState);
game.state.add('main', main);
game.state.start('menu');
