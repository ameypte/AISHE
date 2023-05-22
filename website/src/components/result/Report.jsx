import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Report() {
    const [data, setData] = useState([]);
    const [slatData, setSlatData] = useState([]);
    const tableRef = useRef(null);
    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const [message, setMessage] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [selectedPercent, setSelectedPercent] = useState("All");
    const [selectedCsategory, setSelectedCategory] = useState("All");
    const [category, setCategory] = useState([
        "All",
        "Open",
        "OBC",
        "SC",
        "ST",
    ]);

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
    const [percent, setPercent] = useState([
        "All",
        "Above 60%",
        "Below 60%",
        "Above 75%",
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState("All");
    const [student, setStudent] = useState("");

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const requestDate = {
            program_char_code: selectedProgram,
            studentId: student,
            percent: selectedPercent,
            category: selectedCsategory,
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

    const handleSlat = async () => {
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
            setSlatData(responseData);
            setMessage("Slate generated successfully");
        } catch (error) {
            setMessage("Error: " + error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSlatExcelDownload = () => {
        const workbook = XLSX.utils.book_new();
        const sheetData = slatData.map(item => {
          return {
            Program: item.program,
            "General M": item.genM,
            "General F": item.genF,
            "General O": item.genO,
            "EWS M": item.ewsM,
            "EWS F": item.ewsF,
            "EWS O": item.ewsO,
            "SC M": item.scM,
            "SC F": item.scF,
            "SC O": item.scO,
            "ST M": item.stM,
            "ST F": item.stF,
            "ST O": item.stO,
            "OBC M": item.obcM,
            "OBC F": item.obcF,
            "OBC O": item.obcO,
            "Total M": item.totalM,
            "Total F": item.totalF,
            "Total O": item.totalO
          };
        });
        const sheet = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, sheet, "Slat");
        XLSX.writeFile(workbook, "slat.xlsx");
      };
      

      const handleSlatPDFDownload = () => {
        const doc = new jsPDF();
        const columns = [
          "Program",
          "General M",
          "General F",
          "General O",
          "EWS M",
          "EWS F",
          "EWS O",
          "SC M",
          "SC F",
          "SC O",
          "ST M",
          "ST F",
          "ST O",
          "OBC M",
          "OBC F",
          "OBC O",
          "Total M",
          "Total F",
          "Total O"
        ];

        const rows = slatData.map(item => [
          item.program,
          item.genM,
          item.genF,
          item.genO,
          item.ewsM,
          item.ewsF,
          item.ewsO,
          item.scM,
          item.scF,
          item.scO,
          item.stM,
          item.stF,
          item.stO,
          item.obcM,
          item.obcF,
          item.obcO,
          item.totalM,
          item.totalF,
          item.totalO
        ]);
      
        doc.autoTable({
          head: [columns],
          body: rows,
          theme: "striped"
        });
      
        doc.save("stat.pdf");
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
                            value={selectedPercent}
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
                        <label htmlFor="category" className="form-label">
                            Select Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={selectedCsategory}
                            className="form-select"
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            {category.map((c) => (
                                <option key={c} value={c}>
                                    {c}
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
                            onClick={handleGenerate}
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
                        <>
                            <div
                                className="table-responsive mb-4"
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
                                                    <td key={col}>
                                                        {item[col]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                        </>
                    )}
                    {slatData.length > 0 && (
                        <>
                            <div className="mb-3">
                                <div className="row">
                                    <h3 className="col">Generated Slat</h3>
                                    <div className="col text-end">
                                        <button
                                            className="btn mx-3 btn-success"
                                            onClick={handleSlatExcelDownload}
                                        >
                                            Download Excel
                                        </button>
                                        <button
                                            className="btn  btn-success"
                                            onClick={handleSlatPDFDownload}
                                        >
                                            Download PDF
                                        </button>
                                    </div>
                                </div>
                                <h5>Total records: {slatData.length}</h5>
                            </div>
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
                                        {slatData.map((item) => (
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
