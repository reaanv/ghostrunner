var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start"          

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
  ghost=createSprite(300,300)
  ghost.scale=0.4
  ghost.addImage("ghost",ghostImg)
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
  ghost.debug=false
  ghost.setCollider("circle",0,0,111)
}

function draw() {
  background(200);
  drawSprites()
  if(gameState==="start")
  {
    stroke("blue")
    textSize(30)
    text(" click mouse to start",200,200)
  }
  if (mousePressedOver(tower))
  {
gameState="play"
  }
  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    
    }
    if(keyDown("space")||keyDown ("UP_ARROW")){
      ghost.velocityY=-5
    }
               
    if(keyDown(LEFT_ARROW))
    {
    ghost.x-=5
    }
    if(keyDown(RIGHT_ARROW))
    {
      ghost.x+=5
      
    }
  
ghost.velocityY+=0.8
spawnDoors()
  
 if(climbersGroup.isTouching(ghost))
 {
  ghost.velocityY=0
  
 }
 if(ghost.isTouching(invisibleBlockGroup)||ghost.y>650)
 {
  gameState="end"
 }
  }
  if(gameState==="end")
  {
    stroke("red")
    textSize(30)
    text(" you died your bad",200,200)
  ghost.velocityY=0
  tower.velocityY=0
  climbersGroup.destroyEach()
  doorsGroup.destroyEach()
  }


  }
  function spawnDoors()
  {
    if(frameCount%190===0){
      door=createSprite(Math.round(random(90,500)),0)
      door.addImage("door",doorImg)
      door.velocityY=2.5
      door.lifetime=200
      climber=createSprite(door.x,50)
      climber.addImage("climer",climberImg)
      climber.velocityY=2.5
      climbersGroup.add(climber)
      door.depth=ghost.depth 
      ghost.depth+=1 
      invisibleBlock=createSprite(climber.x,60,climber.width,10)   
      invisibleBlock.visible=true
      invisibleBlockGroup.add(invisibleBlock)
      invisibleBlock.velocityY=2.5
    }
  }

                                                        
  

