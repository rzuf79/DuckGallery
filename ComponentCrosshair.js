function ComponentCrosshair(){
	this.name = "Crosshair";
	this.entity = null;

	this.create = function(){
		var entity = this.entity;
		entity.addComponent(new ComponentSprite("crosshair_outline_large"));
	}

	this.destroy = function(){
		//
	}

	this.draw = function(){
		//
	}

	this.update = function(){
		var entity = this.entity;
		entity.x = chao.mouse.x;
		entity.y = chao.mouse.y;
	}

	this.bounce = function() {
		var tweenTime = 0.2;
		var rotationFrom = chao.coinFlip() ? -30 : 30;
		ComponentTween.removeTweensFromEntity(this.entity);
		ComponentTween.addTween(this.entity, "scaleX", 1.5, 1.0, tweenTime, chao.INTERPOLATE_EASE_TO);
		ComponentTween.addTween(this.entity, "scaleY", 1.5, 1.0, tweenTime, chao.INTERPOLATE_EASE_TO);
		ComponentTween.addTween(this.entity, "rotation", rotationFrom, 0, tweenTime, chao.INTERPOLATE_EASE_TO);
	}

}