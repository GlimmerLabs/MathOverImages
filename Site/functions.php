<?php

  function doHeader($title, $stylesheet){
  echo <<_END;
  <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>$title</title>
    <style>
    @import url("css/$stylesheet");
  </style>
    </head>
    <body>
    <header>
    <div id = 'headerLogo'>
    <a href='#'><img src='images/logos/header.svg' /></a>
    </div>
    <nav>
    <ul>
    <li><a href='#'>create</a></li>
    <li><a href='#'>challenges</a></li>
    <li><a href='#'>gallery</a></li>
    <li><a href='#'>about</a></li>
    _END;
  // If not logged in,
  echo "<li><a href='#'>login/signup</a></li>";
  // else
  echo "<li><a href='#'>my account</a></li>";
  echo "</ul></nav></header>";
}

function doFooter () {
echo <<_END
  <footer>
            <p>©2014 Glimmer Labs</p>
            <nav>
                <ul>
                    <li><a href='#'>create</a></li>
                    <li><a href='#'>challenges</a></li>
                    <li><a href='#'>gallery</a></li>
                    <li><a href='#'>about</a></li>
   _END;
  // if not logged in
                    echo "<li><a href='#'>login</a></li>
                    <li><a href='#'>signup</a></li>";
  //else
  echo "<li><a href='#'>my account</a></li>";


  echo <<_END

                    <li><a href='#'>license</a></li>
                    <li><a href='#'>privacy policy</a></li>
                </ul>
            </nav>
        </footer>
    </body>
</html>
_END;



}