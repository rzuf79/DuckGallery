chao.init(640, 480, chao.SCALING_MODE_NONE, "canvas");
chao.backgroundColor = "#000000";
chao.setImagesSmoothing(true);
chao.setMouseVisibility(false);

// ----- Them assets

// misc crap
chao.loadImage("kenney_logo", "assets/images/kenney_logo.png");
chao.loadImage("chao_logo", "assets/images/chao_logo.png");

// objects
chao.loadImage("duck_outline_back", "assets/images/objects/duck_outline_back.png");
chao.loadImage("duck_outline_brown", "assets/images/objects/duck_outline_brown.png");
chao.loadImage("duck_outline_white", "assets/images/objects/duck_outline_white.png");
chao.loadImage("duck_outline_yellow", "assets/images/objects/duck_outline_yellow.png");
chao.loadImage("rifle", "assets/images/objects/rifle.png");
chao.loadImage("shot_blue_small", "assets/images/objects/shot_blue_small.png");
chao.loadImage("stick_wood_outline_broken", "assets/images/objects/stick_wood_outline_broken.png");
chao.loadImage("stick_wood_outline", "assets/images/objects/stick_wood_outline.png");
chao.loadImage("target_back_outline", "assets/images/objects/target_back_outline.png");
chao.loadImage("target_colored_outline", "assets/images/objects/target_colored_outline.png");
chao.loadImage("target_red1_outline", "assets/images/objects/target_red1_outline.png");
chao.loadImage("target_red2_outline", "assets/images/objects/target_red2_outline.png");
chao.loadImage("target_red3_outline", "assets/images/objects/target_red3_outline.png");
chao.loadImage("target_white_outline", "assets/images/objects/target_white_outline.png");

// stall
chao.loadImage("bg_wood", "assets/images/stall/bg_wood.png");
chao.loadImage("bottom_rack", "assets/images/stall/bottom_rack.png");
chao.loadImage("cloud1", "assets/images/stall/cloud1.png");
chao.loadImage("cloud2", "assets/images/stall/cloud2.png");
chao.loadImage("curtain", "assets/images/stall/curtain.png");
chao.loadImage("curtain_rope", "assets/images/stall/curtain_rope.png");
chao.loadImage("curtain_straight", "assets/images/stall/curtain_straight.png");
chao.loadImage("curtain_top", "assets/images/stall/curtain_top.png");
chao.loadImage("grass1", "assets/images/stall/grass1.png");
chao.loadImage("grass2", "assets/images/stall/grass2.png");
chao.loadImage("tree_oak", "assets/images/stall/tree_oak.png");
chao.loadImage("tree_pine", "assets/images/stall/tree_pine.png");
chao.loadImage("water1", "assets/images/stall/water1.png");
chao.loadImage("water2", "assets/images/stall/water2.png");

// hud
chao.loadImage("crosshair_outline_large", "assets/images/hud/crosshair_outline_large.png");
chao.loadImage("text_0", "assets/images/hud/text_0.png");
chao.loadImage("text_0_small", "assets/images/hud/text_0_small.png");
chao.loadImage("text_1", "assets/images/hud/text_1.png");
chao.loadImage("text_1_small", "assets/images/hud/text_1_small.png");
chao.loadImage("text_2", "assets/images/hud/text_2.png");
chao.loadImage("text_2_small", "assets/images/hud/text_2_small.png");
chao.loadImage("text_3", "assets/images/hud/text_3.png");
chao.loadImage("text_3_small", "assets/images/hud/text_3_small.png");
chao.loadImage("text_4", "assets/images/hud/text_4.png");
chao.loadImage("text_4_small", "assets/images/hud/text_4_small.png");
chao.loadImage("text_5", "assets/images/hud/text_5.png");
chao.loadImage("text_5_small", "assets/images/hud/text_5_small.png");
chao.loadImage("text_6", "assets/images/hud/text_6.png");
chao.loadImage("text_6_small", "assets/images/hud/text_6_small.png");
chao.loadImage("text_7", "assets/images/hud/text_7.png");
chao.loadImage("text_7_small", "assets/images/hud/text_7_small.png");
chao.loadImage("text_8", "assets/images/hud/text_8.png");
chao.loadImage("text_8_small", "assets/images/hud/text_8_small.png");
chao.loadImage("text_9", "assets/images/hud/text_9.png");
chao.loadImage("text_9_small", "assets/images/hud/text_9_small.png");
chao.loadImage("text_cross", "assets/images/hud/text_cross.png");
chao.loadImage("text_cross_small", "assets/images/hud/text_cross_small.png");
chao.loadImage("text_dots", "assets/images/hud/text_dots.png");
chao.loadImage("text_dots_small", "assets/images/hud/text_dots_small.png");
chao.loadImage("text_plus", "assets/images/hud/text_plus.png");
chao.loadImage("text_plus_small", "assets/images/hud/text_plus_small.png");

// particles
chao.loadImage("smoke_01", "assets/images/particles/smoke_01.png");
chao.loadImage("smoke_03", "assets/images/particles/smoke_03.png");
chao.loadImage("smoke_02", "assets/images/particles/smoke_02.png");
chao.loadImage("smoke_04", "assets/images/particles/smoke_04.png");
chao.loadImage("muzzle", "assets/images/particles/muzzle.png");
chao.loadImage("trace", "assets/images/particles/trace.png");
chao.loadImage("splinter", "assets/images/particles/splinter.png");



// -----

chao.switchState(new StateGame());
