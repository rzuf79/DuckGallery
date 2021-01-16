"use strict";
function ComponentTargetSpawner(game, stall) {
	this.name = "Spawner";
	this.entity;

	this.targetTimer = 5;
	this.duckTimer1 = 0;
	this.duckTimer2 = 0;

	this.update = function() {
		this.targetTimer -= chao.getTimeDelta();
		if (this.targetTimer <= 0) {
			this.targetTimer = chao.getRandomRange(5, 10);
			this.spawnTarget();
		}

		this.duckTimer1 -= chao.getTimeDelta();
		if (this.duckTimer1 <= 0) {
			this.duckTimer1 = chao.getRandomRange(5, 10);
			this.spawnDuck(1);
		}

		this.duckTimer2 -= chao.getTimeDelta();
		if (this.duckTimer2 <= 0) {
			this.duckTimer2 = chao.getRandomRange(5, 10);
			this.spawnDuck(2);
		}
	};

	this.spawnTarget = function() {
		var targetImg = chao.getRandomElement( 
			[ "target_white_outline", "target_red1_outline", "target_red2_outline",
			"target_red3_outline", "target_colored_outline" ] );
		var newTarget = (new Entity("Target").addComponent(new ComponentTarget(game, targetImg, "target_back_outline", 170)));
		stall.addToGameplayLayer(0, newTarget.entity);
		newTarget.entity.x = -newTarget.getWidth();
		newTarget.onShot.subscribe(this.targetShot, this);
	};

	this.spawnDuck = function(layer) {
		var flipped = layer == 1
		var posY = layer == 1 ? 230 : 280;
		var duckImg = chao.getRandomElement( [ "duck_outline_brown", "duck_outline_yellow", "duck_outline_white" ] );
		var newTarget = (new Entity("Target").addComponent(new ComponentTarget(game, duckImg, "duck_outline_back", posY, flipped)));
		stall.addToGameplayLayer(layer, newTarget.entity);
		if (layer == 1) {
			newTarget.entity.x = chao.screenWidth + newTarget.getWidth() * 0.5;
		} else {
			newTarget.entity.x = -newTarget.getWidth()*0.5			
		}
		newTarget.onShot.subscribe(this.targetShot, this);
	};

	this.targetShot = function(target, dead) {
		game.addScore(dead ? Reg.POINTS_KILL : Reg.POINTS_SHOT, target);
	};

}