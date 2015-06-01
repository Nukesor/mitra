from mitra import db
from werkzeug.security import generate_password_hash,check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(40))
    is_authenticated = db.Column(db.Integer)
    is_active = db.Column(db.Integer)
    is_anonymous = db.Column(db.Integer)

    categories = db.relationship('Category', backref='user', lazy='dynamic')
    entries = db.relationship('Entry', backref='user', lazy='dynamic')
    monthlies = db.relationship('Monthly', backref='user', lazy='dynamic')

    def __init__(self, username, password, email):
        self.username = username
        self.email = email
        self.setPassword(password)

    def get_id(self):
        return user.id

    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)

