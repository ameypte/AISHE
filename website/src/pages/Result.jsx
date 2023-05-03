import React, { useState, useEffect } from "react";
import "firebase/compat/database";
import Upload from "../components/result/Upload";
import Form from "../components/result/Form";
import Report from "../components/result/Report";
import isLoggedIn from "../components/isLoggedIn";

export default function Result() {
    const [isUpLoadFromFile, setIsUpLoadFromFile] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const isUserLoggedIn = isLoggedIn();

    useEffect(() => {
        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, [isUserLoggedIn]);

    return (
        <>
            <div className="container my-4 p-5 rounded shadow bg-body-tertiary">
                <h1 className="text-center mb-3">Results Page</h1>
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
        </>
    );
}
