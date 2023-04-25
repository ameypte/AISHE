import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Report() {
    const [data, setData] = useState([
        { id: 1, name: "John", department: "IT", subject1: 80, subject2: 90 },
        { id: 2, name: "Jane", department: "HR", subject1: 70, subject2: 85 },
        { id: 3, name: "Bob", department: "IT", subject1: 90, subject2: 95 },
    ]);

    const [progCharCodes, setProgCharCodes] = useState([
        "IF",
        "CM",
        "CE",
        "ME",
        "PP",
        "CH",
        "EC",
        "EE",
    ]);
    const [cols, setCols] = useState([
        "id",
        "result_master_id",
        "program_id",
        "program_num_code",
        "program_char_code",
        "program_name",
        "student_id",
        "reg_no",
        "student_name",
        "subject_id",
        "subject_code",
        "subject_name",
        "term",
        "term_name",
        "th_term",
        "th_max",
        "th_min",
        "th_marks_original",
        "th_marks",
        "th_result",
        "th_exam_status",
        "th_grace_marks",
        "th_grace_status",
        "th_previous_pass",
        "pt_term",
        "pt_max",
        "pt_min",
        "pt_marks",
        "pt_result",
        "pt_exam_status",
        "pt_previous_pass",
        "th_pt_max",
        "th_pt_min",
        "th_pt_marks_original",
        "th_pt_marks",
        "th_pt_result",
        "th_pt_grace_marks",
        "th_pt_grace_status",
        "th_pt_previous_pass",
        "pr_term",
        "pr_max",
        "pr_min",
        "pr_marks",
        "pr_result",
        "pr_exam_status",
        "pr_previous_pass",
        "tw_term",
        "tw_max",
        "tw_min",
        "tw_marks",
        "tw_result",
        "tw_exam_status",
        "tw_previous_pass",
        "or_term",
        "or_max",
        "or_min",
        "or_marks",
        "or_result",
        "or_exam_status",
        "or_previous_pass",
        "cne_course",
        "cne_term",
        "cne_grade",
        "total_outof",
        "total_obtained",
        "result",
        "credit",
        "change_status",
        "result_type",
        "created_by",
        "thg",
        "thptg",
        "prg",
        "org",
    ]);
    const [checkedState, setCheckedState] = useState(
        new Array(cols.length).fill(false)
    );
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState("IF");
    const [student, setStudent] = useState("");

    const columns = Array.from(
        new Set(data.flatMap((item) => Object.keys(item)))
    );

    const handelGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const requestDate = {
            program_char_code: selectedProgram,
            studentId: student,
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
            console.log(responseData);
            setData(responseData);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    const handleDownload = () => {
        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a new workbook and add the worksheet to it
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        // Save the workbook as an excel file
        XLSX.writeFile(workbook, "report.xlsx");
    };

    return (
        <>
            <h3 className="mb-3">Report Generation</h3>
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
                    <label htmlFor="student" className="form-label">
                        Student Id Code
                    </label>
                    <input
                        type="text"
                        name="student"
                        id="student"
                        className="form-control"
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
                            className="btn btn-danger"
                            onClickCapture={handelGenerate}
                        >
                            Generate
                        </button>
                    )}
                </div>

                <div className="col-12">
                    <h5>Select Columns</h5>
                    <div class="form-check mb-3">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="all"
                            checked={checkedState.every((item) => item)}
                            onChange={() =>
                                setCheckedState(
                                    new Array(cols.length).fill(
                                        !checkedState.every((item) => item)
                                    )
                                )
                            }
                        />

                        <label class="form-check-label" for="all">
                            Select all
                        </label>
                    </div>
                    <div className="row container">
                        {cols.map((col) => (
                            <div class="form-check col-2">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={col}
                                    checked={checkedState[cols.indexOf(col)]}
                                    onChange={() =>
                                        handleCheckboxChange(cols.indexOf(col))
                                    }
                                />

                                <label class="form-check-label" for={col}>
                                    {col}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
            <hr />
            <h3 className="mb-3">
                <div className="row">
                    <div className="col">Generated Report</div>
                    <div className="col text-end">
                        <button
                            className="btn mx-3 btn-success"
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </h3>
            <div
                className="container"
            >
                <div className="table-responsive"  style={{ maxHeight: "500px", overflowX: "auto" }}>
                    <table
                        className="table table-bordered table-striped rounded"
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
            </div>
        </>
    );
}
