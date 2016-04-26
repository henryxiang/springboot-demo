#!/bin/bash

node server.js &

sleep 2

webpack --progress -w

