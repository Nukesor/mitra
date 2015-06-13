from flask import Flask,jsonify,request,redirect,url_for
from flask.ext.classy import FlaskView, route
from flask.ext.login import current_user
from sqlalchemy import desc

from mitra import app,db,lm
from mitra.models.entry import Entry
from mitra.schemes.login import LoginScheme

@app.route('/_lastTransactions', methods=['PUT', 'POST'])
def LastTransactions():
    data = {}
    if current_user.is_authenticated():
        data['entries'] = []
        recent = Entry.query.filter_by(userid=current_user.id).order_by(desc(Entry.date)).limit(50).all()
        if recent:
            for entry in recent:
                data['entries'].append({
                    'name':entry.name,
                    'date':entry.date.__str__(),
                    'amount':entry.amount,
                    'category':entry.category_name
                })
            return jsonify(data)
        else:
            data['errors'] = {}
            data['errors']['empty'] = ['No Entries']
            return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)


@app.route('/_monthly', methods=['PUT', 'POST'])
def monthly():
    if current_user.is_authenticated():
        return jsonify(jojo="atomrofl")

@app.route('/_weekly', methods=['PUT', 'POST'])
def Weekly():
    if current_user.is_authenticated():
        return jsonify(jojo="atomrofl")

