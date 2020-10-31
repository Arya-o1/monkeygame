var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_end;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey_end = loadAnimation("sprite_6.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 500);
  monkey = createSprite(100, 300, 20, 50);

  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("end", monkey_end);
  monkey.scale = 0.2;
  monkey.setCollider("rectangle", -10, 0, 400, 600, 0)

  ground = createSprite(300, 380, 600, 10);

  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  score = 0;
  gameState = PLAY;
}


function draw() {
  background("white");
  textSize(20);
  monkey.collide(ground);


  if (gameState === PLAY) {
    
    text("SURVIAL TIME: " + score, 230, 100);

    //scoring
    score = score + Math.round(getFrameRate() / 60);


    //jump when the space key is pressed
    if (keyWentDown("space") && monkey.y >= 310) {
      monkey.velocityY = -15;
    }

    if (FoodGroup.isTouching(monkey)) {
      // console.log("good to go");
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;

    }

    
    make_banana();
    make_obstacles();

  } else if (gameState === END) {
    monkey.changeAnimation("end", monkey_end);
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    text("SURVIAL TIME: " + score, 230, 100);
    
    text("Press 'space' to restart",200,200);
    if (keyWentDown("space")){
      reset();
    }
  }

  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8

  drawSprites();
  // monkey.debug = true;
}


function reset(){
  gameState = PLAY;
  score = 0
  monkey.changeAnimation("running", monkey_running); 
}

function make_banana() {
  if (frameCount % 130 === 0 || frameCount===10) {
    banana = createSprite(630, 250);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1
    banana.velocityX = -5;
    banana.lifetime = 250;  
    // banana.debug = true;
    FoodGroup.add(banana);


  }

}

function make_obstacles() {
  if (frameCount % 130 === 0 || frameCount===10) {
    obstacle = createSprite(630, 355);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 250;
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200);
    obstacleGroup.add(obstacle);
  }

}