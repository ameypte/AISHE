import pandas as pd
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
app = Flask(__name__)
CORS(app)

# Initialize Firebase App
cred = credentials.Certificate('server/firebase/serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gpa-database-default-rtdb.firebaseio.com/'
})


@app.route('/resultupload', methods=['POST'])
def upload():
    try:
        file = request.files['file']

        # Read data from Excel file
        df = pd.read_excel(file)
        df = df.astype(str)

        # Convert data to JSON format
        data = df.to_dict(orient='records')

        # Upload data to Firebase Realtime Database
        ref = db.reference('Result information')
        ref.set(data)

        return jsonify({'message': 'Data uploaded successfully'})
    except Exception as e:
        return jsonify({'message': str(e)})


@app.route('/resultreport', methods=['POST'])
def report():
    try:
        program_char_code = request.json['program_char_code']
        student_id = request.json.get('studentId')  # studentId is optional, so use .get()

        ref = db.reference('Result information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        filtered_data = [student for student in data if student.get(
            'program_char_code') == program_char_code]

        if not filtered_data:
            return jsonify({'message': 'No data found for the specified program_char_code'}), 404

        if student_id:
            student_data = [student for student in filtered_data if student.get('reg_no') == student_id]
            if student_data:
                return jsonify(student_data)
            else:
                return jsonify({'message': 'No data found for the specified student ID'}), 404

        return jsonify(filtered_data)
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/clearresult')
def clear():
    ref = db.reference('Result information')
    ref.delete()
    return jsonify({'message': 'Data cleared successfully'})


if __name__ == '__main__':
    app.run(debug=True)
