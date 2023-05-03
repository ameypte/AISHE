import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "../components/config/firebaseConfig";
import isLoggedIn from "../components/isLoggedIn";
import jsPDF from "jspdf";

export default function Departments() {
    const [departments, setDepartments] = useState([{ name: "" }]);
    const isUserLoggedIn = isLoggedIn();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    firebase.initializeApp(firebaseConfig);

    useEffect(() => {
        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, [isUserLoggedIn]);

    useEffect(() => {
        setIsLoading(true);
        const dbRef = firebase.database().ref("departments");
        dbRef.on("value", (snapshot) => {
            const departments = snapshot.val();
            if (departments) {
                setDepartments(departments);
            }
            setIsLoading(false);
        });
    }, []);

    const handleAddDepartment = () => {
        setDepartments([...departments, { name: "" }]);
    };

    const handleRemoveDepartment = (index) => {
        if (
            window.confirm(
                `Are you sure you want to remove department ${index + 1}?`
            )
        ) {
            const newDepartments = [...departments];
            newDepartments.splice(index, 1);
            setDepartments(newDepartments);
        }
    };

    const handleDepartmentNameChange = (event, index) => {
        const newDepartments = [...departments];
        newDepartments[index].name = event.target.value;
        setDepartments(newDepartments);
    };

    const handelUpdateDepartments = () => {
        const dbRef = firebase.database().ref("departments");
        dbRef.set(departments);
        setMessage("Departments updated successfully");
    };

    const handlePrint = () => {
        // make pdf of departments table
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Sr. No.", "Department Name"]],
            body: departments.map((department, index) => [
                index + 1,
                department.name,
            ]),
        });
        doc.save("departments.pdf");
    };

    return (
        <div className="container my-4 px-5 py-4 rounded shadow bg-body-tertiary">
            <h2 className="text-center mb-4 col">Departments Page</h2>
            {message && (
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            )}
            {isLoading ? (
                <div className="text-center">
                    <div
                        class="spinner-border text-primary xmb-3"
                        role="status"
                    >
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : null}
            <table className="table table-bordered text-center table-hover">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>Sr. No.</th>
                        <th>Department Name</th>
                        <th style={{ width: "10%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department, index) => (
                        <tr key={index}>
                            <td style={{ width: "10%" }}>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={department.name}
                                    onChange={(event) =>
                                        handleDepartmentNameChange(event, index)
                                    }
                                />
                            </td>
                            <td style={{ width: "10%" }}>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleRemoveDepartment(index)
                                    }
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-center">
                            <button
                                type="button"
                                className="btn btn-success me-3"
                                onClick={() => handelUpdateDepartments()}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddDepartment}
                            >
                                Add Row
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="text-end">
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>
        </div>
    );
}
