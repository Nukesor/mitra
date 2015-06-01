from mitra import app,db,login_manager
from flask import Flask, jsonify, request
from mitra.schemes.login import LoginScheme

@app.route('/_login', methods=['PUT', 'POST'])
def Login():
    parsed = request.get_json()
    print('parsed')
    errors = LoginScheme().validate({'username':parsed['username'],'password':parsed['password']})

    if len(errors) == 0:
        return jsonify(logged_in=True)
    else:
        return jsonify(errors)

