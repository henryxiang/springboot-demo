#!/bin/bash

webpack --progress

cp -r build/{css,images,*.js,*.html} ../../main/webapp/public/

