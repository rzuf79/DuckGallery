function ComponentCloud(imageKey, posX, posY, speed){
	this.name = "Cloud";
	this.entity = null;

	this.create = function(){
		var entity = this.entity;
		entity.addComponent(new ComponentSprite(imageKey));
		entity.x = posX;
		entity.y = posY;
		var bounceAmplitude = chao.getRandomRange(5, 15);
		var bounceTime = chao.getRandomRange(0.5, 1.5);
		ComponentTween.addTween(entity, "rotation", -bounceAmplitude, bounceAmplitude, bounceTime, chao.INTERPOLATE_SMOOTH, chao.REPEAT_MODE_BOUNCE);
	}

	this.destroy = function(){
		//
	}

	this.draw = function(){
		//
	}

	this.update = function(){
		var entity = this.entity;
		entity.x -= chao.getTimeDelta() * speed;
		if (entity.x < -entity.width * 0.5) {
			chao.destroyEntity(entity);
		}
	}

}