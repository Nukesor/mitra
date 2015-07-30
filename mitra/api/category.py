from flask import jsonify,request
from flask.ext.login import current_user

from mitra import app,db
from mitra.models.category import Category

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
    if current_user.is_authenticated():
        parsed = request.get_json()
        current_user.filter_by(name=parsed['name'], userid=current_user.id).delete()
        db.session.commit()
        data['success'] = 'Category deleted'
        return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

@app.route('/_getCategories', methods=['GET', 'POST'])
def getCategories():
    data = {}
    if current_user.is_authenticated():
        categories = current_user.categories.all()
        if categories:
            data['categories'] = []
            for category in categories:
                data['categories'].append({
                    'name':category.name
                })
        return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

