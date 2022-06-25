var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite (200,200,50,50);
  ghost.addImage ("ghost",ghostImg);
  ghost.scale = 0.5;
}

function draw() {
  background(200);
  if (gameState=="PLAY"){
  
  if(tower.y > 400){
      tower.y = 300
    }

   spawnDoor(); 

   if (keyDown("left_arrow")){
     ghost.x = ghost.x-5  ;
   }

   if (keyDown("right_arrow")){
    ghost.x=ghost.x+5;
   }

   if (keyDown("space")){
    ghost.velocityY-=10;
   }
   
   ghost.velocityY += 0.8;

   if (climbersGroup.isTouching (ghost)){
    ghost.velocityY = 0;
   }

   if (invisibleBlockGroup.isTouching (ghost)|| ghost.y>600){
    ghost.detroy();
    gameState= "END";
   }


   drawSprites();
}
   if (gameState=="END"){
    stroke ("yellow")
    fill("yellow");
    textSize(30);
    text ("Game Over",200,200)
   }
}

function spawnDoor(){
 
  if (frameCount % 240===0){
    door = createSprite(200,-50);
    door.addImage ("door",doorImg);
    door.x = (Math.round (random(100,500)));
    door.velocityY = 1;
    doorsGroup.add (door);
    door.lifetime = 800;

    climber = createSprite(200,10);
    climber.addImage ("climber",climberImg);
    climber.velocityY= 1;
    climber.lifetime = 800;
    climbersGroup.add (climber);
    climber.x = door.x;

    invisibleBlock = createSprite (200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add (invisibleBlock);
    invisibleBlock.debug = true ; 

    
    ghost.depth = door.depth;
    ghost.depth += 1 ;
  }
  
}



