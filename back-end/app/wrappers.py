from functools import wraps
from .routes.auth import user_data
from flask import jsonify
from .routes.auth import session



    
def get_user_if_logged(f):
    @wraps(f)
    def decorated_func(*args, **kwargs):
        if session.get('user_id'): 
            print("USER IS LOGGED IN")
            user_id = user_data()[0].json['user_id']
            # print(f"user id is {user_id}")
            return f(user_id, *args, **kwargs)
        else:
            print("USER IS NOT LOGGED IN")
            return jsonify({'message': 'Not loged in'}), 401
    
    return decorated_func
    