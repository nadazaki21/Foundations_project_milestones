from flask import request, jsonify, session, Blueprint, url_for
from ..models.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from ..database import db
from requests import request as req

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'], strict_slashes = False)
def signup():
    """creates a new user"""
    data = request.json
    # print("Request data:", data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists!'}), 400

    try:
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        session['username'] = new_user.username
        session['user_email'] = new_user.email
        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'message': 'Internal server error'}), 500



@auth_bp.route('/user-data', methods=['GET'], strict_slashes = False)
def user_data():
    """ returns info of current logged in user if any user is actually logged in"""
    if not session.get('user_id'):
        return jsonify({'message': 'Not loged in'}), 401 # to check if a user is logged in or not
    
    user_id = session['user_id']
    username = session['username']
    user_email = session['user_email']
   
    return jsonify({'user_id': user_id, 'username': username, 'user_email': user_email}) , 200



@auth_bp.route('/log-in', methods=['POST'], strict_slashes = False)
def login():
    """ checks if user exists, if he does and credentials match, log him in (create a seesion for him)"""
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):

            session['user_id'] = user.id
            session['username'] = user.username
            session['user_email'] = user.email
            session.modified = True
            
            print ({'user_id': user.id, 'username': user.username, 'user_email': user.email})
            return jsonify({'message': 'User Loged successfully!'}), 201
            
 
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500


