from mitra import ma
from marshmallow import Schema,fields

class DateSchema(Schema):
    date = fields.Date(required={'message': 'Date required', 'code': 400})


