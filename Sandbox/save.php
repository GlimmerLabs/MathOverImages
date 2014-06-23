<?php
// A quick hack to save various types of objects in PHP.

// Get one field from the query.  Uses $default if it can't find it.
function getField($fieldname,$default)
{
  if ($tmp = $_POST[$fieldname]) {
    return $tmp;
  }
  else if ($tmp = $_GET[$fieldname]) {
    return $tmp;
  }
  else {
    return $default;
  }
} // getField

// Extract the information from the post
$data = getField('data','data');
$filename = getField('filename','file.txt');
$type = getField('type','text/plain');
$decode = getField('decode',false);

// Generate the instructions (all in the header)
header("Content-Type: $type");
header("Content-Disposition: attachment; filename=\"$filename\"", false);

// Print the data
if ($decode) {
  echo(base64_decode($data));
}
else {
  echo($data);
}
?>
