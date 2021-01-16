function ComponentParticlePlayer() {
	this.name = "Particle Player";
	this.entity;

	this.spawnParticle = function(parent, image, x, y) {
		var newParticle = (new Entity("Particle").addComponent(new ComponentParticle(image)));
		parent.add(newParticle.entity);
		newParticle.entity.screenX = x;
		newParticle.entity.screenY = y;
		return newParticle;
	};

	this.spawnSmoke = function(parent, x, y) {
		var smokeImages = [ "smoke_01", "smoke_02", "smoke_03", "smoke_04" ];
		var img = chao.getRandomElement(smokeImages);
		var newParticle = this.spawnParticle(parent, img, x, y);

		newParticle.fadeOutMode = ComponentParticle.FADE_MODE_LINEAR;
		newParticle.velocity.x = chao.getRandomRange(-10, 10);
		newParticle.velocity.y = chao.getRandomRange(-10, -15);
		newParticle.acceleration.y = -1;
		newParticle.scaleVel = 4.0;
		newParticle.scaleAcc = -0.5;
		newParticle.lifetime = 0.6;
	};

	this.spawnMuzzle = function(parent, x, y) {
		var newParticle = this.spawnParticle(parent, "muzzle", x, y);
		newParticle.lifetime = 0.1;
		newParticle.entity.rotation = chao.getRandom(360);
		newParticle.entity.scaleX = newParticle.entity.scaleY = chao.getRandomRange(1.5, 2.0);
	};

	this.spawnTrace = function(parent, x, y) {
		var newParticle = this.spawnParticle(parent, "trace", x, y);
		newParticle.fadeOutMode = ComponentParticle.FADE_MODE_LINEAR;
		newParticle.lifetime = 0.5;
		newParticle.velocity.y = -50;
		newParticle.scaleVel = 4.0;
	};

	this.spawnSplinters = function(parent, x, y) {
		for (var i = 0; i < 8; ++i) {
			var posX = x + chao.getRandomRange(-10, 10);
			var posY = y + chao.getRandomRange(-10, 10);
			var newParticle = this.spawnParticle(parent, "splinter", posX, posY);
			newParticle.entity.scaleX = newParticle.entity.scaleY = 0.5;
			newParticle.fadeOutMode = ComponentParticle.FADE_MODE_NONE;
			newParticle.lifetime = 1.0;
			newParticle.velocity.x = Math.sin(chao.getRandom(Math.PI*2)) * 300;
			newParticle.velocity.y = Math.cos(chao.getRandom(Math.PI*2)) * 300;
			newParticle.velocityDamping = 100.0;
			newParticle.scaleVel = -1.0;
			newParticle.rotationVel = chao.getRandomRange(-1000, 1000);
		}
	};

}