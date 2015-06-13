import sys, os, datetime
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from mitra import app, db
from mitra.models import *

db.drop_all()
db.create_all()

user = User('admin', 'hunter2', 'arne@twobeer.de')
db.session.add(user)

food = Category('Food', 1)
book = Category('Books', 1)
rent = Category('Rent', 1)

db.session.add(food)
db.session.add(book)
db.session.add(rent)

book1 = Entry(1, 'Books', datetime.date.today(), 'A nice book', 1500)
book2 = Entry(1, 'Books', datetime.date.today(), 'A nice book', 1500)
book3 = Entry(1, 'Books', datetime.date.today(), 'A nice book', 1500)
book4 = Entry(1, 'Books', datetime.date.today(), 'A nice book', 1500)
asia1 = Entry(1, 'Food', datetime.date.today(), 'Asia noodles', 450)
asia2 = Entry(1, 'Food', datetime.date.today(), 'Asia noodles2', 450)
asia3 = Entry(1, 'Food', datetime.date.today(), 'Asia noodles3', 450)
doener1 = Entry(1, 'Food', datetime.date.today(), 'A nice doener', 450)
doener2 = Entry(1, 'Food', datetime.date.today(), 'A nice doener2', 450)
rent = Entry(1, 'Rent', datetime.date.today(), 'Rent', 450)

db.session.add(book1)
db.session.add(book2)
db.session.add(book3)
db.session.add(book4)
db.session.add(asia1)
db.session.add(asia2)
db.session.add(asia3)
db.session.add(doener1)
db.session.add(doener2)
db.session.add(rent)

db.session.commit()
