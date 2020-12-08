var climber,climberImage;
var door,doorImage;
var ghost, ghostImage;
var spookySound;
var tower,towerImage;
var edges;
var doorsGroup;
var climbersGroup;
var invisibleBlockGroup;
var gameState="PLAY";

function preload(){
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  
  spookySound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,20,20);
  tower.addImage("tower",towerImage);
  tower.velocityY=+7;
  
  ghost=createSprite(200,200,15,15);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.4;
  
  
  edges=createEdgeSprites();
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw(){
  background("lightblue");
  if(gameState==="PLAY"){
    
  console.log(mouseX,mouseY);
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("up")){
    ghost.velocityY=-3;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  
  if(keyDown("right")){
     ghost.x=ghost.x+3;
     }
  
  if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
    ghost.destroy();
    gameState="END";
    
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  ghost.collide(edges[0]);
  ghost.collide(edges[1]);
  
  spawnDoors();
  drawSprites();
}
  if(gameState==="END"){
    textSize(40);
    text("game over",200,300);
  }
}

function spawnDoors(){
  if(frameCount%240===0){
  
  door=createSprite(Math.round(random(100,500)),-50,20,20)
  door.addImage("door",doorImage);
  door.velocityY=4;
  door.lifetime=200;
  doorsGroup.add(door); 
    
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  
  climber=createSprite(62,10,20,20)
  climber.addImage("climber",climberImage);
  climber.velocityY=4;
  climber.lifetime=200;
  climbersGroup.add(climber);  
  climber.x=door.x;
    
  invisibleBlock=createSprite(62,20,100,20)
  invisibleBlock.velocityY=4;
  invisibleBlock.lifetime=200;
  invisibleBlockGroup.add(invisibleBlock);  
  invisibleBlock.x=door.x;
  invisibleBlock.visible=false;
  invisibleBlock.debug=true;
}
}
  