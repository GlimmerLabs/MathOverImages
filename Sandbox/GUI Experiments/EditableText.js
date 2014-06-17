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


Kinetic.Text.prototype.isEditable = false;
Kinetic.Text.prototype.isActive = false;
Kinetic.Text.prototype.setEditable = function(state){this.isEditable = state;}
Kinetic.Text.prototype.defaultText = false;
Kinetic.Text.prototype.drawMethod = function(){};
activeText = null;
function readyEditing(stage)
{
	stage.on("mousedown", 
		function(event)
		{
			if(activeText != null)
			{
				activeText.isActive = false;
				activeText = null;
			}
			if(event.target.text != null) // Check if target object has text method(if it does than it is a text object)
			{
				if(event.target.isEditable)
					{
						activeText = event.target;
						activeText.isActive = true;
					}
			}
		})
	document.body.onkeydown = function(e)
	{
		if(activeText != null)
		{
			var currentText = activeText.getText();
			if(currentText == activeText.defaultText)
			{
				currentText = "";
			}
			if(e.which >= 48 && e.which <= 57) // keycode 48 is the key "0" and 57 is the key "9"
			{
				var key = "0123456789"[e.which-48]; // get which number key was pressed
				activeText.setText(currentText + key);
			}
			if(e.which >= 96 && e.which <= 105) // keycode 96 is the numpad key "0" and 105 is the numpad key "9"
			{
				var key = "0123456789"[e.which-96]; // get which number key was pressed
				activeText.setText(currentText + key);
			}
			if(e.which == 190 || e.which == 110) // 190 is the "." key 110 is the numpad version
			{
				activeText.setText(currentText + ".");
			}
			if(e.which == 8) // 8 is the delete key
			{
				activeText.setText(currentText.slice(0, currentText.length - 1));
			}
			if(activeText.getText() == "")
			{
				activeText.setText(activeText.defaultText)
			}
			activeText.drawMethod();
		}
	}
}