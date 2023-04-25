from flask import Flask, request, jsonify
from flask_cors import CORS
import openpyxl
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
        workbook = openpyxl.load_workbook(file)
        sheet = workbook.active
        rows = sheet.rows
        headers = [cell.value for cell in next(rows)]
        data = {}
        ref = db.reference('Result information')

        for row in rows:
            values = [cell.value for cell in row]
            student = {}
            for i in range(len(headers)):
                if values[i] is None:
                    student[headers[i]] = None
                else:
                    student[headers[i]] = values[i]
            reg_no = student.pop('reg_no')
            program_char_code = student.pop('program_char_code')
            subject_code = student.pop('subject_code')
            result_master_id = student.pop('result_master_id')
            program_id = student.pop('program_id')
            program_name = student.pop('program_name')
            student_id = student.pop('student_id')
            if program_char_code not in data:
                data[program_char_code] = {}
            if reg_no not in data[program_char_code]:
                data[program_char_code][reg_no] = {}
            if 'subjects' not in data[program_char_code][reg_no]:
                data[program_char_code][reg_no]['subjects'] = {}
            data[program_char_code][reg_no]['subjects'][subject_code] = student
            data[program_char_code][reg_no]['result_master_id'] = result_master_id
            data[program_char_code][reg_no]['student_id'] = student_id
            data[program_char_code]['program_id'] = program_id
            data[program_char_code]['program_name'] = program_name

        # Upload data to Firebase Realtime Database
        ref.set(data)
        return jsonify({'message': 'Data uploaded successfully'})
    except Exception as e:
        error_message = f'Error: {str(e)}'
        return jsonify({'message': error_message}), 500


@app.route('/clearresult')
def clear():
    ref = db.reference('Result information')
    ref.delete()
    return jsonify({'message': 'Data cleared successfully'})


if __name__ == '__main__':
    app.run(debug=True)
