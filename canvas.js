
window.addEventListener("load", init);

function init()
{
    var c = document.getElementById("surface");
    var g = c.getContext("2d");
    var bg = "black";
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    var theBall = new BouncyBall(new Point(
        c.width/2, c.height/2), 50, "red",
        new Point(5,2))
    function refresh()
    {
        g.fillStyle = bg;
        g.fillRect(0, 0, c.width, c.height);
        theBall.draw(g);
        theBall.move(c);
    }
    setInterval(refresh, 10);
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
        g.beginPath()
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
        super(center, radius, color)
        this.heading = heading;
    }
    //moves ball within a canvas
    move(c)
    {
        var nextX = this.heading.x + this.center.x;
        if(nextX -this.radius < 0 || nextX + this.radius > c.width)
        {
            this.heading.x = -this.heading.x;
        }
        var nextY = this.heading.y + this.center.y;
        if(nextY - this.radius < 0 || nextY + this.radius > c.height)
        {
            this.heading.y = -this.heading.y;
        }
        this.center.x += this.heading.x;
        this.center.y += this.heading.y;
    }

}

class Point
{
    constructor(x = 0,y = 0)
    {
        this.x = x;
        this.y = y;
    }
    toString()
    {
        return "(" + this.x + ", " +  this.y + ")";
    }
    distanceTo(p)
    {
        return Math.hypot(this.x - p.x, this.y - p.y);
    }
}
