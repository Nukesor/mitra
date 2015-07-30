from marshmallow.exceptions import ValidationError

def category_length(username):
    if type(username) is str:
        if len(username) > 120:
            raise ValidationError('Category name must be shorter than 120 characters.')

