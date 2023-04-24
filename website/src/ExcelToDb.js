import React, { useState } from "react";firebase
import * as XLSX from "xlsx";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkI_20-DBLHaqEzabKSn0BMnkNpFHJmHs",
  authDomain: "learning-mg-sys.firebaseapp.com",
  databaseURL: "https://learning-mg-sys-default-rtdb.firebaseio.com",
  projectId: "learning-mg-sys",
  storageBucket: "learning-mg-sys.appspot.com",
  messagingSenderId: "931084032585",
  appId: "1:931084032585:web:8e94044070568a67f5fd98",
  measurementId: "G-JKRXJDT937",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function ExcelToDb() {
  const [success, setSuccess] = useState(false);
  const [coursesWithKeys, setCoursesWithKeys] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const courses = XLSX.utils.sheet_to_json(worksheet);

      // Set the courseCode as the key in Firebase Realtime Database
      setCoursesWithKeys(
        courses.reduce((obj, course) => {
          obj[course.courseCode] = course;
          return obj;
        }, {})
      );
    };
    reader.readAsArrayBuffer(file);
  };

  function handleSublit(event) {
    event.preventDefault();
    if (!event.target[0].value) {
      alert("Please select a file");
      return;
    } else {
      firebase
        .database()
        .ref("Courses")
        .set(coursesWithKeys)
        .then(() => {
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
      alert("File uploaded successfully");
    }
  }
  return (
    <div className="container mt-5">
      <form onSubmit={handleSublit}>
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={handleFileUpload}
          />
        </div>
        {success && (
          <div>
            <h2 className="my-4">Courses</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(coursesWithKeys).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{coursesWithKeys[key].courseTitle}</td>
                      <td>{coursesWithKeys[key].courseCredits}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* <pre>{JSON.stringify(coursesWithKeys, null, 2)}</pre> */}
          </div>
        )}
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-outline-primary mb-5">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExcelToDb;
