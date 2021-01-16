function ComponentStall() {
	this.name = "Stall";
	this.entity = null;

	this.background;
	this.middleground;
	this.foreground;
	this.gameplayLayers = [ null, null, null ];

	this.cloudTimer = 0.0;

	this.create = function() {
		var entity = this.entity;

		entity.makeFullscreen();

		// layers
		this.background = entity.add(new Entity("BACKGROUND"));
		this.middleground = entity.add(new Entity("MIDDLEGROUND"));
		this.foreground = entity.add(new Entity("FOREGROUND"));
		this.background.makeFullscreen();
		this.middleground.makeFullscreen();
		this.foreground.makeFullscreen();

		// background
		var backgroundImage = chao.createTiledImage("bg_wood", undefined, 3, 2);
		var backgroundSprite = chao.helpers.createSprite(this.background, "Background", backgroundImage);
		backgroundSprite.entity.alignToParent();

		// foreground
		var bottomRack = chao.helpers.createSprite(this.foreground, "Bottom Rack", "bottom_rack");
		bottomRack.entity.scaleX = 7.0;
		bottomRack.entity.alignToParent(0.5, 1.0, 0.5, 1.0, 0, 30);

		var courtainL = chao.helpers.createSprite(this.foreground, "Courtain L", "curtain");
		var courtainR = chao.helpers.createSprite(this.foreground, "Courtain R", "curtain");
		var courtainRopeL = chao.helpers.createSprite(courtainL.entity, "Courtain Rope", "curtain_rope");
		var courtainRopeR = chao.helpers.createSprite(courtainR.entity, "Courtain Rope", "curtain_rope");
		courtainL.entity.alignToParent(0, 0, 0.2, 0);
		courtainR.flipX = true;
		courtainR.entity.alignToParent(1, 0, 0.8, 0);
		courtainRopeL.entity.alignToParent(0.1, 0.5, 0.5, 0.5, 0, 5);
		courtainRopeR.entity.alignToParent(0.9, 0.5, 0.5, 0.5, 0, 5);

		var courtainTopImage = chao.createTiledImage("curtain_top", undefined, 4, 1);
		var courtainTop = chao.helpers.createSprite(this.foreground, "Courtain Top 2", courtainTopImage);
		courtainTop.entity.alignToParent(0.5, 0.0, 0.5, 0.0, 0, 45);

		var courtainTopStraightImage = chao.createTiledImage("curtain_straight", undefined, 3, 1);
		var courtainTopStraight = chao.helpers.createSprite(this.foreground, "Courtain Top 1", courtainTopStraightImage);
		courtainTopStraight.entity.alignToParent(0.5, 0.0, 0.5, 0.0);

		// gameplay objects layers with moving layers inbetween

		var tree1 = chao.helpers.createSprite(this.middleground, "Tree", "tree_pine", 130, 120);
		tree1.entity.rotation = -10;
		var tree2 = chao.helpers.createSprite(this.middleground, "Tree", "tree_oak", 510, 120);
		tree2.entity.rotation = 10;
		this.gameplayLayers[0] = this.middleground.add(new Entity("Gameplay Layer 1"));
		var grass = this.middleground.addWithComponent(new Entity("Waves"), new ComponentWave("grass2", 300, 0.0));
		this.gameplayLayers[1] = this.middleground.add(new Entity("Gameplay Layer 2"));
		this.middleground.addWithComponent(new Entity("Waves"), new ComponentWave("water1", 370, Math.PI*0.6));
		this.gameplayLayers[2] = this.middleground.add(new Entity("Gameplay Layer 2"));
		this.middleground.addWithComponent(new Entity("Waves"), new ComponentWave("water2", 400, Math.PI*1.2));
		this.gameplayLayers[0].makeFullscreen();
		this.gameplayLayers[1].makeFullscreen();
		this.gameplayLayers[2].makeFullscreen();
		grass.amplitude.x = grass.amplitude.y = 0;

		// populate background with some clouds
		this.spawnCloud(chao.screenWidth * 0.3);
		this.spawnCloud(chao.screenWidth * 0.65);
	};

	this.update = function() {
		// clouds spawning
		this.cloudTimer -= chao.getTimeDelta();
		if (this.cloudTimer <= 0.0) {
			this.cloudTimer = chao.getRandomRange(10, 15);
			var cloudPosX = chao.getRandomRange(80, 150);
			var newCloud = this.spawnCloud(chao.screenWidth);
			newCloud.x += newCloud.entity.width * 0.5;
		}
	};

	this.addToBackground = function(entity) {
		this.background.add(entity);
	};

	this.addToGameplayLayer = function(layerId, entity) {
		this.gameplayLayers[layerId].add(entity);
	};

	this.spawnCloud = function(posX) {
		var cloudImage = chao.coinFlip() ? "cloud1" : "cloud2";
		var cloudPosY = chao.getRandomRange(80, 150);
		var cloudSpeed = chao.getRandomRange(20, 30);
		var newCloud = (new Entity("Cloud").addComponent(new ComponentCloud(cloudImage, posX, cloudPosY, cloudSpeed)));
		this.addToBackground(newCloud.entity);
		return newCloud;
	};

}