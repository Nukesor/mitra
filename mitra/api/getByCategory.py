import datetime, calendar

from flask import jsonify,request
from flask.ext.login import current_user
from sqlalchemy import desc

from mitra import app,db
from mitra.models.entry import Entry
from mitra.schemes.date import DateSchema

@app.route('/_entryByCategory', methods=['PUT', 'POST'])
def EntryByCategory():
    data = {}
    data['errors'] = {}
    if current_user.is_authenticated():
        data['entries'] = []
        # Specify year, month and time span
        year = parsed['year']
        month = parsed['month']
        numDays = calendar.monthrange(year, month)[1]
        startDate = datetime.date(year, month, 1)
        endDate = datetime.date(year, month, numDays)

        incorrect = DateSchema().validate({'date':startDate.isoformat()})
        data['errors'].update(incorrect)

        if len(data['errors']) == 0:
            current_user.entries.filter(Entry.date >= startDate, Entry.date <= endDate, Entry.category == parsed['category']).order_by(desc(Entry.date)).all()
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

