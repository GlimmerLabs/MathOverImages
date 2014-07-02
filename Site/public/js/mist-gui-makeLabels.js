var descriptions = {
	add:      'add values together\n  minumum of 2 inputs \n  maximum of 20.',
	multiply: 'multiply values together\n  minumum of 2 inputs \n  maximum of 20.',
	negate:   'negate a value\n  maximum of 1 input',
	sine:     'take the sine of a value\n  maximum of 1 input',
	cosine:   'take the cosine of a value\n  maximum of 1 input',
	absolute: 'take the absolute value of\n a value\n  maximum of 1 input',
	average:  'take the average of values\n  minumum of 2 inputs \n  maximum of 20.',
	sign:     'return -1 or 1 based on the\n sign of the value\n  maximum of 1 input',
	wrapsum:  'minumum of 2 inputs \n  maximum of 20.',
	rgb:      '3 inputs (R,G,B)\n  - R is the red value\n  - G is the green value\n  - B is the blue value',
	x:        'ranges -1 to 1 based on the x-value',
	y:        'ranges -1 to 1 based on the y-value',
	second:   'goes through values -1 to 1\n every second',
	minute:   'goes through values -1 to 1\n every minute',
	hour:     'goes through values -1 to 1\n every hour',
	day:      'goes through values -1 to 1\n every day',
	constant: 'enter your own number',
}

var tagColor = 'white'

var makeLabel = function(group) {
	var xOffset = 0;
	if (isValue(group)){
		xOffset = -4;
	}
	var name = group.attrs.name;
	var text = descriptions[name];
	var label = new Kinetic.Label ({
		x: group.x() + (functionTotalSideLength / 2) + xOffset,
		y: group.y() + (1.1 * functionTotalSideLength)
	});

	label.add(new Kinetic.Tag({
		fill: tagColor,
		pointerDirection: 'up',
		pointerWidth: width / 90,
		pointerHeight: width / 90,
		lineJoin: 'round',
		shadowColor: 'black',
		shadowOffset: [5, 5],
	}));

	label.add(new Kinetic.Text({
		text: text,
		fontFamily: globalFont,
		fontSize: 13,
		padding: 5,
		fill: 'black'
	}));
	return label;
};