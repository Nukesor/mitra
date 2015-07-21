#!/bin/bash

. venv/bin/activate
pip install --upgrade pip
pip install --upgrade -r requirements.txt
npm update
./node_modules/bower/bin/bower update
