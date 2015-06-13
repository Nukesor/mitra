#!/bin/bash

tmux has-session -t flask
if [ $? -eq 0 ]; then
    tmux kill-session -t flask
    tmux kill-session -t gulp
    sleep 1
fi

