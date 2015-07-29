import datetime, calendar

from flask import jsonify,request
from flask.ext.login import current_user
from sqlalchemy import desc

from mitra import app,db
from mitra.models.entry import Entry
from mitra.schemes.entry import EntryScheme

@app.route('/_addEntry', methods=['PUT', 'POST'])
def AddEntry():
    data = {}
    data['errors'] = {}
    if current_user.is_authenticated():
        parsed = request.get_json()
        entryDate = datetime.date(parsed['year'],parsed['month'],parsed['day'])
        incorrect = EntryScheme().validate(
            {
            'category':parsed['category'],
            'date':entryDate.isoformat(),
            'name':parsed['name'],
            'amount':parsed['amount']
            }
        )
        data['errors'].update(incorrect)

        if len(data['errors']) == 0:
            entry = Entry(current_user.id, parsed['category'], entryDate, parsed['name'], parsed['amount'])
            db.session.add(entry)
            db.session.commit()
            data['success'] = 'Entry added'
            return jsonify(data)
        else:
            return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

@app.route('/_removeEntry', methods=['PUT', 'POST'])
def RemoveEntry():
    data = {}
    if current_user.is_authenticated():
        parsed = request.get_json()
        #TODO: Killing all entries with id. Userid needed in query
        current_user.entries.filter_by(id=parsed['id']).delete()
        db.session.commit()
        data['success'] = 'Entry deleted'
        return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)


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
                    'category':entry.category_name,
                    'id':entry.id
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
                    'category':entry.category_name,
                    'id':entry.id
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

