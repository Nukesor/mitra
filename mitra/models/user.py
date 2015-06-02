from mitra import db,lm
from werkzeug.security import generate_password_hash,check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(40))

    categories = db.relationship('Category', backref='user', lazy='dynamic')
    entries = db.relationship('Entry', backref='user', lazy='dynamic')
    monthlies = db.relationship('Monthly', backref='user', lazy='dynamic')

    def __init__(self, username, password, email):
        self.username = username
        self.email = email
        self.setPassword(password)

    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)

    def is_authenticated():
        return True

    def is_active(self):
        return True

    def is_anonymous():
        return False

    def get_id(self):
        return str(self.id)


@lm.user_loader
def load_user(userid):
    return User.query.filter_by(id=userid).first()

