import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from mitra import app, db
from mitra.models import *

db.drop_all()
db.create_all()

user = User('admin', 'arne@twobeer.de', 'hunter2')
db.session.add(user)
db.session.commit()


