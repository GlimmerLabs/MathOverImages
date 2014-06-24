/**
 * EditableText.js
 *   A library to support editable text in Kinetic.js.
 */

// +-------+---------------------------------------------------------
// | Notes |
// +-------+

/*
   1. To use this library,
      a. Create your stage.
      b. Add the line `readEditing(stage)` to prepare the stage
         for editing
      c. For any text field that you want editable, call
         `field.setEditable(true)`.  
      d. For any text field that you want editable, set up an
         appropriate `draw` method.  A good default is the enclosing
         layer.  For example,
         `text.drawMethod = function(){text.parent.draw()};`

 */

// +----------------------------+------------------------------------
// | Extensions to Kinetic.Text |
// +----------------------------+
// To do: fix for centered text

Kinetic.Text.prototype.isEditable = false;
Kinetic.Text.prototype.isActive = false;
Kinetic.Text.prototype.setEditable = function(state){this.isEditable = state;}
Kinetic.Text.prototype.defaultText = null;
Kinetic.Text.prototype.drawMethod = function(){};
Kinetic.Text.prototype.capitalized = false;
Kinetic.Text.prototype.aligned = "left";
Kinetic.Text.prototype.matchingCharacters = /[0-9.]/;
Kinetic.Text.prototype.parentLayer = function(){return this.getLayer()};
Kinetic.Text.prototype.measureText = function(family, size, text){
	this.parentLayer().canvas.context._context.font = size + "px" + " "  + family;
	return this.parentLayer().canvas.context._context.measureText(text);
}
Kinetic.Text.prototype.removeFocus = function(){
	if(this.cursor != null){
		clearInterval(this.cursor.interval);
		this.cursor.remove();
		this.cursor = null;
	}
	this.capitalized = false;
	this.isActive = false;
	if(this.text() == ""){
		this.text(this.defaultText);
	}
	this.drawMethod();
	activeText = null;
}
Kinetic.Text.prototype.addCursor = function(moveToClosest, mouse){
	var x = this.x();
	var fontSize = this.fontSize();
	var align = this.align();
	var fontFamily = this.fontFamily();
	var text = this.text()
	var textLength = text.length;
	var cursor = new Kinetic.Line({
        stroke: 'black',
        strokeWidth: Math.max(fontSize / 10, 1)
      });
	cursor.activeText = this;
	cursor.position = textLength;
	cursor.shouldChange = true;
	cursor.timeout = null;
	cursor.validatePosition = function(){
		var textLength = activeText.text().length;
		cursor.position = Math.min(Math.max(cursor.position, 0), textLength);
	}
	cursor.getLine = function(cursorPosition){
		var currentLength = 0;
		var previousLength = 0;
		var desiredLength = cursorPosition;
		var text = activeText.textArr;
		for(var textElement = 0; textElement < text.length; textElement++){
			previousLength = currentLength;
			currentLength += text[textElement].text.length;
			if(desiredLength >= previousLength && desiredLength <= currentLength){
				return textElement;
			}
		}
	}
	cursor.getPosition = function(line){
		var textArray = activeText.textArr;
		var position = 0;
		for(var textArrayIndex = 0; textArrayIndex < line; textArrayIndex++){
			position += textArray[textArrayIndex].text.length;
		}
		return position;
	}
	cursor.getDistanceUpTo = function(position){
		var currentLength = 0;
		var previousLength = 0;
		var textArray = activeText.textArr;
		for(var textArrayIndex = 0; textArrayIndex < textArray.length; textArrayIndex++){
			previousLength = currentLength;
			currentLength += textArray[textArrayIndex].text.length;
			if(position >= previousLength && position <= currentLength){
				return previousLength;
			}
		}
	}
	cursor.moveLinePosition = function(x, lineChange){
		var height = activeText.textHeight;
		var y = activeText.y() + lineChange;
		this.points([x, y, x, y + height]);
		activeText.drawMethod();
	}
	cursor.updatePosition = function(){
		var family = activeText.fontFamily();
		var size = activeText.fontSize();
		var x = activeText.x();
		var line = this.getLine(this.position);
		var lineText = activeText.textArr[line].text;
		var beginning = this.getDistanceUpTo(this.position);
		var textBeforeCursor = activeText.text().slice(beginning, this.position);
		var xOffset = activeText.measureText(family, size, textBeforeCursor).width;;
		if (activeText.aligned == "center") {
			var lineTextWidth = activeText.measureText(family, size, lineText).width;
			xOffset += (activeText.width() - lineTextWidth) / 2;
		}
		var lineOffset = line * activeText.textHeight;
		cursor.moveLinePosition(x + xOffset, lineOffset);
	}
	cursor.moveToClosestPosition = function(x, y){
		clearTimeout(activeText.cursor.timeout);
		activeText.cursor.shouldChange = false;
		activeText.cursor.opacity(1);
		activeText.cursor.timeout = setTimeout(function(){
			if(activeText != null){
				activeText.cursor.shouldChange = true;
			}
		}, 100);
		var line = Math.round(y / activeText.textHeight); // Get which line the mouse clicked on
		line = Math.max(1, Math.min(line, activeText.textArr.length)); // Assures that line is an actual line
		line -= 1; // convert line to an array index
		var text = activeText.textArr[line].text;
		var family = activeText.fontFamily();
		var size = activeText.fontSize();
		if (activeText.aligned == "center") {
			var lineTextWidth = activeText.measureText(family, size, text).width;
			x += (activeText.width() - lineTextWidth) / 2;
		}
		var closestDistance = Infinity;
		var closestIndex = -1;
		for(var ch = text.length; ch >= 0; ch--){
			var chunk = text.slice(0, ch);
			var distance = activeText.measureText(family, size, chunk).width;
			distance -= x;
			distance = Math.abs(distance);
			if(distance < closestDistance){
				closestIndex = ch;
				closestDistance = distance;
			}
		}
		this.position = closestIndex + cursor.getPosition(line);
		this.updatePosition();
	}
	cursor.moveLinePosition(this.measureText(fontFamily, fontSize, text).width + this.x());
	this.parent.add(cursor);
	var active = this;
	this.cursor = cursor;
	cursor.opacity(1);
	this.drawMethod();
	cursor.interval = setInterval(function()
	{
		if(cursor.shouldChange){
			cursor.opacity((cursor.opacity() == 1) ? 0 : 1);
			active.drawMethod();
		}
	}, 750);
	if(this.text() != this.defaultText && moveToClosest){
		var mouseX = mouse.x;
		var textX = this.x();
		var mouseY = mouse.y;
		var textY = this.y();
		var mouseRelativeX = mouseX - textX + cursor.offsetX();
		var mouseRelativeY = mouseY - textY + cursor.offsetY();
		cursor.moveToClosestPosition(mouseRelativeX, mouseRelativeY);
	}
	else{
		cursor.updatePosition();
	}
}
activeText = null;
currentEvent = null;
function readyEditing(stage)
{
	stage.on("contentClick",
		function(event) {
			if(event.evt != currentEvent){
				currentEvent = null;
				if (activeText != null){
					activeText.removeFocus();
				}
			}
		});
	stage.on("click", 
		function(event)
		{
			// Check if target object has text method(if it does than it is a text object)
			if (event.target.text != null) {
				if (event.target.isEditable){
						if(event.target != activeText){
							if (activeText != null){
								activeText.removeFocus();
							}
							activeText = event.target;
							var moveCursorToClosest = true;
							if (activeText.text() == activeText.defaultText){

								activeText.text("");
								var moveCursorToClosest = false;
							}
							var textX = activeText.x();
							activeText.addCursor(moveCursorToClosest, stage.getPointerPosition());
							activeText.isActive = true;
						}
						else{
							var cursor = activeText.cursor;
							var mouseX = stage.getPointerPosition().x;
							var textX = activeText.x();
							var mouseY = stage.getPointerPosition().y;
							var textY = activeText.y();
							var mouseRelativeX = mouseX - textX + cursor.offsetX();
							var mouseRelativeY = mouseY - textY + cursor.offsetY();
							cursor.moveToClosestPosition(mouseRelativeX, mouseRelativeY);
						}
						currentEvent = event.evt;
					}
			}
		});
	document.body.onkeyup = function(e){
		var keycode = e.which || e.keyCode;
		if(keycode == 16 && activeText != null){
			activeText.capitalized = false;
		}
	}
	document.body.onkeydown = function(e) {
		var keycode = e.which || e.keyCode;
		if(activeText != null){
			clearTimeout(activeText.cursor.timeout);
			activeText.cursor.shouldChange = false;
			activeText.cursor.opacity(1);
			activeText.cursor.timeout = setTimeout(function(){
				if(activeText != null){
					activeText.cursor.shouldChange = true;
				}
			}, 100);
			var currentText = activeText.getText();
			var textPreCursor = currentText.slice(0, activeText.cursor.position);
			var textPostCursor = currentText.slice(activeText.cursor.position, currentText.length);
			var addedKey = false;
			var cursorPositionChange = 0;
			if(keycode >= 48 && keycode <= 57){ // keycode 48 is the key "0" and 57 is the key "9"
				var key = "0123456789"[e.which-48]; // get which number key was pressed
				addedKey = true;
			}
			if(keycode >= 96 && keycode <= 105){ // keycode 96 is the numpad key "0" and 105 is the numpad key "9"
				var key = "0123456789"[e.which-96]; // get which number key was pressed
				addedKey = true;
			}
			if(keycode >= 65 && keycode <= 90){ // keycode 65 is the key "a" and 90 is the key "z"
				var key = "abcdefghijklmnopqrstuvwxyz"[e.which-65]; // get which letter key was pressed
				addedKey = true;
			}
			if(keycode == 190 || keycode == 110){ // 190 is the "." key 110 is the numpad version
				var key = "."
				addedKey = true;
			}
			if(keycode == 16){
				activeText.capitalized = true;
			}
			if(keycode == 8 || keycode == 46){ // 8 is the backspace key; 46 is the delete key
				activeText.setText(textPreCursor.slice(0, textPreCursor.length - 1) + textPostCursor);
				activeText.cursor.position--;
				e.preventDefault(); // Prevents backspace from moving back a page
			}
			if(keycode == 13){
				activeText.removeFocus();
			}
			if(keycode == 37){ // 37 is the left arrow key
				activeText.cursor.position--;
			}
			if(keycode == 39){ // 39 is the right arrow key
				activeText.cursor.position++;
			}
			if(keycode == 189 || keycode == 109){ // 189 and 109 are the - keys: normal, numpad respectively
				var key = ".";
				addedKey = true;
			}
			if(addedKey){
				if(activeText.capitalized){
					key = key.toUpperCase();
				}
				if(activeText.matchingCharacters.test(key)){
					activeText.setText(textPreCursor + key + textPostCursor);
					activeText.cursor.position++;
				}
			}
			if(activeText != null){
				activeText.cursor.validatePosition();
				activeText.cursor.updatePosition();
				activeText.drawMethod();
			}
		}
	}
}