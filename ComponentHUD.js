function ComponentHUD() {
	this.name = "HUD";
	this.entity;
	this.textScore;

	this.create = function() {
		var entity = this.entity;

		entity.makeFullscreen();

		this.textScore = this.createFancyText("0", Reg.glyphsImagesLarge);
		this.textScore.entity.pivotX = this.textScore.entity.pivotY = 0.0;

		var kenneyButton = chao.helpers.createButton(entity, "Button Kenney", 0, 0, "kenney_logo");
		kenneyButton.entity.alignToParent(1.0, 1.0, 1.0, 1.0, -5, -5);
		kenneyButton.onReleased.subscribe(this.onKenneyButtonClicked);

		var chaoButton = chao.helpers.createButton(entity, "Button Chao", 0, 0, "chao_logo");
		chaoButton.entity.alignToParent(0.0, 1.0, 0.0, 1.0, 5, -5);
		chaoButton.onReleased.subscribe(this.onChaoButtonClicked);
	};

	this.setScore = function(amount) {
		var txt = this.textScore;
		
		txt.setText("" + amount);

		ComponentTween.removeTweensFromEntity(txt.entity);
		var animTime = 0.25;
		var scaleFrom = 1.5;
		var rotationFrom = chao.getRandomRange(-20, 20);
		ComponentTween.addTween(txt.entity, "scaleX", scaleFrom, 1.0, animTime, chao.INTERPOLATE_EASE_TO);
		ComponentTween.addTween(txt.entity, "scaleY", scaleFrom, 1.0, animTime, chao.INTERPOLATE_EASE_TO);
		ComponentTween.addTween(txt.entity, "rotation", rotationFrom, 0, animTime, chao.INTERPOLATE_EASE_TO);
	};

	this.spawnFloatingScore = function(screenX, screenY, amount) {
		var newText = this.createFancyText(""+amount, Reg.glyphsImagesSmall);
		newText.entity.screenX = screenX;
		newText.entity.screenY = screenY - 50;

		var animTime = 0.8;
		var fadeOutTime = animTime * 0.5;
		var fadeOutDelay = animTime * 0.5;
		ComponentTween.addTween(newText.entity, "y", newText.entity.y, newText.entity.y - 100, animTime,
			chao.INTERPOLATE_EASE_TO, chao.REPEAT_MODE_ONCE, 0, this.onFloatingScoreAnimFinished);
		ComponentTween.addTween(newText.entity, "alpha", 1, 0, animTime * fadeOutTime,
			chao.INTERPOLATE_LINEAR, chao.REPEAT_MODE_ONCE, animTime * fadeOutDelay);
		ComponentTween.addTween(newText.entity, "scaleX", 1, 1.25, animTime * fadeOutTime,
			chao.INTERPOLATE_LINEAR, chao.REPEAT_MODE_ONCE, animTime * fadeOutDelay);
		ComponentTween.addTween(newText.entity, "scaleY", 1, 1.25, animTime * fadeOutTime,
			chao.INTERPOLATE_LINEAR, chao.REPEAT_MODE_ONCE, animTime * fadeOutDelay);
	};

	this.onFloatingScoreAnimFinished = function(tween) {
		chao.destroyEntity(tween.target);
	};

	this.createFancyText = function(text, glyphs) {
		glyphs = glyphs || Reg.glyphsImagesSmall;
		var newText = this.entity.addWithComponent("Text Score", new ComponentSpriteText(Reg.glyphsLetters, glyphs));
		newText.setText(text);
		return newText;
	};

	this.onKenneyButtonClicked = function(button) {
		window.open(Reg.KENNEY_URL, '_blank');
	};

	this.onChaoButtonClicked = function(button) {
		window.open(Reg.CHAO_URL, '_blank');
	};

}