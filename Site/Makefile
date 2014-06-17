# A quick Makefile for setting up a dev server.

deafult: devserver.js

devserver.js: server.js
	sed -e 's/8080/8000/' < $< > $@
