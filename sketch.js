var d1, d, hd, database, fS, foodStock;

function preload(){
  d = loadImage("Dog.png");
  hd = loadImage("hdd.png");
}

function setup() {
  createCanvas(500, 500);
  d1 = createSprite(250,350,10,60);
  d1.addImage(d);
  d1.scale = 0.3;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);
}

function draw() {  
  background(46, 139, 87);
    textSize(20);    
    fill(255);    
    text("Press UP ARROW to feed Flash milk", 80,70);
    text("Food Remaining: "+fS, 150,150);
    if(keyWentDown(UP_ARROW)){
      writeStock(fS);
      d1.addImage(hd); 
    }
    if(keyWentUp(UP_ARROW)){
      d1.addImage(d);
     }
    if(fS === 0){
      fS = 20;
     }
    drawSprites();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x 
  });
}
function readStock(data){
  fS = data.val();
}