var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0

function preload(){
  sword_Image = loadImage("sword.png")
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")            
  monsterImage = loadAnimation("alien1.png","alien2.png")
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
}
function setup(){
  createCanvas(400,400)
  sword = createSprite(200,200,10,10)
  sword.addImage(sword_Image)
  sword.scale = 0.5
  fruitsGroup = new Group();
  enemyGroup = new Group();
  
  
  
  
}


function draw(){
  background("black")
  textSize(25)
  text("score = " + score , 200,50)
  
  
  if(gameState===PLAY){
    fruits();
    enemy();
    sword.x = mouseX
  sword.y = mouseY
    if (fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 1
    }
    else {
      if(enemyGroup.isTouching(sword)){
        gameState = END
        fruitsGroup.destroyEach();
        enemyGroup.destroyEach();
        sword.addImage(gameOverImage)
        sword.x = 200
        sword.y = 200
        gameOverSound.play();
      }
      
    }  
  }
  drawSprites();
}
function fruits(){
  if(frameCount%80===0){
    fruit = createSprite(400,200,20,20)
    fruit.scale = 0.2
    position = Math.round(random(1,2));
    if (position===1){
      fruit.x = 0
      fruit.velocityX = (6+score/4)
    }
    else {
      fruit.x = 400
      fruit.velocityX = -(6+score/4)
    }
    // fruit.debug = true
    r = Math.round(random(1,4));
    if(r == 1) {
      fruit.addImage(fruit1)
    } else if(r === 2)
      {fruit.addImage(fruit2)}
    else if (r===3)
      {fruit.addImage(fruit3)}
    else if(r === 4)
      {fruit.addImage(fruit4)}
    
    fruit.y = Math.round(random(50,340));
    
   // fruit.velocityX  = -7
    fruit.setLifetime = 100
    
    fruitsGroup.add(fruit);
    
  }
}

function enemy(){
  if(frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8
    monster.setLifetime = 50
    
    enemyGroup.add(monster)
  }
  
  
}



