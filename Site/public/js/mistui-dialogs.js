/**
 * mistui-dialogs.js
 *   Some simple scripts for dealing with "dialog" boxes in MIST.
 */

/**
 * Hide all of the dialogs on the page.
 */
function hideAllDialogs()
{
  var dialogs = document.getElementsByClassName("dialog");
  for (var i = 0; i < dialogs.length; i++) {
    dialogs[i].style.visibility = "hidden";
  } // for
} // hideAllDialogs

/**
 * Show the dialog with a particular id.
 */
function showDialog(id)
{
  hideAllDialogs();
  var dialog = document.getElementById(id);
  dialog.style.visibility = "visible";
  return dialog;
} // showDialog

/**
 * Put quotation marks around a string.
 */
function quote(contents, mark)
{
  if (!mark) { mark = "\""; }
  return mark + contents + mark;
} // quote

/**
 * Make a button.
 */
function makeButton(id, value, onclick)
{
  return "<input type=\"button\" id=" + quote(id)
         + " value= " + quote(value)
         + " onclick= " + quote(onclick, "'") + "/>";
} // makeButton

/**
 * Create the HTML for a dialog box with a particular body and add
 * it to the page.  Handlers is an object that contains the 
 * button/method pairs.
 */
function makeDialog(id, content, handlers)
{
  var dialog = document.createElement("div");
  dialog.setAttribute("id", id);
  dialog.setAttribute("class", "dialog");
  var buttons = "<div class='dialogbuttons'>\n";
  buttons += makeButton(id, "Cancel", "hideAllDialogs()");
  for (var key in handlers) {
    buttons += makeButton(id+"-"+"key", key, handlers[key]);
  } // for
  buttons += "</div>\n";
  dialog.innerHTML = "<div class=\"innerdialog\">" 
                   + content
                   + buttons
                   + "</div>\n";
  document.body.appendChild(dialog);
} // makeDialog
