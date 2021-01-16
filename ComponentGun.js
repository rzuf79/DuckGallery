function ComponentGun(game) {
	this.MUZZLE_X = 60;

	this.name = "Gun";
	this.entity;

	this.sprite;
	this.pos = { x: 0, y: 0 };
	this.muzzle;

	this.create = function() {
		var entity = this.entity;

		entity.alignToParent(0.5, 1.0, 0.5, 1.0);
		this.pos.x = entity.x
		this.pos.y = entity.y

		this.muzzle = new Entity("Muzzle", -this.MUZZLE_X, -125);
		entity.add(this.muzzle);
		this.sprite = chao.helpers.createSprite(entity, "Sprite", "rifle", 0, 20);
		
		ComponentTween.addTween(entity, "y", this.pos.y+20, this.pos.y+30, 1.0, chao.INTERPOLATE_SMOOTH, chao.REPEAT_MODE_BOUNCE);
		
	}

	this.remove = function () {
		//
	}

	this.destroy = function() {
		//
	}

	this.draw = function() {
		//
	}

	this.update = function() {
		var entity = this.entity;
		var mouseOffset = game.getMouseOffset();
		this.sprite.flipX = mouseOffset > 0.0;

		this.muzzle.x = this.sprite.flipX ? this.MUZZLE_X : -this.MUZZLE_X; //haha

		entity.x = chao.interpolate(entity.x, this.pos.x + mouseOffset * 20.0, chao.getTimeDelta() * 10);
	}

	this.shoot = function() {
		var tweenTime = 0.2;
		var sprite = this.sprite.entity;
		ComponentTween.removeTweensFromEntity(sprite);
		ComponentTween.addTween(sprite, "scaleX", 1.1, 1.0, tweenTime, chao.INTERPOLATE_EASE_TO);
		ComponentTween.addTween(sprite, "scaleY", 1.1, 1.0, tweenTime, chao.INTERPOLATE_EASE_TO);
		ComponentTween.addTween(sprite, "y", 40, 20, tweenTime, chao.INTERPOLATE_EASE_TO);

		game.particlePlayer.spawnMuzzle(this.muzzle, this.muzzle.screenX, this.muzzle.screenY);
		game.particlePlayer.spawnTrace(this.entity.parent, this.muzzle.screenX, this.muzzle.screenY + 20);
	}

}