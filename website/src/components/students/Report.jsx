import React, { useState } from "react";

export default function Report() {
  const [message, setMessage] = useState(null);
  const [gender, setGender] = useState([
    "Male",
    "Female",
    "Other"
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(
    [
      "OBC",
      "OPEN",
      "SC"
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
            Select Category
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            onChange={(e) => setCategory(e.target.value)}
          >

            {category.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}

          </select>

        </div>

        <div className="form-group mb-3 col-lg-4">
          <label htmlFor="progChar" className="form-label">
            Select Gender (Optional)
          </label>
          <select
            name="gender"
            id="gender"
            className="form-select"
            onChange={(e) => setGender(e.target.value)}
          >

            {gender.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}

          </select>

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
        <hr />
      </form>
    </>
  )
}
