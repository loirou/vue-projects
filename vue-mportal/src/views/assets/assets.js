(function(){
    var range = document.querySelector("#range"),
        circle1 = document.querySelectorAll("circle")[1],
        circle2 = document.querySelectorAll("circle")[2],
        circle3 = document.querySelectorAll("circle")[3],
        circle4 = document.querySelectorAll("circle")[4],
        circle5 = document.querySelectorAll("circle")[5],
        circle6 = document.querySelectorAll("circle")[6];
    var percentOne = 100 / 100,
        percentTwo = 45 / 100,
        percentThree = 42 / 100,
        percentFour = 32 / 100,
        percentFive = 25 / 100,
        percentSix = 4 / 100,
        perimeter = Math.PI * 2 * 170;

    setTimeout(
        svg,200
    );

    function svg(){
        circle1.setAttribute('stroke-dasharray', perimeter * percentOne + " " + perimeter * (1- percentOne));
        circle2.setAttribute('stroke-dasharray', perimeter * percentTwo + " " + perimeter * (1- percentTwo));
        circle3.setAttribute('stroke-dasharray', perimeter * percentThree + " " + perimeter * (1- percentThree));
        circle4.setAttribute('stroke-dasharray', perimeter * percentFour + " " + perimeter * (1- percentFour));
        circle5.setAttribute('stroke-dasharray', perimeter * percentFive + " " + perimeter * (1- percentFive));
        circle6.setAttribute('stroke-dasharray', perimeter * percentSix + " " + perimeter * (1- percentSix));
    }
})()

