from flask import Flask,jsonify,request,redirect,url_for
from flask.ext.classy import FlaskView, route
from flask.ext.login import login_user

from mitra import app,db,lm
from mitra.models.user import User
from mitra.schemes.login import LoginScheme

@app.route('/_login', methods=['PUT', 'POST'])
def Login():
    parsed = request.get_json()
    errors = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})

    if len(errors) == 0:
        user = User.query.filter_by(username=parsed['username']).first()
        if user:
            if user.checkPassword(parsed['password']):
                login_user(user)
                return jsonify(logged_in=True)
            else:
                return jsonify(password="p")
        else:
            return jsonify(username="u")

    else:
        return jsonify(errors)

@app.route('/_register', methods=['PUT', 'POST'])
def Register():
    parsed = request.get_json()
    errors = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})

    user = User.query.filter_by(email=parsed['email'])
    if user:
        euser = User.query.filter_by(username=parsed['username'])
    # TODO: Elegant way for database checking
    if not user and not euser:
        if len(errors) == 0:
            user = User(parsed['username'], parsed['password'], parsed['email'])
            if user:
                db.session.add(user)
                db.session.commit()
                return jsonify(registered=True)
            else:
                return jsonify(error="Oups. Something went wrong.")

        else:
            return jsonify(errors)

