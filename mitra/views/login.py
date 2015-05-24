from flask import render_template
from mitra import app

@app.route('/')
def hello_world():
    return render_template("login.html")

