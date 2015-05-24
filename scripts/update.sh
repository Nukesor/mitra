#!/bin/bash

. venv/bin/activate
pip install --upgrade -r requirements.txt
npm install
./node_modules/bower/bin/bower install
