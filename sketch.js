var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedTheDog;
var foodObj;

var feed, FeedTime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedTheDog=createButton("Feed the Dog");
  feedTheDog.position(700,95);
  feedTheDog.mousePressed(removeFoods);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  var FeedTimeRef = database.ref('FeedTime');
  FeedTimeRef.on("value",function(data){
    FeedTime = data.val();
  })

  if(frameCount%60==0){
    database.ref('/').update({
      FeedTime:FeedTime+1
    })
  }

  fill(0);
  textSize(15)
  if(FeedTime>=12){
    text("Last Feed : 9 PM",350,30);
  } else if(FeedTime==0){
    text("Last Feed : 12 NOON",350,30);
  } else {
    text("Last Feed : 9 AM",350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  database.ref('/').update({
    
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function removeFoods(){
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}