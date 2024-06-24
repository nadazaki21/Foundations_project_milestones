from functools import wraps
from routes.auth import user_data
from flask import jsonify
from routes.auth import session



def check_state():
    print ( 'acessed check state function...........')
    res = user_data() 
    print(res[1] + res[2])
    if res[2] == 200:
        user_id = res[1].get('user_id')
        print(user_id)
        return user_id
    else:
        return res[2]
    
def get_user_if_logged(f):
    @wraps(f)
    def decorated_func(*args, **kwargs):
        if session.get('user_id'): 
            user_id = user_data()[0].json['user_id']
            print(f"user id is {user_id}")
            return f(user_id, *args, **kwargs)
        else:
            return jsonify({'message': 'Not loged in'}), 401
    
    return decorated_func
    