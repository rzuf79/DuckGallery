function ComponentSpriteText(lettersArray, imagesArray) {
	this.name = "Sprite Text";
	this.entity;
	this.text;
	this.image;
	this.scpaceSize = 10;
	this.imgs = {};

	this.create = function() {
		for (var i = 0; i < lettersArray.length; ++i) {
			this.imgs[lettersArray[i]] = chao.getImage(imagesArray[i]);
		}
	};

	this.draw = function() {
		if (this.image) {
			var entity = this.entity;
			var drawX = entity.screenX - (entity.screenWidth * entity.pivotX);
			var drawY = entity.screenY - (entity.screenHeight * entity.pivotY);

			chao.drawImage(chao.canvas, this.image, 
				drawX, drawY,
				entity.screenAlpha,
				entity.screenScaleX, entity.screenScaleY,
				entity.screenRotation, 0.5, 0.5);
		}
	};

	this.setText = function (newText) {
		if (newText === this.text) {
			return;
		}

		this.text = newText;

		var i;
		var sizeX = 0;
		var sizeY = 0;
		var currentX = 0;

		for (i = 0; i < newText.length; ++i) {
			var glyph = newText[i];
			if (glyph == ' ') {
				sizeX += this.scpaceSize;
			} else if (this.imgs[glyph]) {
				sizeX += this.imgs[glyph].width;
				sizeY = Math.max(sizeY, this.imgs[glyph].height);
			}
		}

		this.entity.width = sizeX;
		this.entity.height = sizeY;

		this.image = chao.createImage(undefined, sizeX, sizeY);

		for (i = 0; i < newText.length; ++i) {
			var glyph = newText[i];
			if (glyph == ' ') {
				currentX += this.scpaceSize;
			} else if (this.imgs[glyph]) {
				var posY = (this.image.height - this.imgs[glyph].height) / 2;
				chao.drawImage(this.image, this.imgs[glyph], currentX, posY);
				currentX += this.imgs[glyph].width;
			}
		}
	};

}