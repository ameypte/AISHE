import React, { useState, useEffect } from "react";
import firebaseConfig from "../components/config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import Form from "../components/staff/Form";
import Upload from "../components/staff/Upload";
import isLoggedIn from "../components/isLoggedIn";
import Report from "../components/staff/Report";

firebase.initializeApp(firebaseConfig);

export default function Staff() {
    const [isUpLoadFromFile, setIsUpLoadFromFile] = useState(false);
    const isUserLoggedIn = isLoggedIn();
    const [isReport, setIsReport] = useState(false);

    useEffect(() => {
        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, [isUserLoggedIn]);

    return (
        <div className="container my-4 mx-auto p-5 rounded shadow bg-body-tertiary row">
            <h1 className="text-center mb-3">Staff/Faculty Information</h1>
            <div>
                <button
                    type="button"
                    className="mb-3 me-3 btn btn-outline-primary"
                    onClick={() => {
                        setIsUpLoadFromFile(!isUpLoadFromFile);
                        setIsReport(false);
                    }}
                >
                    {!isUpLoadFromFile ? "Upload file" : "Fill from"}
                </button>

                <button
                    className="mb-3 btn  btn-success"
                    onClick={() => setIsReport(true)}
                    disabled={isReport}
                >
                    Generate Report
                </button>
            </div>
            {isReport ? <Report /> : !isUpLoadFromFile ? <Form /> : <Upload />}
        </div>
    );
}
