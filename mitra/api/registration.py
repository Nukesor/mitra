from mitra import app,db,login_manager
from flask import Flask, jsonify, request
from mitra.schemes.login import LoginScheme

@app.route('/_login')
def Login():
     parsed = request.get_json()
     errors = LoginScheme().validate({'username':parsed.username,'password':parsed.password})
     return jsonify(logged_in=True)


