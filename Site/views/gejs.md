gejs - The Glimmer ejs Preprocessor
===================================

gejs is intended to help developers create ejs files using simple
format.

Usage
-----

First, create a .gejs file file that uses the following strategy
for defining fields

    name
      value

That is, the name of each field should be left justified and the values
must be indented by at least one space.  The values should be typical
ejs input.

The appropriate values are specified in the template.

Second, create an .ejs file that serves as a template.  Whenever you
want to insert a field, use `<% component("name") %>`.

Third, run `gejs` to create an ejs file.

    ./gejs file.gejs -o file.ejs -t template.ejs 

### Sample Template

    <html>
    <head>
      <title>
        <% component("title") %>
      </title>
    </head>
    <body>
      <% component("body") %>
    </body>
    </html>

### Sample Input

    title
      A Sample Page
    body
      <p>My sample page</p>
