import React, { useEffect, useState } from "react";
import HowThisWork from "../HowThisWork";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import * as XLSX from "xlsx";

export default function Upload() {
    const [responseMessage, setResponseMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        const databaseRef = firebase.database().ref("Student information");
        if (studentData.length > 0) {
            databaseRef.set(studentData).then(() => {
                setResponseMessage("Data uploaded successfully");
                setIsLoading(false);
            });
        }
    }, [studentData]);

    const handelFileDownload = () => {
        firebase.initializeApp(firebaseConfig);
        const storageRef = firebase.storage().ref("student/");
        const fileRef = storageRef.child("student-templet.xlsx");
        fileRef.getDownloadURL().then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
                const blob = xhr.response;
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "student-templet.xlsx";
                link.click();
            };
            xhr.open("GET", url);
            xhr.send();
        });
    };

    const handelFileUpload = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const file = e.target.upload.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            // Check if required columns exist
            if (
                worksheet.A1 &&
                worksheet.A1.v === "Roll No" &&
                worksheet.G1 &&
                worksheet.G1.v === "Is Minor"
            ) {
                const newData = XLSX.utils.sheet_to_json(worksheet);
                setStudentData(newData);
            } else {
                alert("The uploaded file does not match the expected format.");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <>
                <HowThisWork />
                <hr />
                <h3 className="mb-3">Upload From File</h3>
                {responseMessage && (
                    <div
                        className={`alert ${
                            responseMessage.includes("successfully")
                                ? "alert-success"
                                : "alert-danger"
                        }`}
                        role="alert"
                    >
                        {responseMessage}
                    </div>
                )}
                <form onSubmit={handelFileUpload}>
                    <div className="row">
                        <div className="col-6">
                            <label
                                htmlFor="download"
                                className="form-label d-block"
                            >
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
                            <label
                                htmlFor="upload"
                                className="form-label d-block"
                            >
                                Upload the file
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="upload"
                                name="upload"
                            />
                        </div>
                        <div className="text-end">
                            {isLoading ? (
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </>
        </div>
    );
}
