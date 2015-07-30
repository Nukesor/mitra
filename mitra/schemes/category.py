from mitra import ma
from mitra.validators.category import *
from marshmallow import Schema,fields

class CategoryScheme(Schema):
    name = fields.String(required={'message': 'Username required', 'code': 400},validate=category_length)

