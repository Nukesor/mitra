from mitra import ma
from marshmallow import Schema,fields
from marshmallow.exceptions import ValidationError

def username_length(username):
    if type(username) is str:
        if len(username) < 3:
            raise ValidationError('Length must be greater than 2.')
        if len(username) > 40:
            raise ValidationError('Length must not be greater than 40.')

def password_length(password):
    if type(password) is str:
        if len(password) > 40:
            raise ValidationError('Length must not be greater than 40.')

class LoginScheme(Schema):
    username = fields.String(required={'message': 'Password required', 'code': 400},validate=username_length)
    password = fields.String(required={'message': 'Password required', 'code': 400},validate=password_length)
