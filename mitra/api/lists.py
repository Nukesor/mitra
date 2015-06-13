import datetime, calendar

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
        entries = Entry.query.filter_by(userid=current_user.id).order_by(desc(Entry.date)).limit(50).all()
        if entries:
            for entry in entries:
                data['entries'].append({
                    'name':entry.name,
                    'date':entry.date.__str__(),
                    'amount':entry.amount,
                    'category':entry.category_name
                })
            return jsonify(data)
        else:
            data['errors'] = {}
            data['errors']['empty'] = ['No Entries yet']
            return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)


@app.route('/_monthly', methods=['PUT', 'POST'])
def monthly():
    data = {}
    # TODO: Check for valid User input
    parsed = request.get_json()
    if current_user.is_authenticated():
        data['entries'] = []
        # Specify year, month and time span
        year = parsed['year']
        month = parsed['month']
        num_days = calendar.monthrange(year, month)[1]
        start_date = datetime.date(year, month, 1)
        end_date = datetime.date(year, month, num_days)

        # Search for Entries inside this time span
        entries = Entry.query.filter(Entry.date >= start_date, Entry.date <= end_date).order_by(desc(Entry.date)).all()
        if entries:
            for entry in entries:
                data['entries'].append({
                    'name':entry.name,
                    'date':entry.date.__str__(),
                    'amount':entry.amount,
                    'category':entry.category_name
                })
            return jsonify(data)
        else:
            data['errors'] = {}
            data['errors']['empty'] = ['No Entries for this month']
            return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

@app.route('/_weekly', methods=['PUT', 'POST'])
def Weekly():
    data = {}
    # TODO: Check for valid User input
    parsed = request.get_json()
    if current_user.is_authenticated():
        data['entries'] = []
        # Specify year, month and time span
        year = parsed['year']
        month = parsed['month']
        day = parsed['day']
        weekday = calendar.weekday(year, month, day)
        start_date = datetime.date(year, month, day-weekday)
        end_date = datetime.date(year, month, day-weekday+7)

        # Search for Entries inside this time span
        entries = Entry.query.filter(Entry.date >= start_date, Entry.date <= end_date).order_by(desc(Entry.date)).all()
        if entries:
            for entry in entries:
                data['entries'].append({
                    'name':entry.name,
                    'date':entry.date.__str__(),
                    'amount':entry.amount,
                    'category':entry.category_name
                })
            return jsonify(data)
        else:
            data['errors'] = {}
            data['errors']['empty'] = ['No Entries for this week']
            return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

