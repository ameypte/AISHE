import React, { useState, useEffect } from "react";
import isLoggedIn from "../components/isLoggedIn";
import Report from "../components/students/Report";
import Upload from "../components/students/Upload";
import Form from "../components/students/Form";


export default function Students() {
    const [isUpLoadFromFile, setIsUpLoadFromFile] = useState(false);
    const [isReport, setIsReport] = useState(false)

    useEffect(() => {
        const isUserLoggedIn = isLoggedIn();

        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, []);


    return (
        <div className="container mx-auto my-4 p-5 rounded shadow bg-body-tertiary row">
            <h1 className="text-center mb-3">Student Information</h1>
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
            {isReport ? (<Report />) : !isUpLoadFromFile ? (<Form />) : (<Upload />)}
        </div>
    );
}
