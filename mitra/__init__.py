from flask import Flask,render_template
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config.from_pyfile("../config.py.example", silent=True)
app.config.from_pyfile("../config.py", silent=True)
db = SQLAlchemy(app)
ma = Marshmallow(app)

lm = LoginManager()
lm.init_app(app)

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def Index(path):
    return render_template('index.html')

import mitra.models
import mitra.api

