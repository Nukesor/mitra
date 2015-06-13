#!/bin/bash

tmux has-session -t flask
if [ $? -eq 0 ]; then
    tmux kill-session -t flask
    tmux kill-session -t gulp
    sleep 1
fi

tmux new -d -s flask
tmux send -t flask . SPACE venv/bin/activate ENTER
tmux send -t flask python3 SPACE run.py ENTER

tmux new -d -s gulp
tmux send -t gulp gulp ENTER
