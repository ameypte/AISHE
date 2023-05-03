import React, { useEffect, useState } from "react";
import HowThisWork from "../HowThisWork";

export default function Upload() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handelFileDownload = () => {

  }

  const handelFileUpload = () => {

  }
  return (
    <div>
      <>
        <HowThisWork />
        <hr />
        <h3 className="mb-3">Upload From File</h3>
        {responseMessage && (
          <div
            className={`alert ${responseMessage.includes("successfully")
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
  )
}
