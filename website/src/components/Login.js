import React, { useState } from "react";
import firebaseConfig from "./config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import background from "../assets/background.png";

firebase.initializeApp(firebaseConfig);

export default function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isFound, setIsFound] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsFound(false);
        
        firebase
            .database()
            .ref("Users")
            .once("value", (snapshot) => {
                const data = snapshot.val();
                for (let key in data) {
                    setIsFound(true);
                    if(key == phone){
                        if(data[key].password == password){
                            setIsLoading(false);
                            localStorage.setItem("user", phone);
                            localStorage.setItem("name", data[key].name);
                            localStorage.setItem("role", data[key].role);
                            navigate("/dashboard");
                        }
                    }
                }
                if (!isFound) {
                    setMessage("User not found");
                    setIsLoading(false);
                }else{
                    setMessage("Incorrect Password");
                    setIsLoading(false);
                }
            });
    };

    return (
        // background image
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
            <div
                className="container shadow rounded-5 px-5 py-3 bg-body-tertiary bg-opacity-50"
                style={{ width: "37%" }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="img-fluid"
                            style={{ height: "90px", marginTop: "18px" }}
                        />
                    </div>
                    <h3 className="text-center text-danger mt-4">
                        DATABASE LOGIN
                    </h3>
                    {message && (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                style={{ display: "none" }}
                            >
                                <symbol
                                    id="exclamation-triangle-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </symbol>
                            </svg>

                            <div
                                className="alert alert-danger d-flex align-items-center"
                                role="alert"
                            >
                                <svg
                                    className="bi flex-shrink-0 me-2"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div>{message}</div>
                            </div>
                        </>
                    )}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-center">
                        {isLoading ? (
                            <div
                                className="spinner-border  mt-4 mb-2 text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary w-25 m-3"
                            >
                                Login
                            </button>
                        )}
                    </div>
                    <div className="text-center mt-3">
                        <p>
                            Not registered yet?{" "}
                            <Link to="/register">Register here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
