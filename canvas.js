window.addEventListener("load", init);


function init()
{
    var c = document.getElementById("drawPanel");
    var g = c.getContext("2d");
    g.fillRect(100,100,50,50);
}
