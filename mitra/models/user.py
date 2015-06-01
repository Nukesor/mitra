from mitra import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    email = db.Column(db.String(120), unique=True)
    Password = db.Column(db.String(40))

    categories = db.relationship('Category', backref='user', lazy='dynamic')
    entries = db.relationship('Entry', backref='user', lazy='dynamic')
    monthlies = db.relationship('Monthly', backref='user', lazy='dynamic')

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

