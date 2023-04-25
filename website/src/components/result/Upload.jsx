import React, { useEffect, useState } from "react";
import HowThisWork from "../HowThisWork";
import isLoggedIn from "../isLoggedIn";

export default function Upload() {
    const isUserLoggedIn = isLoggedIn();
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    useEffect(() => {
        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, []);

    const handelFileDownload = () => {
        alert("Download file");
    };

    const handelFileUpload = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const file = e.target.upload.files[0];
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await fetch("http://127.0.0.1:5000/resultupload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log(data.message);
            setResponseMessage(data.message);
        } catch (error) {
            setResponseMessage(error)
        } finally {
            setIsLoading(false);
        }
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
