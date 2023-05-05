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
        # studentId is optional, so use .get()
        student_id = request.json.get('studentId')

        ref = db.reference('Result information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        filtered_data = [student for student in data if student.get(
            'program_char_code') == program_char_code]

        if not filtered_data:
            return jsonify({'message': 'No data found for the specified program_char_code'}), 404

        if student_id:
            student_data = [student for student in filtered_data if student.get(
                'reg_no') == student_id]
            if student_data:
                return jsonify(student_data)
            else:
                return jsonify({'message': 'No data found for the specified student ID'}), 404

        return jsonify(filtered_data)
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/staffreport', methods=['POST'])
def staffreport():
    try:
        designation = request.json['designation']
        gender = request.json['gender']
        ref = db.reference('Staff information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        filtered_data = [staff for staff in data if staff.get(
            'Designation') == designation]

        if gender:
            new_filtered_data = [
                staff for staff in filtered_data if staff.get("Gender") == gender]
            if new_filtered_data:
                return jsonify(new_filtered_data)
            else:
                return jsonify({'message': 'No data found for the specified Gender'}), 404

        if not filtered_data:
            return jsonify({'message': 'No data found for the specified designation'}), 404

        return jsonify(filtered_data)
    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500


@app.route('/studentreport', methods=['POST'])
def studentreport():
    try:
        category = request.json['category']
        gender = request.json['gender']

        ref = db.reference('Student information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        filtered_data = [student for student in data if student.get(
            'Category') == category]

        if gender:
            new_filtered_data = [
                student for student in filtered_data if student.get('Gender') == gender]
            if new_filtered_data:
                return jsonify(new_filtered_data)
            else:
                return jsonify({'message': 'No data found for the specified Gender'}), 404

        if not filtered_data:
            return jsonify({'message': 'No data found for the specified Category'}), 404

        return jsonify(filtered_data)
    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500
    

@app.route('/staff')
def staff():
    ref = db.reference('Staff information')
    data = ref.get()
    return jsonify(data)

@app.route('/students')
def students():
    ref = db.reference('Student information')
    data = ref.get()
    return jsonify(data)

@app.route('/result')
def result():
    ref = db.reference('Result information')
    data = ref.get()
    return jsonify(data)


@app.route('/clearresult')
def clear():
    ref = db.reference('Result information')
    ref.delete()
    return jsonify({'message': 'Data cleared successfully'})


@app.route('/clearstaff', methods=['POST'])
def clearstaff():
    ref = db.reference('Staff information')
    ref.delete()
    return jsonify({'message': 'Data cleared successfully'})


if __name__ == '__main__':
    app.run(debug=True)
