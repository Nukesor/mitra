from flask import jsonify,request
from flask.ext.login import current_user

from mitra import app,db
from mitra.models.category import Category
from mitra.schemes.login import LoginScheme

@app.route('/_addCategory', methods=['PUT', 'POST'])
def AddCategory():
    data = {}
    # TODO Check for valid Userinput
    if current_user.is_authenticated():
        parsed = request.get_json()
        category = Category(parsed['name'], current_user.id)
        db.session.add(category)
        db.session.commit()
        data['success'] = 'Category added'
        return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

@app.route('/_removeCategory', methods=['PUT', 'POST'])
def RemoveCategory():
    data = {}
    # TODO Check for valid Userinput
    if current_user.is_authenticated():
        parsed = request.get_json()
        Category.query.filter_by(name=parsed['name'], userid=current_user.id).delete()
        db.session.commit()
        data['success'] = 'Category deleted'
        return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

@app.route('/_getCategories', methods=['GET', 'POST'])
def getCategories():
    data = {}
    # TODO Check for valid Userinput
    if current_user.is_authenticated():
        data['categories'] = db.session.query(Category.name)
        print(data['categories'])
        return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

