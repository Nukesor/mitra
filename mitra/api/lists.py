from flask import Flask,jsonify,request,redirect,url_for
from flask.ext.classy import FlaskView, route
from flask.ext.login import current_user

from mitra import app,db,lm
from mitra.models.user import User
from mitra.schemes.login import LoginScheme

@app.route('/_lastTransactions', methods=['PUT', 'POST'])
def LastTransactions():
    data = {}
    if current_user.is_authenticated():
        return jsonify(jojo="atomrofl")
    else:
        data['redirect'] = 'login'


@app.route('/_monthly', methods=['PUT', 'POST'])
def monthly():
    if current_user.is_authenticated():
        return jsonify(jojo="atomrofl")

@app.route('/_weekly', methods=['PUT', 'POST'])
def Weekly():
    if current_user.is_authenticated():
        return jsonify(jojo="atomrofl")

