import React, { useEffect, useState } from "react";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function Report() {
    const [message, setMessage] = useState(null);
    const [gender, setGender] = useState(["All", "Male", "Female", "Other"]);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [data, setData] = useState([]);
    const [statsData, setStatsData] = useState([]);
    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        const dbRef = firebase.database().ref("Student information");
        dbRef.on("value", (snapshot) => {
            const data = snapshot.val();
            const category = [];
            for (let i in data) {
                category.push(data[i].Category);
            }
            category.push("All");
            setCategory([...new Set(category)]);
            setSelectedCategory("All");
        });
    }, []);

    const handelGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const requestData = {
            category: selectedCategory,
            gender: selectedGender,
        };

        try {
            const response = await fetch(
                "http://localhost:5000/studentreport",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );
            const responseData = await response.json();
            if (responseData.message) {
                setMessage(responseData.message);
                return;
            }
            console.log(responseData);
            setData(responseData);
            setRowCount(responseData.length);
            setMessage("Report generated successfully");
        } catch (error) {
            setMessage("Error: " + error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSlat = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/resultslat", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (responseData.message) {
                setMessage(responseData.message);
                return;
            }
            console.log(responseData);
            setStatsData(responseData);
            setRowCount(responseData.length);
            setMessage("Report generated successfully");
        } catch (error) {
            setMessage("Error: " + error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExcelDownload = () => {
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, sheet, "Report");
        XLSX.writeFile(workbook, "student_report.xlsx");
    };

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        const columns = data.length > 0 ? Object.keys(data[0]) : [];
        const rows = data.map((item) => Object.values(item));

        doc.autoTable({
            head: [columns],
            body: rows,
            theme: "striped",
        });

        doc.save("student_report.pdf");
    };
    return (
        <>
            <h3 className="mb-3">Report Generation</h3>
            {message && (
                <div
                    className={`alert ${
                        message.includes("successfully")
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
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
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
                        onChange={(e) => setSelectedGender(e.target.value)}
                    >
                        {gender.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3 col-lg-4 d-flex align-items-end">
                    <button
                        type="button"
                        className="btn btn-success me-3 px-4"
                        disabled={isLoading}
                        onClick={handleSlat}
                    >
                        {isLoading && (
                            <span
                                className="spinner-border spinner-border-sm me-1"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        Stats
                    </button>
                    <button
                        className="btn btn-danger"
                        type="button"
                        disabled={isLoading}
                        onClick={handelGenerate}
                    >
                        {isLoading && (
                            <span
                                className="spinner-border spinner-border-sm me-1"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        All Lists
                    </button>
                </div>
            </form>
            <hr />
            {data.length > 0 && (
                <div className="mb-3">
                    <div className="row">
                        <h3 className="col">Generated Report</h3>
                        <div className="col text-end">
                            <button
                                className="btn mx-3 btn-success"
                                onClick={handleExcelDownload}
                            >
                                Download Excel
                            </button>
                            <button
                                className="btn  btn-success"
                                onClick={handlePDFDownload}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                    <h5>Total records: {rowCount}</h5>
                </div>
            )}
            <div className="container">
                {data.length > 0 && (
                    <div
                        className="table-responsive"
                        style={{ maxHeight: "500px", overflow: "auto" }}
                    >
                        <table className="table table-bordered table-striped rounded">
                            <thead>
                                <tr className="text-center">
                                    {columns.map((col) => (
                                        <th key={col}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        {columns.map((col) => (
                                            <td key={col}>{item[col]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {
                    <div
                        className="table-responsive"
                        style={{ maxHeight: "500px", overflow: "auto" }}
                    >
                        <table className="table table-bordered table-striped rounded">
                            <thead>
                                <tr className="text-center">
                                    <td rowSpan={2}>Program</td>
                                    <td colSpan={3}>General</td>
                                    <td colSpan={3}>EWS</td>
                                    <td colSpan={3}>SC</td>
                                    <td colSpan={3}>ST</td>
                                    <td colSpan={3}>OBC</td>
                                    <td colSpan={3}>Total</td>
                                </tr>
                                <tr className="text-center">
                                    <td>M</td>
                                    <td>F</td>
                                    <td>O</td>
                                    <td>M</td>
                                    <td>F</td>
                                    <td>O</td>
                                    <td>M</td>
                                    <td>F</td>
                                    <td>O</td>
                                    <td>M</td>
                                    <td>F</td>
                                    <td>O</td>
                                    <td>M</td>
                                    <td>F</td>
                                    <td>O</td>
                                    <td>M</td>
                                    <td>F</td>
                                    <td>O</td>
                                </tr>
                            </thead>
                            <tbody>
                                {statsData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.program}</td>
                                        <td>{item.genM}</td>
                                        <td>{item.genF}</td>
                                        <td>{item.genO}</td>
                                        <td>{item.ewsM}</td>
                                        <td>{item.ewsF}</td>
                                        <td>{item.ewsO}</td>
                                        <td>{item.scM}</td>
                                        <td>{item.scF}</td>
                                        <td>{item.scO}</td>
                                        <td>{item.stM}</td>
                                        <td>{item.stF}</td>
                                        <td>{item.stO}</td>
                                        <td>{item.obcM}</td>
                                        <td>{item.obcF}</td>
                                        <td>{item.obcO}</td>
                                        <td>{item.totalM}</td>
                                        <td>{item.totalF}</td>
                                        <td>{item.totalO}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    );
}
