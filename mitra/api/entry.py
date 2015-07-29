import datetime, calendar

from flask import jsonify,request
from flask.ext.login import current_user
from sqlalchemy import desc

from mitra import app,db
from mitra.models.entry import Entry
from mitra.schemes.entry import EntryScheme
from mitra.schemes.date import DateSchema

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
        entries = current_user.entries.order_by(desc(Entry.date)).limit(50).all()
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
    data['errors'] = {}
    parsed = request.get_json()
    if current_user.is_authenticated():
        data['entries'] = []
        # Specify year, month and time span
        year = parsed['year']
        month = parsed['month']
        numDays = calendar.monthrange(year, month)[1]
        startDate = datetime.date(year, month, 1)
        endDate = datetime.date(year, month, numDays)

        incorrect = DateSchema().validate({'date':startDate.isoformat(),})
        data['errors'].update(incorrect)


        # Search for Entries inside this time span
        if len(data['errors']) == 0:
            entries = Entry.query.filter(Entry.date >= startDate, Entry.date <= endDate).order_by(desc(Entry.date)).all()
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
            return jsonify(data)

    else:
        data['redirect'] = 'login'
        return jsonify(data)

@app.route('/_weekly', methods=['PUT', 'POST'])
def Weekly():
    data = {}
    data['errors'] = {}
    parsed = request.get_json()
    if current_user.is_authenticated():
        data['entries'] = []
        # Specify year, month and time span
        year = parsed['year']
        month = parsed['month']
        day = parsed['day']
        weekday = calendar.weekday(year, month, day)
        startDate = datetime.date(year, month, day-weekday)
        endDate = datetime.date(year, month, day-weekday+7)

        incorrect = DateSchema().validate({'date':datetime.date(year,month,day).isoformat(),})
        data['errors'].update(incorrect)

        # Search for Entries inside this time span
        if len(data['errors']) == 0:
            entries = Entry.query.filter(Entry.date >= startDate, Entry.date <= endDate).order_by(desc(Entry.date)).all()
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
            return jsonify(data)
    else:
        data['redirect'] = 'login'
        return jsonify(data)

