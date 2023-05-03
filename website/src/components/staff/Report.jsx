import React, { useState } from "react";

export default function Report() {
  const [message, setMessage] = useState(null);
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [designation, setDesignation] = useState(
    [
      "Head of the Departments",
      "Lecturers",
      "Lab Assitants"
    ]
  );

  return (
    <>
      <h3 className="mb-3">Report Generation</h3>
      {message && (
        <div
          className={`alert ${message.includes("successfully")
            ? "alert-success"
            : "alert-danger"
            }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <form className="row">
        <div className="form-group mb-3 col-lg-4">
          <label htmlFor="progChar" className="form-label">
            Select Designation
          </label>
          <select
            name="designation"
            id="designation"
            className="form-select"
            onChange={(e) => setDesignation(e.target.value)}
          >

            {designation.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}

          </select>
        </div>
        <div className="mb-3 col-4">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div className="form-control">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={(e) => setGender(e.target.value)}

              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"

                onChange={(e) => setGender(e.target.value)}

                value="female"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="others"

                onChange={(e) => setGender(e.target.value)}

                value="others"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Others
              </label>
            </div>
          </div>
        </div>

        <div className="form-group mb-3 col-lg-4 d-flex align-items-end">
          {isLoading ? (
            <button className="btn btn-danger" disabled>
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
              Generating...
            </button>
          ) : (
            <button
              className="btn btn-danger"
              // onClickCapture={handelGenerate}
            >
              Generate
            </button>
          )}
        </div>
            <hr/>
      </form>
    </>
  )
}
