//Vedansh Saha
//vnsssaha@gmail.com

//Variables
var ship;
var a;
var health = 500;
var astGroup;
var level = 1;
const END = 0;
const PLAY = 1;
var gameState = PLAY;
var ase = 1;
var ade = 500*2;
var ace = 800*2;
var inlevel = 1;
var speed = 1;
var it = 0;
var age3 = 1;
// var age1 = 1;
// var tr = 134;

//if (level === 1) {
//F preload
function preload() {
  rocketImg = loadAnimation("rocket.png", "r2.png");

  space = loadImage("space.svg");
  dj = loadSound("DJ.mp3");
  shadeImg = loadImage("shade.png");

  bulletSound = loadSound("pich.wav");

  bl = loadSound("bl.mp3");
  spac = loadSound("spac.wav");

  end = loadImage("end.png");

  i = loadImage("alienk.svg");

  rok = loadImage("rok.png");

  ak = loadImage("ak.png");
  ar = loadImage("ar.svg");

  a1 = loadImage("asteroid1.png");
  a2 = loadImage("asteroid2.png");
  a3 = loadImage("asteroid3.png");

  w1 = loadImage("wreckage1.png");
  w2 = loadImage("wreckage2.png");
  w3 = loadImage("wreckage3.png");

  int = loadSound("Intro Theme.mp3");

  bite = loadSound("bite.wav");

  bulletImg = loadImage("bullet.png");

  bg = loadImage("background.png");

  dg = loadAnimation("dan.png");

  planetimg = loadImage("planet.png");

  groundImg = loadImage("grr.png");

  f1img = loadImage("f1.svg");
  f2img = loadImage("f2.svg");
  f3img = loadImage("f3.svg");

  rd = loadSound("rd.mp3");

  playerimg = loadImage("middle.svg");

  bag = loadImage("mat.png");

  elddim = loadImage("elddim.svg");

  alli = loadImage("alien.svg");
}

//F setup
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  spac.loop();
  spikeGroup = new Group();
  ship = createSprite(80, windowHeight / 2, 50, 50);
  ship.addAnimation("norm", rocketImg);
  // ship.frameDelay = 0.5
  ship.addAnimation("danger", dg);
  ship.scale = 1.25;

  bullet = createSprite(windowWidth + 11, 300, 50, 50);
  bullet.addImage(bulletImg);
  bullet.scale = 0.15;
  bullet.visible = false;

  astGroup = new Group();

  g1 = new Group();
  g2 = new Group();
  g3 = new Group();
}

//F draw
function draw() {
  //   canvas.width = windowWidth;
  //   canvas.height = windowHeight

  if (gameState === PLAY) {
    if (frameCount === ace) {
      level = 2;
    }

    if (level === 1) {
      background(bg);

      if (keyDown("left")) {
        ship.x -= 10;
      }
      if (keyDown("right")) {
        ship.x += 10;
      }

      if (keyDown("up")) {
        ship.y -= 10;
      }
      if (keyDown("down")) {
        ship.y += 10;
      }

      if (ship.isTouching(astGroup)) {
        health -= 1;
        ship.changeAnimation("danger");
      } else {
        ship.changeAnimation("norm");
      }

      //console.log(health);
      if (bullet.isTouching(g3)) {
        g3.destroyEach();
        bullet.x = windowWidth + 11;
        bl.play();
      }

      if (bullet.isTouching(g2)) {
        g2.destroyEach();
        bullet.x = windowWidth + 11;
        bl.play();
      }

      if (bullet.isTouching(g1)) {
        g1.destroyEach();
        bullet.x = windowWidth + 11;
        bl.play();
      }

      if (frameCount === ade) {
        mars = createSprite(windowWidth + 10, 240);
        mars.addImage(planetimg);
        mars.velocityX = -4;
        mars.depth = astGroup.maxdepth + frameCount;
        ase = 0;
      }

      if (frameCount > ade) {
        fill("yellow");
        textSize(25);
        text("Let's Go To Mars For Now",600,450);
        text("We Are Hungry.. Right?",615,500);
        if (mars.isTouching(ship)) {
          level = 2;
        }
      }

      if (ase === 1) {
        spa1();
        spa2();
        spa3();
      }
      //blocks
      block(ship, 70, 70, 0, 0);
      block(ship, windowWidth - 80, windowWidth - 80, 1, 0);
      block(ship, windowHeight - 70, windowHeight - 70, 0, 1);
      block(ship, 70, 70, 1, 1);

      drawSprites();

      // fill("yellow")
      // textSize(25); 
      // text("FPS : "+ frameRate,100,50);

      fill("yellow");
      noStroke();
      textSize(25);
      text("Health : " + health, 100/2, 100/2);
      text("Current Mission : Go to Mars Then Earth", 500, 100/2);
      image(space, 1050, 10,250,70);
      image(ak, 300, -10, 100, 100);
      //console.log(randomNumber(1,10))
    } else if (level === 2) {
      //setup
      if (frameCount === ace) {
        ground = createSprite(
          windowWidth / 2,
          windowHeight - 30,
          windowWidth,
          windowHeight / 5
        );
        int.loop();
        age1 = 1;
        age2 = 1;
        player = createSprite(150, windowHeight - 300);
        player.addImage("right", playerimg);
        player.addImage("wrong", elddim);
        player.scale = 2;
        // ship.addImage(shipimg);
      } else if (frameCount > ace) {
        //draw
        background(bag);
        drawSprites();
        // fill(0)
        // textSize(25); 
        // text("FPS : "+frameRate,100,50);
        imageMode(CENTER);
        image(groundImg, ground.x, ground.y - 25, ground.width, ground.height);
        speed += 5;
        player.collide(ground);
        ground.collide(player);

        if (player.isTouching(spikeGroup)) {
          rd.play();
          player.x = 150;
          player.y = windowWidth - 300;
        }

        if (player.y < 540) {
          player.velocityY += 1;
        }

        if (player.y > 547.1) {
          player.y = 547.1;
        }

        if (player.isTouching(ground)) {
          console.log(player.y);
        }

        if (keyDown("right")) {
          player.x += 10;
          player.changeImage("right");
        }

        if (keyDown("left")) {
          player.x -= 10;
          player.changeImage("wrong");
        }

        block(player, 0, 0, 0, 0);
        block(player, windowWidth, windowWidth, 1, 0);
        block(player, windowHeight, windowHeight, 0, 1);
        block(player, 0, 0, 1, 1);

        spac.pause();

        if (inlevel === 1) {
          var spike = createSprite(320, windowHeight - 180);
          spike.addImage(alli);
          spike.scale = 1.6;
          spike.lifetime = 2;
          spikeGroup.add(spike);

          var spike2 = createSprite(760, windowHeight - 180);
          spike2.addImage("alli", alli);
          spike2.addImage("i", i);
          spike2.scale = 1.6;
          spike2.lifetime = 2;
          //spike2.velocityX = 10;
          // spike.debug = true;
          // spike2.debug = true;
          spikeGroup.add(spike2);

          //food1
          var food1;
          if (age1 === 1) {
            food1 = createSprite(540, windowHeight - 210);
            food1.addImage(f2img);
            food1.scale = 0.25;
            food1.lifetime = 2;
            food1.y = sin(speed * 2) * 15 + windowHeight - 210;
          }
          //spike2.velocityX = 10;
          // spikeGroup.add(spike2);
          if (food1 !== undefined) {
            if (player.isTouching(food1)) {
              age1 = 0;
              food1.destroy();
              bite.play();
              // food1.remove();
            }
          }

          fill(0)
          textSize(25);
          text("Wow We Are On Mars Let's Eat Some Food",500,200);

          //food1
          var food2;
          if (age2 === 1) {
            food2 = createSprite(970, windowHeight - 210);
            food2.addImage(f3img);
            food2.scale = 0.25;
            food2.lifetime = 2;
            food2.y = sin(speed * 2) * 15 + windowHeight - 210;
          }
          //spike2.velocityX = 10;
          // spikeGroup.add(spike2);
          if (food2 !== undefined) {
            if (player.isTouching(food2)) {
              age2 = 0;
              food2.destroy();
              bite.play();            
              // food1.remove();
              it = 1;
            }
          }

          if (it === 1) {
            spike2.changeImage("i");
            if (keyDown("right")) {
              spike2.x = player.x - 150;
            } else {
              spike2.x = player.x - 150;
            }

            if (keyDown("left")) {
              spike2.x = player.x + 150;
            }

            spike2.y = player.y - 13;

            fill(0)
              textSize(25);
              text("Oops!",700,300);
          }

          //spike
          var spike3 = createSprite(1180, windowHeight - 180);
          spike3.addImage(alli);
          spike3.scale = 1.6;
          spike3.lifetime = 2;
          spikeGroup.add(spike3);

          imageMode(CENTER);
          image(ak, 102, 430, 100, 100);
          image(ar, 50, 550, 80, 80);

          if (player.x > windowWidth - 10) {
            inlevel = 2;
            player.x = 300;
            player.y = 360;
            // console.log("yay");
          }
        } else if (inlevel === 2) {

          fill(0)
          textSize(25);
          text("These Many Aliens 6&*#?!",600,200);


          var spike1 = createSprite(320, windowHeight - 180);
          spike1.addImage(alli);
          spike1.scale = 1.6;
          spike1.lifetime = 2;
          spikeGroup.add(spike1);

          var spike2 = createSprite(620, windowHeight - 180);
          spike2.addImage(alli);
          spike2.scale = 1.6;
          spike2.lifetime = 2;
          spikeGroup.add(spike2);

          var spike3 = createSprite(920, windowHeight - 180);
          spike3.addImage(alli);
          spike3.scale = 1.6;
          spike3.lifetime = 2;
          spikeGroup.add(spike3);

          var spike4 = createSprite(1220, windowHeight - 180);
          spike4.addImage(alli);
          spike4.scale = 1.6;
          spike4.lifetime = 2;
          spikeGroup.add(spike4);

          //food1
          var food1;

          if (age3 === 1) {
            food1 = createSprite(1370, windowHeight - 210);
            food1.addImage(f1img);
            food1.scale = 0.25;
            food1.lifetime = 2;
            food1.y = sin(speed * 2) * 15 + windowHeight - 210;
          }
          //spike2.velocityX = 10;
          // spikeGroup.add(spike2);
          if (food1 !== undefined) {
            if (player.isTouching(food1)) {
              age3 = 0;
              food1.destroy();
              bite.play();
              // food1.remove();
            }
          }

          // var spike5 = createSprite(1520, windowHeight - 180);
          // spike5.addImage(alli);
          // spike5.scale = 1.6;
          // spike5.lifetime = 2;
          // spikeGroup.add(spike5);

          imageMode(CENTER);
          image(ak, 102, 430, 100, 100);
          image(ar, 50, 550, 80, 80);

          if (player.x > windowWidth - 10) {
            inlevel = 3;
            player.x = 300;
            player.y = 260;
            // console.log("yay");
          }
        } else if (inlevel === 3) {
          var finale = createSprite((windowWidth, windowHeight - 560));
          finale.addImage(rok);
          finale.y = sin(speed * 2) * 15 + 460;
          finale.x = 1400;
          finale.scale = 0.75;

          fill(0)
              textSize(25);
              text("Gotta Go Fast",700,300);
          if (player.isTouching(finale)) {
            gameState = END;
            dj.loop();
          }
          finale.lifetime = 2;
          console.log(finale);

          imageMode(CENTER);
          image(ak, 102, 430, 100, 100);
          image(ar, 50, 550, 80, 80);
        }
      } else if (frameCount < ace) {
        // nothing
        background(0);
        textSize(25);
        fill(255);
        text("Loading...", windowWidth / 2, windowHeight / 2);
      }
      health = 100;

      ship.destroy();
      mars.destroy();
      bullet.destroy();
      astGroup.destroyEach();
    }
  } else {
    background(end);
    int.pause();
  }
}

function keyPressed() {
  if (level === 1) {
    if (keyCode === 32) {
      if (bullet.x > windowWidth + 10) {
        bullet.x = ship.x - 10;
        bulletSound.play();
        bullet.y = ship.y;
        bullet.visible = true;
        bullet.velocityX = 24;
        ship.depth = bullet.depth + 1;
      }
    }
  } else if (level === 2) {
    if (
      (keyCode === 32 || keyCode === UP_ARROW || MouseEvent(DOWN)) &&
      player.y > 547
    ) {
      player.velocityY = -18;
      console.log(player.y);
    }
  }
  
 
}

//block
function block(object, d1, d2, fb, xy) {
  if (xy === 0) {
    if (fb === 0) {
      if (object.x < d1) {
        object.x = d2;
      }
    } else {
      if (object.x > d1) {
        object.x = d2;
      }
    }
  } else {
    if (fb === 0) {
      if (object.y > d1) {
        object.y = d2;
      }
    } else {
      if (object.y < d1) {
        object.y = d2;
      }
    }
  }
}

//spa1
function spa1() {
  if (frameCount % 60 === 0) {
    var ast = createSprite(windowWidth, random(70, windowHeight - 70));
    var rand = round(random(1, 3));
    switch (rand) {
      case 1:
        a = a1;
        break;

      case 2:
        a = a2;
        break;

      case 3:
        a = a3;
        break;
    }
    ast.addImage(a);
    ast.velocityX = -12;
    ast.lifetime = 600;
    astGroup.add(ast);
    g1.add(ast);
  }
}
//spa2
function spa2() {
  if (frameCount % 65 === 0) {
    var ast = createSprite(windowWidth, random(70, windowHeight - 70));
    var rand = round(random(1, 3));
    ast.scale = 0.75;
    ast.lifetime = 600;

    switch (rand) {
      case 1:
        a = a1;
        break;

      case 2:
        a = a2;
        break;

      case 3:
        a = a3;
        break;
    }
    ast.addImage(a);
    ast.velocityX = -12;
    astGroup.add(ast);
    g2.add(ast);
  }
}
//spa3
function spa3() {
  if (frameCount % 80 === 0) {
    var ast = createSprite(windowWidth, random(70, windowHeight - 70));
    var rand = round(random(1, 3));
    ast.scale = 1.25;
    ast.lifetime = 600;

    switch (rand) {
      case 1:
        a = a1;
        break;

      case 2:
        a = a2;
        break;

      case 3:
        a = a3;
        break;
    }
    ast.addImage(a);
    ast.velocityX = -12;
    astGroup.add(ast);
    g3.add(ast);
  }
}
// }

function change(varr, num) {
  varr += num;
}
