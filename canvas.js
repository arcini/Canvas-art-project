window.addEventListener("load", init);
var x = NaN;
var y = NaN;
var c;
var g;
var bg;
var r = 1;
var z = 20;
var theBall = [];
function init() {
    document.getElementById("surface").addEventListener("click", function(e) {
      x = e.pageX - document.getElementById("surface").offsetLeft;
      y = e.pageY - document.getElementById("surface").offsetTop;
      theBall.push(new BouncyBall(new Point(x, y), 30, "red", new Point(((Math.random()*z)-z/2), ((Math.random()*z)-z/2))));
      console.log(theBall);
      console.log(x);
      console.log(y);

    });
    c = document.getElementById("surface");
    g = c.getContext("2d");
    bg = "White";
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    setInterval(refresh, r);
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
        if(nextX - this.radius < 0 || nextX + this.radius > c.width)
        {
          this.center.x = Math.min(Math.max(this.center.x,this.radius),c.width-this.radius);
            this.heading.x = -this.heading.x;
        }
        var nextY = this.heading.y + this.center.y;
        if(nextY - this.radius < 0 || nextY + this.radius > c.height)
        {
          this.center.y = Math.min(Math.max(this.center.y,this.radius),c.height-this.radius);
            this.heading.y = -this.heading.y;
        }
        this.center.x += this.heading.x;
        this.center.y += this.heading.y;
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
