from mitra import ma
from marshmallow import Schema,fields

class EntryScheme(Schema):
    name = fields.String(required={'message': 'Name required', 'code': 400})
    category = fields.String()
    amount = fields.Decimal(required={'message': 'Amount required', 'code': 400}, places=2)
    date = fields.Date(required={'message': 'Date required', 'code': 400})


