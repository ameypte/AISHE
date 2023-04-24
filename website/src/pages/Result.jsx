import React, { useState, useEffect } from "react";
import isLoggedIn from "../components/isLoggedIn";
import HowThisWork from "../components/HowThisWork";
import firebaseConfig from "../components/config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import * as XLSX from "xlsx";

export default function Result() {
    const [isUpLoadFromFile, setIsUpLoadFromFile] = useState(false);
    const [resultData, setResultData] = useState([]);
    const isUserLoggedIn = isLoggedIn();
    const [isLoding, setIsLoding] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    useEffect(() => {
        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, []);

    useEffect(() => {
        if (!resultData.length) return;
        firebase.initializeApp(firebaseConfig);
        const databaseRef = firebase.database().ref("Result information");
        const chunkSize = 2000; // set chunk size to 500 records
        const chunks = resultData.reduce((acc, cur, i) => {
            const chunkIndex = Math.floor(i / chunkSize);
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
            }
            acc[chunkIndex].push(cur);
            return acc;
        }, []);
        let count = 0;
        let writePromise = Promise.resolve();
        setIsLoding(true);
        setFirebaseError(null);
        chunks.forEach((chunk) => {
            writePromise = writePromise.then(() => {
                count++;
                databaseRef.child("chunk" + count).set(chunk);
            });
        });
        writePromise
            .then(() => {
                setIsLoding(false);
                alert("Data uploaded successfully");
            })
            .catch((error) => {
                console.error(error);
                setFirebaseError(error);
            });
    }, [resultData]);

    const handelFileDownload = () => {
        alert("Download file");
    };

    const handelFileUpload = () => {
        setIsLoding(true);
        const file = document.getElementById("upload").files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            // Check if required columns exist
            if (
                worksheet.A1 &&
                worksheet.A1.v === "id" &&
                worksheet.F1 &&
                worksheet.F1.v === "program_name"
            ) {
                const newData = XLSX.utils.sheet_to_json(worksheet);
                setResultData(newData);
            } else {
                alert("The uploaded file does not match the expected format.");
            }
        };
        reader.readAsArrayBuffer(file);
    };
    return (
        <>
            <div className="container my-4 p-5 rounded shadow bg-body-tertiary">
                <h1 className="text-center mb-3">Results Page</h1>

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
                                    type="file"
                                    className="form-control"
                                    id="upload"
                                    name="upload"
                                />
                            </div>
                            <div className="text-end">
                                {isLoding ? (
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
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handelFileUpload}
                                    >
                                        Upload
                                    </button>
                                )}
                            </div>
                            {/* display staffData varible value */}
                            <pre>{JSON.stringify(resultData, null, 2)}</pre>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
