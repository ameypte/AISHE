import React from "react";

export default function howThisWork() {
  return (
    <div
      className="alert alert-info border border-info  bg-info-subtle"
      role="alert"
    >
      <h3 className="alert-heading">How this works?</h3>
      <p className="fs-5">
        First you need to download the template file. Then fill the file with
        information. After that you need to upload the file.
      </p>
      <hr />
      <p className="mb-0 fw-medium">
        Note: The file must be in .xlsx format and the columns must be in the
        same order as the template file And Do not change file and columns.
      </p>
    </div>
  );
}
