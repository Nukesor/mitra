#!/bin/bash

sudo pacman --noconfirm -Sy python-pip python-virtualenv
virtualenv venv --distribute
