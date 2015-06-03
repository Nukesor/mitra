from mitra import ma
from mitra.validators.user import *
from marshmallow import Schema,fields

class LoginScheme(Schema):
    username = fields.String(required={'message': 'Password required', 'code': 400},validate=username_length)
    password = fields.String(required={'message': 'Password required', 'code': 400},validate=password_length)

class RegistrationScheme(Schema):
    username = fields.String(required={'message': 'Password required', 'code': 400},validate=username_length)
    username = fields.String(required={'message': 'Password required', 'code': 400},validate=username_length)
    password = fields.String(required={'message': 'Password required', 'code': 400},validate=password_length)
