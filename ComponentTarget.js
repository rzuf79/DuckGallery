function ComponentTarget(game, imageFront, imageBack, y, flip) {
	this.onShot = chao.makeSignal();

	this.name = "Target";
	this.entity;

	this.spriteTarget;
	this.spriteStick;
	this.decals;
	this.health = 5;
	this.brokenStickImg;

	this.create = function() {
		var entity = this.entity;

		game.onGunFired.subscribe(this.onGunFired, this);

		this.spriteStick = chao.helpers.createSprite(entity, "Stick", "stick_wood_outline");
		this.spriteTarget = chao.helpers.createSprite(this.spriteStick.entity, "Target", imageFront);
		this.spriteStick.entity.alignToParent(0.5, 1.0, 0.5, 0.0);
		this.spriteTarget.entity.alignToParent(0.5, 0.0, 0.5, 0.95);
		this.spriteTarget.flipX = flip;

		this.decals = this.spriteTarget.entity.add(new Entity("Decals"));

		if (chao.coinFlip) {
			ComponentTween.addTween(entity, "rotation", -10, 10, 2.0, chao.INTERPOLATE_SMOOTH, chao.REPEAT_MODE_BOUNCE);
		}

		if (chao.coinFlip) {
			ComponentTween.addTween(entity, "y", y-20, y+20, 1.5, chao.INTERPOLATE_SMOOTH, chao.REPEAT_MODE_BOUNCE);
		}
	};

	this.remove = function () {
		game.onGunFired.unsubscribe(this.onGunFired);
	};

	this.destroy = function() {
		game.onGunFired.unsubscribe(this.onGunFired);
	};

	this.update = function() {
		var entity = this.entity;
		var speed = chao.getTimeDelta() * 50.0;
		entity.x += flip ? -speed : speed;
		if (entity.x > chao.screenWidth + this.getWidth()
			|| entity.x < -this.getWidth()) {
			chao.destroyEntity(entity);
		}
	};

	this.getWidth = function() {
		return this.spriteTarget.entity.width;
	};

	this.onGunFired = function() {
		var target = this.spriteTarget;
		if (target.entity.isPointInside(chao.mouse.x, chao.mouse.y)) {
			this.health --;

			game.particlePlayer.spawnSmoke(this.entity.parent, chao.mouse.x, chao.mouse.y);

			this.onShot.fire(this, this.health <= 0);

			if (this.health > 0) {
				this.spawnDecal();
				chao.helpers.shake(target.entity, 6, 0.25, true);

				this.setFrontVisible(true);
				var animTime = 0.1;

				ComponentTween.removeTweensFromEntity(target.entity);

				ComponentTween.addTween(target.entity, "scaleX", 1.0, 0.01, animTime, 
						chao.INTERPOLATE_EASE_FROM, chao.REPEAT_MODE_ONCE, 0, this.hideFront.bind(this));
				ComponentTween.addTween(target.entity, "scaleX", 0.01, 1.0, 
						animTime, chao.INTERPOLATE_LINEAR, chao.REPEAT_MODE_ONCE, animTime);
				ComponentTween.addTween(target.entity, "scaleX", 1.0, 0.01, 
						animTime, chao.INTERPOLATE_LINEAR, chao.REPEAT_MODE_ONCE, animTime*2, this.showFront.bind(this));
				ComponentTween.addTween(target.entity, "scaleX", 0.01, 1.0, 
						animTime, chao.INTERPOLATE_EASE_TO, chao.REPEAT_MODE_ONCE, animTime*3);
				
				chao.helpers.shake(this.spriteStick.entity, 6, 0.25, true);
			} else {
				game.particlePlayer.spawnSplinters(this.entity.parent, 
					this.spriteTarget.entity.screenX,
					this.spriteTarget.entity.screenY);
				game.onGunFired.unsubscribe(this.onGunFired);
				target.entity.visible = false;
				this.spriteStick.setImage("stick_wood_outline_broken");
				chao.helpers.shake(this.spriteStick.entity, 8, 0.8, true);
			}
		}
	};

	this.hideFront = function(tween) {
		this.setFrontVisible(false);
	};

	this.showFront = function(tween) {
		this.setFrontVisible(true);
	};

	this.setFrontVisible = function(value) {
		this.spriteTarget.setImage(value ? imageFront : imageBack);
		this.spriteTarget.flipX = flip && value;
		this.decals.visible = value;
	};

	this.spawnDecal = function() {
		var newDecal = chao.helpers.createSprite(this.decals, "Decal", "shot_blue_small");
		newDecal.entity.screenX = chao.mouse.x;
		newDecal.entity.screenY = chao.mouse.y;
		newDecal.entity.scaleX = newDecal.entity.scaleY = chao.getRandomRange(0.8, 1.0);
	};

}