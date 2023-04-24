import React from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import "./App.css";

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

firebase.initializeApp(firebaseConfig);
const database = firebase.database().ref("Courses");
const storage = firebase.storage().ref();

export default function FormAddCourse() {
    function addCourse(event) {
        event.preventDefault();
        const courseData = new FormData(event.target);
        const course = {};
    
        for (let [key, value] of courseData.entries()) {
          if (key === "courseCurriculum") {
            // Read the file data and upload it to Firebase Storage
            const file = event.target.courseCurriculum.files[0];
            const fileRef = storage.child(file.name);
            fileRef.put(file).then((snapshot) => {
              const downloadUrl = snapshot.ref.getDownloadURL();
              downloadUrl.then((url) => {
                course[key] = { name: file.name, url: url };
                // Push the course details to the database
                const courseCode = course.courseCode;
                delete course.courseCode;
                database.child(courseCode).set(course);
              });
            });
          } else {
            course[key] = value;
          }
        }
      }
  return (
    <div>
      <form className="container mt-5" onSubmit={addCourse}>
        <div className="row mb-3">
          <h2 className="mb-3">Enter Course Details</h2>
          <div className="col-md-3 col-sm-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Course Code"
              aria-label="Course Code"
              name="courseCode"
            />
          </div>
          <div className="col-md col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Course Title"
              aria-label="Course Title"
              name="courseTitle"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Total Credits"
              aria-label="Total Credits"
              name="totalCredits"
            />
          </div>
          <div className="col-md col-sm-6 mb-3">
            <div className="input-group">
              <label className="input-group-text" htmlFor="inputGroupFile01">
                Upload Curriculum
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                name="courseCurriculum"
              />
            </div>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
