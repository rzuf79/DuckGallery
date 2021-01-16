function ComponentWave(imageKey, posY, bounceTime){
	this.name = "Wave";
	this.entity = null;

	this.pos;
	this.timer = bounceTime;
	this.sprite;
	this.amplitude = { x: 15, y: 10 };

	this.create = function(){
		var entity = this.entity;
		var img = chao.getImage(imageKey);
		var tilesX = Math.ceil(chao.screenWidth / img.width) + 1;
		var tiledImage = chao.createTiledImage(imageKey, undefined, tilesX, 1);
		
		this.sprite = entity.addComponent(new ComponentSprite(tiledImage));
		entity.alignToParentHorizontally();
		entity.y = posY;
		this.pos = chao.makePoint(entity.x, entity.y);
	}

	this.destroy = function(){
		//
	}

	this.draw = function(){
		//
	}

	this.update = function(){
		var entity = this.entity;
		this.timer += chao.getTimeDelta() * 2.0;

		entity.x = this.pos.x +	Math.sin(this.timer) * this.amplitude.x;
		entity.y = this.pos.y +	Math.cos(this.timer*1.23) * this.amplitude.y;
	}

}