from mitra import db

class Monthly(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(120), db.ForeignKey('category.name'))
    userid = db.Column(db.Integer, db.ForeignKey('user.id'))

    name = db.Column(db.String(120))
    begin = db.Column(db.String(120))
    amount = db.Column(db.Integer)

    def __init__(self, id, userid, category, name, begin, amount):
        self.id = id
        self.userid = userid
        self.category = category

        self.name = name
        self.begin = begin
        self.amount = amount
