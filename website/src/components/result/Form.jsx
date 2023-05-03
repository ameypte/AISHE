import React, { useState } from "react";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default function Form() {
    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [program, setProgram] = useState("");
    const [stdId, setStdId] = useState("");
    const [total, setTotal] = useState("");
    const [obtained, setObtained] = useState("");
    const [result, setResult] = useState("");
    const [percantage, setPercantage] = useState("");
    const [message, setMessage] = useState("");

    const handelSubmit = (e) => {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database().ref("Result information");

        e.preventDefault();
        const data = {
            Name: name,
            reg_no: roll,
            program_char_code: program,
            student_id: stdId,
            total_outof: total,
            total_obtained: obtained,
            result: result,
        };

        // Get the count of existing child nodes
        db.once("value", (snapshot) => {
            const count = snapshot.numChildren();

            // Set the new data with a numeric key
            db.child(count)
                .set(data)
                .then((res) => {
                    setName("");
                    setRoll("");
                    setProgram("");
                    setStdId("");
                    setTotal("");
                    setObtained("");
                    setResult("");
                    setMessage("Data has been submitted");
                })
                .catch((err) => {
                    setMessage(err.message);
                });
        });
    };

    return (
        <div>
            <h2 className="mb-3">Fill the Form</h2>
            <form className="row" onSubmit={handelSubmit}>
                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}
                <div className="form-group mb-3 col-6">
                    <label htmlFor="name" className="form-label">
                        Name of the Student
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter student name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="roll" className="form-label">
                        Roll Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="roll"
                        name="roll"
                        placeholder="Enter student roll number"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="program" className="form-label">
                        Program Character Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="program"
                        name="program"
                        placeholder="Enter program character code"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="stdId" className="form-label">
                        Student ID
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="stdId"
                        name="stdId"
                        placeholder="Enter student ID"
                        value={stdId}
                        onChange={(e) => setStdId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="total" className="form-label">
                        Total Marks
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="total"
                        name="total"
                        placeholder="Enter total marks"
                        value={total}
                        onChange={(e) => {
                            setTotal(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="obtained" className="form-label">
                        Obtained Marks
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="obtained"
                        name="obtained"
                        placeholder="Enter obtained marks"
                        value={obtained}
                        onChange={(e) => {
                            setObtained(e.target.value);
                            setPercantage(
                                ((e.target.value / total) * 100).toFixed(2)
                            );
                            setResult(
                                ((e.target.value / total) * 100).toFixed(2) >=
                                    50
                                    ? "Pass"
                                    : "Fail"
                            );
                        }}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="result" className="form-label">
                        Result
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="result"
                        name="result"
                        value={result}
                        readOnly
                        disabled
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="percantage" className="form-label">
                        Percentage
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="percantage"
                        name="percantage"
                        value={percantage}
                        readOnly
                        disabled
                        required
                    />
                </div>
                <div className="form-group m-3 text-center">
                    <button type="submit" className="btn btn-primary px-4">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
