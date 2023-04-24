import React, { useState, useEffect } from "react";
import firebaseConfig from "../components/config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import isLoggedIn from "../components/isLoggedIn";
import HowThisWork from "../components/HowThisWork";
import * as XLSX from "xlsx";

firebase.initializeApp(firebaseConfig);

export default function Staff() {
  const [isUpLoadFromFile, setIsUpLoadFromFile] = useState(false);
  const isUserLoggedIn = isLoggedIn();
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      window.location.href = "/";
      alert("You are not logged in");
      return null;
    }

    const databaseRef = firebase.database().ref("Staff information");

    if (staffData.length > 0) {
      databaseRef.set(staffData).then(() => {
        alert("Data uploaded successfully");
      });
    }
  }, [staffData, isUserLoggedIn]);

  // const requiredColumns = [
  //   "Sr No",
  //   "First Name",
  //   "Middle Name",
  //   "Last Name",
  //   "PAN Number",
  //   "Gender",
  //   "Date of Birth",
  //   "Email Address",
  //   "Mobile Number",
  //   "Designation",
  // ];

  const handelFileUpload = (event) => {
    const file = document.getElementById("upload").files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Check if required columns exist
      if (
        worksheet.A1 &&
        worksheet.A1.v === "Sr No" &&
        worksheet.J1 &&
        worksheet.J1.v === "Designation"
      ) {
        const newData = XLSX.utils.sheet_to_json(worksheet);
        setStaffData(newData);
      } else {
        alert("The uploaded file does not match the expected format.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handelFileDownload = () => {
    const storageRef = firebase.storage().ref("staff/");
    const fileRef = storageRef.child("staff-templet.xlsx");
    fileRef.getDownloadURL().then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "staff-templet.xlsx";
        link.click();
      };
      xhr.open("GET", url);
      xhr.send();
    });
  };

  return (
    <div className="container my-4 mx-auto p-5 rounded shadow bg-body-tertiary row">
      <h1 className="text-center mb-3">Staff/Faculty Information</h1>
      <div>
        <button
          type="button"
          className="mb-3 btn btn-outline-primary"
          onClick={() => setIsUpLoadFromFile(!isUpLoadFromFile)}
        >
          {!isUpLoadFromFile ? "Upload file" : "Fill from"}
        </button>
      </div>
      {!isUpLoadFromFile ? (
        <h1>Fill the form</h1>
      ) : (
        <>
          <HowThisWork />
          <hr />
          <h3 className="mb-3">Upload From File</h3>
          <div className="row">
            <div className="col-6">
              <label htmlFor="download" className="form-label d-block">
                Downlaod the following template file
              </label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelFileDownload}
              >
                <i className="bi bi-cloud-download"></i>
                Download
              </button>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="upload" className="form-label d-block">
                Upload the file
              </label>
              <input
                type="file"
                className="form-control"
                id="upload"
                name="upload"
              />
            </div>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-success"
                onClick={handelFileUpload}
              >
                <i className="bi bi-cloud-upload"></i>
                Upload
              </button>
            </div>
            {/* display staffData varible value */}
            <pre>{JSON.stringify(staffData, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
