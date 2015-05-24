from mitra import db

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(120), db.ForeignKey('category.name'))
    userid = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime)
    name = db.Column(db.String(120))
    amount = db.Column(db.Integer)

    def __init__(self, id, userid, category, date, name, amount):
        self.id = id
        self.userid = userid
        self.category = category

        self.date = date
        self.name = name
        self.amount = amount


