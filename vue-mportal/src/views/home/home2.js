(function(){
	var m = 90;
	var t=setTimeout(svg_Circle,200);

	function svg_Circle() {
		var values = m;
		console.log(values);
		var circle = document.querySelectorAll("circle")[1];
		var percent = values / 100, perimeter = Math.PI * 2 * 170;
		circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
	}
	// svg_Circle(m);
})()