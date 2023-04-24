from flask import Flask, request, jsonify
import openpyxl
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

app = Flask(__name__)

# Initialize Firebase App
cred = credentials.Certificate('server/firebase/serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gpa-database-default-rtdb.firebaseio.com/'
})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    
    # Read data from Excel file
    workbook = openpyxl.load_workbook(file)
    sheet = workbook.active
    rows = sheet.rows
    headers = [cell.value for cell in next(rows)]
    data = []
    for row in rows:
        values = [cell.value for cell in row]
        data.append(dict(zip(headers, values)))

    # Upload data to Firebase Realtime Database
    ref = db.reference('Result information')
    ref.set(data)
    
    return jsonify({'message': 'Data uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)