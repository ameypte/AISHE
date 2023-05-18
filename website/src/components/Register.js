import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import firebaseConfig from "./config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import logo from "../assets/logo.png";
import background from "../assets/background.png";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function Register() {
    const formRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("Select Role")
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const handleReset = () => {
        setSelectedRole("Select Role");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const nameRegex = /^[a-zA-Z ]*$/;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else if (selectedRole === "Select Role") {
            alert("Please select a role");
            return;
        } else if (!nameRegex.test(name)) {
            alert("Please enter a valid name");
            return;
        } else {
            let isAlreadyRegistered = false;
            // check if phone number is already registered in all roles
            firebase
                .database()
                .ref("Users")
                .once("value", (snapshot) => {
                    const data = snapshot.val();
                    let isAlreadyRegistered = false;
                    for (let key in data) {
                        if (data[key].phone === phone) {
                            isAlreadyRegistered = true;
                            alert("Phone number already registered");
                            break;
                        }
                    }
                    if (!isAlreadyRegistered) {
                        firebase.database().ref("Users").child(phone).set({
                            name: name,
                            email: email,
                            password: password,
                            gender: gender,
                            role: selectedRole,
                        });
                        alert("Registration successful");
                        formRef.current.reset();
                        handleReset();
                    }
                });
        }
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div className="container shadow rounded-5 my-5 p-4 bg-opacity-75 w-50 bg-body-tertiary">
                <form onSubmit={handleRegister} ref={formRef}>
                    <div className="text-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="img-fluid"
                            style={{ height: "80px", marginTop: "18px" }}
                        />
                    </div>
                    <h3 className="text-center m-3 text-danger">
                        REGISTRATION
                    </h3>
                    <div className="row">
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="name">
                                Name<span className="text-danger"> *</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="email">
                                Email address{" "}
                                <span className="text-danger"> *</span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="role">
                                Role<span className="text-danger"> *</span>
                            </label>
                            <div className="dropdown" id="role">
                                <button
                                    className="btn border btn-light dropdown-toggle w-100 text-start"
                                    type="button"
                                    id="role-dropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {selectedRole}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="role-dropdown"
                                >
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={() =>
                                                setSelectedRole(
                                                    "Student Section"
                                                )
                                            }
                                        >
                                            Student Section
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={() =>
                                                setSelectedRole(
                                                    "Account Section"
                                                )
                                            }
                                        >
                                            Account Section
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={() =>
                                                setSelectedRole(
                                                    "Establishment Section"
                                                )
                                            }
                                        >
                                            Establishment Section
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={() =>
                                                setSelectedRole("COE")
                                            }
                                        >
                                            COE
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={() =>
                                                setSelectedRole("Principle")
                                            }
                                        >
                                            Principal
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="password">
                                Password<span className="text-danger"> *</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="confirm-password">
                                Confirm Password
                                <span className="text-danger"> *</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm-password"
                                required
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="phone">
                                Phone Number
                                <span className="text-danger"> *</span>
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        {/* gender */}
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="gender">Gender</label>
                            <div className="form-control">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="Male"
                                        value="Male"
                                        required
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="Male"
                                    >
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="Female"
                                        required
                                        value="Female"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="Female"
                                    >
                                        Female
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="Other"
                                        required
                                        value="Other"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="Other"
                                    >
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-lg-6 col-md-12 text-lg-end text-md-center p-0">
                                <button
                                    type="reset"
                                    className="btn btn-secondary w-50 m-3"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="mb-3 col-lg-6 col-md-12 text-lg-start text-md-center p-0">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-50 m-3 "
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <p>
                                Already have an account?{" "}
                                <Link to="/">Login here</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
