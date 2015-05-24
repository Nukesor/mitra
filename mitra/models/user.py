from mitra import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)

    categories = db.relationship('Category', backref='user', lazy='dynamic')
    entries = db.relationship('Entry', backref='user', lazy='dynamic')
    monthlies = db.relationship('Monthly', backref='user', lazy='dynamic')

    def __init__(self, id, username, email):
        self.id = id
        self.username = username
        self.email = email

