#!/bin/bash

npm install

webpack --progress

cp -r build/{css,images,*.js,*.html} ../../main/webapp/public/

