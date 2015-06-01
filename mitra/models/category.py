from mitra import db

class Category(db.Model):
    name = db.Column(db.String(120), primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('user.id'))

    entries = db.relationship('Entry', backref='category', lazy='dynamic')
    monthlies = db.relationship('Monthly', backref='category', lazy='dynamic')

    def __init__(self, name, userid):
        self.name = name
        self.userid = userid
