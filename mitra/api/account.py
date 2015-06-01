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

@app.route('/_registration', methods=['PUT', 'POST'])
def Registration():
    parsed = request.get_json()
    errors = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})

    if len(errors) == 0:
        return jsonify(logged_in=True)
    else:
        return jsonify(errors)

