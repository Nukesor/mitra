from mitra import app,db,login_manager
from flask import Flask, jsonify, request
from flask.ext.classy import FlaskView, route
from mitra.schemes.login import LoginScheme

@app.route('/_login', methods=['PUT', 'POST'])
def Login():
    parsed = request.get_json()
    errors = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})

    if len(errors) == 0:
        return jsonify(logged_in=True)
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

