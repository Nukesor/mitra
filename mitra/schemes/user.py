from mitra import ma
from mitra.validators.user import *
from marshmallow import Schema,fields

class LoginScheme(Schema):
    username = fields.String(required={'message': 'Username required', 'code': 400},validate=username_length)
    password = fields.String(required={'message': 'Password required', 'code': 400},validate=password_length)

class RegistrationScheme(Schema):
    username = fields.String(required={'message': 'Username required', 'code': 400},validate=username_length)
    email = fields.Email(required={'message': 'Email required', 'code': 400})
    password = fields.String(required={'message': 'Password required', 'code': 400},validate=password_length)
