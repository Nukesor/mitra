from mitra import db

class Category(db.model):
    name = db.Column(db.String(120), primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, name, userid):
        self.name = name
        self.userid = userid
