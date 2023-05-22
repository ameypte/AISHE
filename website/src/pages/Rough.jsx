import React, { useState, useEffect } from "react";
import firebaseConfig from "../components/config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default function MyComponent() {
  const [sampleCheckbox1, setSampleCheckbox1] = useState(false);
  const [sampleCheckbox2, setSampleCheckbox2] = useState(false);

  useEffect(() => {
    db.ref("sample").set({
      sampleCheckbox1,
      sampleCheckbox2,
    });
  }, [sampleCheckbox1, sampleCheckbox2]);

  const handleSampleCheckbox1 = () => {
    setSampleCheckbox1((prevState) => !prevState);
  };

  const handleSampleCheckbox2 = () => {
    setSampleCheckbox2((prevState) => !prevState);
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Sample Checkbox 1</td>
            <td onClick={handleSampleCheckbox1}>
              <input
                className="form-check-input"
                type="checkbox"
                value={sampleCheckbox1}
                aria-label="..."
                checked={sampleCheckbox1}
              />
            </td>
          </tr>
          <tr>
            <td>Sample Checkbox 2</td>
            <td onClick={handleSampleCheckbox2}>
              <input
                className="form-check-input"
                type="checkbox"
                value={sampleCheckbox2}
                aria-label="..."
                checked={sampleCheckbox2}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-outline-success px-4"
        onClick={() => db.ref("sample").set({ sampleCheckbox1, sampleCheckbox2 })}
      >
        Save
      </button>
    </>
  );
}
