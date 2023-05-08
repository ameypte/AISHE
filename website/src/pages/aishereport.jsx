import React, { useEffect, useState } from "react";
import BasicInfo from "../components/basic/Form";
import Departments from "./Departments";
import Financials from "./Financials";
import Table from "../components/Table";
import Infrastructure from "./Infrastructure";
import Frontpage from "./Frontpage";

export default function Aishereport() {
    const [staffData, setStaffData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [resultData, setResultData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/staff")
            .then((res) => res.json())
            .then((data) => {
                setStaffData(data);
            });

        fetch("http://localhost:5000/students")
            .then((res) => res.json())
            .then((data) => {
                setStudentData(data);
            });

        fetch("http://localhost:5000/result")
            .then((res) => res.json())
            .then((data) => {
                setResultData(data);
            });
    }, []);

    return (
        <div className="p-3">
            <Frontpage />

            <BasicInfo aisheReport={true} />
            <hr />
            <div className="text-center">
                <h2>Financial Information</h2>
                <Financials aisheReport={true} />
            </div>
            <hr />
            <Departments aisheReport={true} />
            <hr />
            <div className="text-center">
                <h2 className="mb-3">Staff Information</h2>
            </div>
            <Table data={staffData} />

            <hr />
            <div className="text-center">
                <h2 className="mb-3">Student Information</h2>
            </div>
            <Table data={studentData} />

            <hr />
            <div className="text-center">
                <h2 className="mb-3">Result Information</h2>
            </div>
            <Table data={resultData} />

            <hr />
            <div className="text-center">
                {/* <h2 className="mb-3">Infrastructure Information</h2> */}
                <Infrastructure aisheReport={true} />
            </div>
        </div>
    );
}
