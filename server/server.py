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
        student_id = request.json.get('studentId')
        percentage = request.json.get('percent')
        category = request.json.get('category')

        ref = db.reference('Result information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        if program_char_code == 'All':
            filtered_data = data
        else:
            filtered_data = [student for student in data if student.get(
                'program_char_code') == program_char_code]

        if not filtered_data:
            return jsonify({'message': 'No data found for the specified program_char_code'}), 404

        if student_id:
            student_data = [student for student in filtered_data if student.get(
                'reg_no') == student_id]
            if not student_data:
                return jsonify({'message': 'No data found for the specified student ID'}), 404
            filtered_data = student_data

        if percentage == 'All':
            pass  # No filtering required
        elif percentage == 'Above 60%':
            filtered_data = [
                student for student in filtered_data if float(student.get('percentage')) > 60]
        elif percentage == 'Below 60%':
            filtered_data = [
                student for student in filtered_data if float(student.get('percentage')) < 60]
        elif percentage == 'Above 75%':
            filtered_data = [
                student for student in filtered_data if float(student.get('percentage')) > 75]
        else:
            return jsonify({'message': 'Invalid percentage value'}), 400
        print(category)
        if category == 'All':
            pass
        else:
            filtered_data = [
                student for student in filtered_data if student.get('category') == category]

        return jsonify(filtered_data)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@app.route('/resultslat', methods=['GET'])
def resultslate():
    try:
        # Design the slate method
        ref = db.reference('Result information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        # Calculate the required data for the slate
        slate_data = []
        program_data = {}
        category_data = {
            'General': {'M': 0, 'F': 0, 'O': 0},
            'EWS': {'M': 0, 'F': 0, 'O': 0},
            'SC': {'M': 0, 'F': 0, 'O': 0},
            'ST': {'M': 0, 'F': 0, 'O': 0},
            'OBC': {'M': 0, 'F': 0, 'O': 0},
            'Total': {'M': 0, 'F': 0, 'O': 0}
        }

        for student in data:
            program = student.get('program_char_code')
            category = student.get('category')
            gender = student.get('gender')

            if program not in program_data:
                program_data[program] = {
                    'General': {'M': 0, 'F': 0, 'O': 0},
                    'EWS': {'M': 0, 'F': 0, 'O': 0},
                    'SC': {'M': 0, 'F': 0, 'O': 0},
                    'ST': {'M': 0, 'F': 0, 'O': 0},
                    'OBC': {'M': 0, 'F': 0, 'O': 0},
                    'Total': {'M': 0, 'F': 0, 'O': 0}
                }

            program_data[program][category][gender] += 1
            program_data[program]['Total'][gender] += 1
            category_data[category][gender] += 1
            category_data['Total'][gender] += 1

        # Prepare the slate data
        for program, categories in program_data.items():
            row = {
                'program': program,
                **categories['General'],
                **categories['EWS'],
                **categories['SC'],
                **categories['ST'],
                **categories['OBC'],
                **categories['Total']
            }
            slate_data.append(row)

        # Return the slate data
        return jsonify(slate_data)
    except Exception as e:
        print(e)
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

        if designation == 'All':
            return jsonify(data)
        elif designation == 'All HOD':
            filtered_data = [staff for staff in data if staff.get(
                'Designation') if 'HOD' in staff.get('Designation')]
        elif designation == 'All Lecturer':
            filtered_data = [staff for staff in data if staff.get(
                'Designation') if 'Lecturer' in staff.get('Designation')]
        else:
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

    
@app.route('/staffslat', methods=['POST'])
def staffslate():
    try:
        ref = db.reference('Staff information')
        data = ref.get()

        if data is None:
            return jsonify({'message': 'No data found'}), 404

        # Count staff for each designation
        designation_counts = {}
        for staff in data:
            designation = staff.get('Designation')
            if designation in designation_counts:
                designation_counts[designation] += 1
            else:
                designation_counts[designation] = 1

        # Prepare the table rows
        rows = []
        sr_no = 1
        for designation, count in designation_counts.items():
            male_count = sum(1 for staff in data if staff.get('Designation') == designation and staff.get('Gender') == 'Male')
            female_count = sum(1 for staff in data if staff.get('Designation') == designation and staff.get('Gender') == 'Female')
            others_count = sum(1 for staff in data if staff.get('Designation') == designation and staff.get('Gender') not in ['Male', 'Female'])

            row = {
                'Designation': designation,
                'Total': count,
                'Male': male_count,
                'Female': female_count,
                'Others': others_count
            }
            rows.append(row)
            sr_no += 1

        return jsonify(rows)
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

        if category == 'All':
            filtered_data = data
        else:
            filtered_data = [student for student in data if student.get(
                'Category') == category]

        if gender:
            if gender == 'All':
                new_filtered_data = filtered_data
            else:
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
