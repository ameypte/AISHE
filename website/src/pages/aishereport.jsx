import React, { useEffect, useState } from "react";
import BasicInfo from "../components/basic/Form";
import Departments from "./Departments";
import Financials from "./Financials";
import Table from "../components/Table";

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
                <Table data={staffData} />
            </div>
            <hr />
            <div className="text-center">
                <h2 className="mb-3">Student Information</h2>
                <Table data={studentData} />
            </div>
            <hr />
            <div className="text-center">
                <h2 className="mb-3">Result Information</h2>
                <Table data={resultData} />
            </div>
        </div>
    );
}
