import React, { useState } from "react";

export default function Form() {
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [designation, setDesignation] = useState("");
    const [number, setNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [pan, setPan] = useState("");
    const [message, setMessage] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        const data = {
            first_name: fname,
            middle_name: mname,
            last_name: lname,
            email: email,
        };
        alert(JSON.stringify(data));
        setMessage("Data has been submitted");
    };

    return (
        <div>
            <h2>Fill The Form</h2>
            <form className="row" onSubmit={handelSubmit}>
                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}
                <div className="form-group mb-3 col-6">
                    <label htmlFor="fname" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        name="fname"
                        placeholder="Enter staff first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3 col-6">
                    <label htmlFor="pan" className="form-label">
                        Pan Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="pan"
                        name="pan"
                        placeholder="Enter Staff Pan Number"
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter staff email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 col-lg-6 col-md-12">
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
                                required
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
                                checked
                                onChange={(e) => setGender(e.target.value)}
                                required
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
                                checked
                                onChange={(e) => setGender(e.target.value)}
                                required
                                value="others"
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                                Others
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="date" className="form-label">
                        Date of birth
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group mb-3 col-6">
                    <label htmlFor="number" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        placeholder="Enter staff Mobile Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="designation" className="form-label">
                    Designation
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="designation"
                        name="designation"
                        placeholder="Enter staff Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                </div>
               
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick=""
                    >
                        <i className="bi bi-cloud-upload"></i>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
