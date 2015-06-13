#!/bin/bash

tmux new -d -s flask
tmux send -t flask . SPACE venv/bin/activate ENTER
tmux send -t flask python3 SPACE run.py ENTER

tmux new -d -s gulp
tmux send -t gulp gulp ENTER
