#!/bin/bash

sudo pacman -S --noconfirm --needed python-pip python-virtualenv
sudo npm install -g gulp
virtualenv venv --distribute
