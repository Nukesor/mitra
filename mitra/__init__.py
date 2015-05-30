from flask import Flask,render_template
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile("../config.py.example", silent=True)
app.config.from_pyfile("../config.py", silent=True)
db = SQLAlchemy(app)

@app.route('/')
def Index():
    return render_template('index.html')

import mitra.models

