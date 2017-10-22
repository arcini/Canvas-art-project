window.addEventListener("load", init);
var x = NaN;
var y = NaN;
var soundToPlay = "oofSound";
var c;
var g;
var bg = "white";
var r = 20;
var z = 20;
var rad = 20;
var theBall = [];
function init() {
    c = document.getElementById("surface");
    g = c.getContext("2d");
    document.getElementById("surface").addEventListener("click", function(e) {
      x = e.pageX - document.getElementById("surface").offsetLeft;
      y = e.pageY - document.getElementById("surface").offsetTop;
      theBall.push(new BouncyBall(new Point(x, y), rad, randColor(), new Point(((Math.random()*z)-z/2), ((Math.random()*z)-z/2))));
      console.log(theBall);
      console.log(x);
      console.log(y);
    });
    document.getElementById("size").addEventListener("input", function(e) {
        rad = parseInt(document.getElementById("size").value);
        document.getElementById("sizeValue").innerHTML = document.getElementById("size").value;
    });
    
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    setInterval(refresh, r);
  
    //removes sound slider on mobile devices, since html5 sound is weird on mobile
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      document.getElementById("soundSlider").remove();
      document.getElementById("soundSliderLabel").remove();
      console.log("removed elements");
      document.body.remove();
    }
}
+
function randColor() {
  return "rgb(" + Math.floor(Math.random()*256) + ", " + Math.floor(Math.random()*256) + ", " + Math.floor(Math.random()*256) + ")";
}

function refresh() {
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    for (i=0;i<theBall.length;i++) {
        theBall[i].draw(g);
        theBall[i].move(c);
    }
}


class Ball {
    constructor(center, radius, color)
    {
        this.center = center;
        this.radius = radius;
        this.color = color;
    }
    draw(g)
    {
        g.fillStyle = this.color;
        g.beginPath();
        g.arc(this.center.x, this.center.y, this.radius, 0, 2*Math.PI);
        g.fill();
    }
    toString()
    {
        return "Ball(" + this.center.toString() + ", " +
            this.radius + ", " + this.color + ")";
    }
}

class BouncyBall extends Ball
{
    //heading is direction ball is going in
    //it is given as a point.
    constructor(center, radius, color, heading)
    {
        super(center, radius, color);{
        }
        this.heading = heading;
    }
    //moves ball within a canvas
    move(c) {
        var nextX = this.heading.x + this.center.x;
        if((nextX - this.radius) < 0 || (nextX + this.radius) > c.width)
        {
            nextX = Math.min(Math.max(nextX, this.radius), c.width-this.radius);
            this.heading.x = -this.heading.x;
            if (returnChecked()) {
              playSound();
            }
        }
        var nextY = this.heading.y + this.center.y;
        if(((nextY - this.radius) < 0) | ((nextY + this.radius) > c.height))
        {
            nextY = Math.min(Math.max(nextY, this.radius), c.height-this.radius);
            this.heading.y = -this.heading.y; 
            if (returnChecked()) {
              playSound();
            }
        }
        this.center.x = nextX;
        this.center.y = nextY;
    }

}

class Point {
    constructor(x = 0,y = 0) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return "(" + this.x + ", " +  this.y + ")";
    }
    distanceTo(p) {
        return Math.hypot(this.x - p.x, this.y - p.y);
    }
}

function playSound() {
  let d = document.body.appendChild(document.getElementById(soundToPlay).cloneNode());
  setTimeout(removeElemnt(), 1000);
  d.play();
  
  
  function removeElemnt() {
    d.remove();
  }
}

function returnChecked() {
  return document.getElementById("soundSlider").checked;
}