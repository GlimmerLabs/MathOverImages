<html>
<head>
function download()
{
window.URL = window.webkitURL || window.URL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||       window.MozBlobBuilder;
file = new WebKitBlobBuilder();
file.append(output); 
var a = document.getElementById("downloadFile");
a.hidden = '';
a.href = window.URL.createObjectURL(file.getBlob('text/plain'));
a.download = 'filename.txt';
a.textContent = 'Download file!';
}
</head>
<body>
<script>
/* <?php */
/* echo "<h1>PHP WORKS</h1>"; */
/* $Path2File = "path/to-file-on-server.zip"; */
/* $theFileName = "name-of-file.zip"; */
/* header ("Cache-Control: must-revalidate, post-check=0, pre-check=0"); */
/* header ("Content-Type: application/octet-stream"); */
/* header ("Content-Length: " . filesize($Path2File)); */
/* header ("Content-Disposition: attachment; filename=$theFileName"); */
/* readfile($Path2File); */
/* ?> */
</script>
<form>
<input type="text" name="blob" id="downloadFile" size="100"/><
<input type="button" value="Download" onclick="download()">
</form>
</body>
</html>