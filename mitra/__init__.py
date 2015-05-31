from flask import Flask,render_template
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config.from_pyfile("../config.py.example", silent=True)
app.config.from_pyfile("../config.py", silent=True)
db = SQLAlchemy(app)
ma = Marshmallow(app)

login_manager = LoginManager()
login_manager.init_app(app)

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def Index(path):
    return render_template('index.html')

@login_manager.user_loader
def load_user(userid):
    return User.get(userid)

import mitra.models
import mitra.api

