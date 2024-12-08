from flask import Flask ,request,jsonify
from flask_cors import CORS
import pymysql
import bcrypt


app = Flask(__name__)
CORS(app)


mydb = pymysql.connect(
  host="localhost",
  user="root",
  password="",
  database="angular_database"
)
mycursor = mydb.cursor()


@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/Hi', methods=['GET'])
def get_data():
    return {'message': 'Hello Test 123 yo yo'}

@app.route('/get_hotel_by_id/<int:id>', methods=['GET'])
def get_hotel_by_id(id):
    query = 'SELECT * FROM `tbl_hotel` WHERE `id` = %s'
    mycursor.execute(query, (id,))
    hotel = mycursor.fetchone()

    if hotel:
        hotel_data = {
            'id': hotel[0],
            'name': hotel[1],
            'plcae': hotel[2],
            'city': hotel[3],
            'photo': hotel[4],
            'photos': hotel[5],
            'availableUnits': hotel[6],
            'price': hotel[7],
            'rate': hotel[8],
            'type': hotel[9],
            'map': hotel[10],
        }
        return jsonify(hotel_data)
    else:
        return jsonify({'message': 'Hotel not found'}), 404

@app.route('/get_hotel', methods=['GET'])
def get_hotel():
    query = 'SELECT * FROM `tbl_hotel` WHERE 1'
    mycursor.execute(query)
    hotels = mycursor.fetchall()
    hotel_list = []
    for hotel in hotels:
        hotel_list.append({
            'id': hotel[0],    
            'name': hotel[1],
            'place': hotel[2],
            'city': hotel[3],
            'photo': hotel[4],
            'photos': hotel[5],
            'availableUnits': hotel[6],
            'price': hotel[7],
            'rate': hotel[8],
            'type': hotel[9],
            'map': hotel[10],

        })
    return jsonify(hotel_list)

@app.route('/get_booking_details', methods=['GET'])
def get_booking_details():
    query = "SELECT * FROM `tbl_form`"  
    mycursor.execute(query)
    bookings = mycursor.fetchall()
    
    booking_list = []
    for booking in bookings:
        booking_list.append({
            'id': booking[0],
            'firstName': booking[1],
            'lastName': booking[2],
            'email': booking[3],
            'phoneNumber': booking[4],
            'hotelName': booking[5],
            'checkinDate': booking[6],
            'checkoutDate': booking[7],
            'stayDuration': booking[8],
            'totalPrice': booking[9],
            'vat': booking[10],
            'grandTotal': booking[11],
            'paymentMethod': booking[12]
        })
    return jsonify(booking_list)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    try:
        query = "SELECT id, username, password FROM users WHERE username = %s"
        mycursor.execute(query, (data['username'],))
        user = mycursor.fetchone()

        if not user:
            return jsonify({'message': 'Invalid username or password!'}), 401

        user_id, username, hashed_password = user

        if not bcrypt.checkpw(data['password'].encode('utf-8'), hashed_password.encode('utf-8')):
            return jsonify({'message': 'Invalid username or password!'}), 401

        return jsonify({'message': 'Login successful!', 'user_id': user_id, 'username': username}), 200
    except Exception as e:
        print("Error during login:", e)
        return jsonify({'message': 'Login failed!', 'error': str(e)}), 500

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        query = "SELECT `email`, `username` FROM `users` WHERE email = %s OR username = %s"
        mycursor.execute(query, (data['email'], data['username']))
        result = mycursor.fetchone()
        if result:
            if result[0] == data['email']:
                return jsonify({'message': 'Email is already registered!'}), 400
            elif result[1] == data['username']:
                return jsonify({'message': 'Username is already taken!'}), 400
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        query = """
        INSERT INTO users (email, first_name, last_name, username, password)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (data['email'], data['firstName'], data['lastName'], data['username'], hashed_password.decode('utf-8'))
        mycursor.execute(query, values)
        mydb.commit()

        return jsonify({'message': 'Registration successful!'}), 200
    
    except Exception as e:
        print("Error during registration:", e)
        return jsonify({'message': 'Registration failed!', 'error': str(e)}), 500

@app.route('/booking', methods=['POST'])
def booking():
    try:
        data = request.json
        if not data:
            return "Invalid data", 400
        username = data["username"]
        query = "SELECT `email` FROM `users` WHERE username = %s"
        mycursor.execute(query, (username,))
        email = mycursor.fetchone()
        print(email[0])
        query = """
        INSERT INTO `tbl_form` 
        (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `hotel_name`, `checkinDate`, `checkoutDate`, `stayDuration`, `totalPrice`, `vat`, `grandTotal`, `paymentMethod`) 
        VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data["firstName"], 
            data["lastName"], 
            email[0], 
            data["phone"],
            data["hotel_name"], 
            data["checkinDate"], 
            data["checkoutDate"], 
            data["stayDuration"], 
            data["totalPrice"], 
            data["vat"], 
            data["grandTotal"], 
            data["paymentMethod"]
        )
        print("Values to insert:", values)
        try:
            mycursor.execute(query, values)
            mydb.commit()
            print("Booking successfully inserted.")
        except Exception as e:
            print("Error during Booking:", e)

        return jsonify({'message': 'Booking successful'}), 200
    except Exception as e:
        print("Error during Booking:", e)
        return jsonify({'message': 'Booking failed!', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
