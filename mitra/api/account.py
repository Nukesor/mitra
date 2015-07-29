from flask import Flask,jsonify,request,redirect,url_for
from flask.ext.classy import FlaskView, route
from flask.ext.login import login_user, logout_user, current_user

from mitra import app,db,lm
from mitra.models.user import User
from mitra.schemes.login import LoginScheme

@app.route('/_login', methods=['PUT', 'POST'])
def Login():
    data = {}
    data['errors'] = {}
    parsed = request.get_json()

    user = User.query.filter_by(username=parsed['username']).first()
    if user:
        if user.checkPassword(parsed['password']):
            login_user(user)
            data['redirect'] = 'overview'
            return jsonify(data)
        else:
            data['errors']['password'] = ['Incorrect Password']
            return jsonify(data)
    else:
        data['errors']['user'] = ['No such User']
        return jsonify(data)


@app.route('/_register', methods=['PUT', 'POST'])
def Register():
    parsed = request.get_json()
    data = {}
    data['errors'] = {}

    # Check if username or email exists
    userExists = User.query.filter_by(username=parsed['username']).first()
    emailExists = User.query.filter_by(email=parsed['email']).first()
    if userExists:
        data['errors']['user'] = ['Username already existing']
    if emailExists:
        data['errors']['email'] = ['Email already existing']

    # Check for valid Username and Password
    incorrect = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})
    data['errors'].update(incorrect)

    # I there are no errors, a new User es beeing created
    if len(data['errors']) == 0:
        user = User(parsed['username'], parsed['password'], parsed['email'])
        if user:
            db.session.add(user)
            db.session.commit()
            data['redirect'] = 'login'
            return jsonify(data)
        else:
            data['errors']['UnexpectedError'] = 'An unexpeced Error occured'
            return jsonify(data)

    else:
        return jsonify(data)

@app.route('/_loggedIn', methods=['GET', 'POST'])
def LoggedIn():
    data = {}
    if current_user.is_authenticated():
        data['loggedIn'] = True
        return jsonify(data)
    else:
        data['loggedIn'] = False
        return jsonify(data)

@app.route('/_logout', methods=['PUT', 'POST'])
def Logout():
    data = {}

    if current_user.is_authenticated():
        logout_user()

    data['redirect'] = 'login'
    return jsonify(data)
