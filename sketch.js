var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,150);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY = 1;
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.debug = true;
  frog.setCollider("rectangle",0,0,300,300);
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup = new Group();
}

function draw(){
  background("red");
  drawSprites();
    
  if (gameState === "play") 
  {
    
    if(keyDown("left_arrow"))
    {
        frog.x = frog.x - 3;
    }
    if(keyDown("right_arrow"))
    {
        frog.x = frog.x + 3;
    }
    if(keyDown("space"))
    {
        frog.velocityY = -10;
    }
    frog.velocityY = frog.velocityY + 0.8;

    if(climbersGroup.isTouching(frog))
    {
      frog.velocityY = 0;
    }
   
    if(ocean.y>300)
    {
       ocean.y=150;
    }

    spawnCoin();

    if(coinGroup.isTouching(frog))
    {
      coinGroup.destroyEach();
      score = score + 1;
      console.log(score);
    }

    if(frog.y>470)
    {
      frog.destroy();
      gameState= "end"

    }
    fill("red")
    textSize(20);
    text("SCORE : "+score, 250,20);
  }
  
  if (gameState === "end")
  {
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250)
      ocean.setVelocity(0,0);
      coinGroup.destroyEach();
      climbersGroup.destroyEach();
  }
 

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    coin = createSprite (Math.round(random(40,530)), -50,50,50);
    coin.addImage("coin",coinImg);
    coin.debug = true;
    coin.setCollider("circle",0,0,150);
    coin.scale = 0.09;
    coin.velocityY = 1;
    coinGroup.add(coin);
    
    climber = createSprite(coin.x,0,50,50);
    climber.addImage("climber",climberImg);
    climber.debug = true;
    climber.setCollider("rectangle",0,0,350,100);
    climber.scale = 0.3;
    climber.velocityY = 1;
    climbersGroup.add(climber);

    coin.lifetime = 500;
    climber.lifetime = 500;
   
   
  }
}

