#!/bin/bash

sudo pacman --noconfirm -Sy python-pip python-virtualenv
sudo npm install -g gulp
virtualenv venv --distribute
