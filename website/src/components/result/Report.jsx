import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Report() {
    const [data, setData] = useState([]);
    const tableRef = useRef(null);
    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const [message, setMessage] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [selectedPercent, setSelectedPercent] = useState("All");

    const [progCharCodes, setProgCharCodes] = useState([
        "All",
        "IF",
        "CM",
        "CE",
        "ME",
        "PP",
        "CH",
        "EC",
        "EE",
    ]);
    const [percent, setPercent] = useState(["All", "Above 60%", "Below 60%"]);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState("All");
    const [student, setStudent] = useState("");

    const handelGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const requestDate = {
            program_char_code: selectedProgram,
            studentId: student,
            percent: selectedPercent,
        };
        try {
            const response = await fetch("http://localhost:5000/resultreport", {
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
        XLSX.writeFile(workbook, "report.xlsx");
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

        doc.save("report.pdf");
    };

    return (
        <>
            <div>
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
                            Program Char Code
                        </label>
                        <select
                            name="progChar"
                            id="programCharCode"
                            className="form-select"
                            onChange={(e) => setSelectedProgram(e.target.value)}
                        >
                            {progCharCodes.map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3 col-lg-4">
                        <label htmlFor="percent" className="form-label">
                            Percent
                        </label>
                        <select
                            name="percent"
                            id="percent"
                            className="form-select"
                            onChange={(e) => setSelectedPercent(e.target.value)}
                        >
                            {percent.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3 col-lg-4">
                        <label htmlFor="student" className="form-label">
                            Student Id Code
                        </label>
                        <input
                            type="text"
                            name="student"
                            id="student"
                            className="form-control"
                            onChange={(e) => setStudent(e.target.value)}
                            placeholder="(Optional)"
                        />
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
                                className="btn btn-danger "
                                onClickCapture={handelGenerate}
                            >
                                Generate
                            </button>
                        )}
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
                            <table
                                className="table table-bordered table-striped rounded"
                                ref={tableRef}
                            >
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
            </div>
        </>
    );
}
