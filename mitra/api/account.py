from flask import Flask,jsonify,request,redirect,url_for
from flask.ext.classy import FlaskView, route
from flask.ext.login import login_user

from mitra import app,db,lm
from mitra.models.user import User
from mitra.schemes.login import LoginScheme

@app.route('/_login', methods=['PUT', 'POST'])
def Login():
    errors = {}
    parsed = request.get_json()

    user = User.query.filter_by(username=parsed['username']).first()
    if user:
        print('User here')
        if user.checkPassword(parsed['password']):
            print('Nice User')
            login_user(user)
            return jsonify(logged_in=True)
        else:
            print('Bad User')
            errors['WrongPass'] = ['Incorrect Password']
            return jsonify(errors)
    else:
        errors['NoUser'] = ['No such User']
        return jsonify(errors)


@app.route('/_register', methods=['PUT', 'POST'])
def Register():
    parsed = request.get_json()
    errors = {}

    # Check if username or email exists
    userExists = User.query.filter_by(username=parsed['username']).first()
    emailExists = User.query.filter_by(email=parsed['email']).first()
    if userExists:
        errors['userExists'] = ['Username already existing']
    print(emailExists)
    if emailExists:
        errors['emailExists'] = ['Email already existing']

    # Check for valid Username and Password
    incorrect = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})
    errors.update(incorrect)
    if len(errors) == 0:
        user = User(parsed['username'], parsed['password'], parsed['email'])
        if user:
            db.session.add(user)
            db.session.commit()
            return jsonify(registered=True)
        else:
            errors['UnexpectedError'] = 'An unexpeced Error occured'
            return jsonify(errors)

    else:
        return jsonify(errors)

