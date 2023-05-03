import React, { useEffect, useState } from "react";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function Report() {
    const [message, setMessage] = useState(null);
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const [designation, setDesignation] = useState([""]);
    const [selectedDesignation, setSelectedDesignation] = useState("");

    useEffect(() => {
        const dbRef = firebase.database().ref("Staff information");
        dbRef.on("value", (snapshot) => {
            const data = snapshot.val();
            const designation = [];
            for (let i in data) {
                designation.push(data[i].Designation);
            }
            setDesignation([...new Set(designation)]);
        });
    }, []);
        

    const handleExcelDownload = () => {
      const workbook = XLSX.utils.book_new();
      const sheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, sheet, "Report");
      XLSX.writeFile(workbook, "staff_report.xlsx");
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

      doc.save("staff_report.pdf");
  };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const requestDate = {
            designation: selectedDesignation,
            gender: gender,
        };
        try {
            const response = await fetch("http://localhost:5000/staffreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestDate),
            });
            const responseData = await response.json();
            if (responseData.message) {
                setMessage(responseData.message);
                return;
            }
            console.log(responseData);
            setData(responseData);
            setMessage("Report generated successfully");
        } catch (error) {
            setMessage("Error: " + error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
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
            <form className="row" onSubmit={handleGenerate}>
                <div className="form-group mb-3 col-lg-4">
                    <label htmlFor="progChar" className="form-label">
                        Select Designation
                    </label>
                    <select
                        name="designation"
                        id="designation"
                        className="form-select"
                        onChange={(e) => setSelectedDesignation(e.target.value)}
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
                                value="Male"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="male">
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
                                value="Female"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="female"
                            >
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
                            <label
                                className="form-check-label"
                                htmlFor="others"
                            >
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
                        <button className="btn btn-danger">Generate</button>
                    )}
                </div>
            </form>
            <hr />
            {data.length > 0 && (
                <h3 className="mb-3">
                    <div className="row">
                        <div className="col">Generated Report</div>
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
                </h3>
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
            </div>
        </>
    );
}
