function StateGame(){
	this.onGunFired = chao.makeSignal();

	this.camera;
	this.stall;
	this.gun;
	this.hud;
	this.crosshair;
	this.particlePlayer;

	this.score = 0;

	this.create = function(){
		this.camera = this.addWithComponent(new Entity("Camera"), new ComponentCamera());
		this.camera.entity.makeFullscreen();

		this.stall = this.camera.entity.addWithComponent(new Entity("Stall"), new ComponentStall());

		this.gun = this.camera.entity.addWithComponent(new Entity("Gun"), new ComponentGun(this));

		this.hud = this.addWithComponent(new Entity("HUD"), new ComponentHUD());

		this.crosshair = this.hud.entity.addWithComponent(new Entity("Crosshair"), new ComponentCrosshair());

		this.particlePlayer = this.addWithComponent(new Entity("Particle Player"), new ComponentParticlePlayer());

		this.addWithComponent(new Entity("Target Spawner"), new ComponentTargetSpawner(this, this.stall));

		// chao.helpers.createFpsCounter(this, 16);
	};

	this.update = function(){
		var cam = this.camera.entity;

		if (chao.justPressed[chao.KEY_L]) {
			chao.logHierarchy(this.rootEntity);
		}

		if (chao.mouse.justPressed || chao.justPressed[chao.KEY_SPACE]) {
			chao.helpers.shake(cam, 2, 0.1, true);
			this.crosshair.bounce();
			this.gun.shoot();
			this.onGunFired.fire();
		}
	};

	this.addScore = function(amount, target) {
		this.score += amount;
		this.hud.setScore(this.score);
		this.hud.spawnFloatingScore(target.entity.screenX, target.entity.screenY, amount);
	};

	this.getMouseOffset = function() {
		// -1 to 1
		var screenMid = chao.screenWidth / 2;
		var cursorDistance = chao.clamp(chao.mouse.x - screenMid, -screenMid, screenMid);
		return cursorDistance / screenMid;
	};

}