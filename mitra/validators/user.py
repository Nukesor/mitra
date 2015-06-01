from marshmallow.exceptions import ValidationError

def username_length(username):
    if type(username) is str:
        if len(username) < 2:
            raise ValidationError('Username must be at least 2 characters.')
        if len(username) > 40:
            raise ValidationError('Username must be shorter than 40 characters.')

def password_length(password):
    if type(password) is str:
        if len(password) < 2:
            raise ValidationError('Password must be at least 2 characters.')
        if len(password) > 40:
            raise ValidationError('Password must be shorter than 40 characters.')

