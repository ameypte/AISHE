import React, { useState, useEffect } from "react";
import isLoggedIn from "../components/isLoggedIn";
import HowThisWork from "../components/HowThisWork";
import * as XLSX from "xlsx";
import firebaseConfig from "../components/config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default function Students() {
    useEffect(() => {
        firebase.initializeApp(firebaseConfig);

        const isUserLoggedIn = isLoggedIn();

        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
    }, []);

    const [isUpLoadFromFile, setIsUpLoadFromFile] = useState(false);
    const [studentData, setStudentData] = useState({});

    const handelFileDownload = () => {
        alert("File downloaded");
    };

    const handelFileUpload = (event) => {
        const file = document.getElementById("upload").files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const departments = {};

            // list of departments
            let row = 5;
            while (worksheet["A" + row]) {
                const departmentName = worksheet["A" + row].v;
                const category = {};
                for (let col of ["C", "G", "K", "O", "S", "W"]) {
                    const categoryName = worksheet[col + (row - 2)]?.v;
                    const subCategory = {};
                    let count = 0;
                    let cols = ["C", "D", "E", "F"];
                    for (let i of [
                        (String.fromCharCode(cols[0].charCodeAt(0) + count)),
                        (String.fromCharCode(cols[1].charCodeAt(0) + count)),
                        (String.fromCharCode(cols[2].charCodeAt(0) + count)),
                        (String.fromCharCode(cols[3].charCodeAt(0) + count)),
                    ]) {
                        // console.log(i+(row-2+1));
                        count += 4;
                        const subCategoryName = worksheet[
                            i + (row - 2 + 1)
                        ]?.v.replace(/[,#\$\/\[\]]/g, "");
                        const childCategory = {};

                        for (let child of [row, row + 1, row + 2, row + 3]) {
                            const childCategoryName = worksheet["B" + child].v;
                            console.log(i + child);
                            const val = worksheet[i + child]?.v;
                            // if val is undefined then set it to 0
                            if (val === undefined) {
                                childCategory[childCategoryName] = "0";
                            } else {
                                childCategory[childCategoryName] = val;
                            }
                        }
                        subCategory[subCategoryName] = childCategory;
                    }
                    category[categoryName] = subCategory;
                }
                departments[departmentName] = category;
                row += 7;
            }

            const database = firebase.database();
            const ref = database.ref("Student Information");
            ref.set({ Departments: departments });
            setStudentData({ Departments: departments });
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container mx-auto my-4 p-5 rounded shadow bg-body-tertiary row">
            <h1 className="text-center mb-3">Student Information</h1>
            <div>
                <button
                    type="button"
                    className="mb-3 btn btn-outline-primary"
                    onClick={() => setIsUpLoadFromFile(!isUpLoadFromFile)}
                >
                    {!isUpLoadFromFile ? "Upload file" : "Fill from"}
                </button>
            </div>
            {!isUpLoadFromFile ? (
                <h1>Fill the form</h1>
            ) : (
                <>
                    <HowThisWork />
                    <hr />
                    <h3 className="mb-3">Upload From File</h3>
                    <div className="row">
                        <div className="col-6">
                            <label
                                htmlFor="download"
                                className="form-label d-block"
                            >
                                Downlaod the following template file
                            </label>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handelFileDownload}
                            >
                                <i className="bi bi-cloud-download"></i>
                                Download
                            </button>
                        </div>
                        <div className="col-6 mb-3">
                            <label
                                htmlFor="upload"
                                className="form-label d-block"
                            >
                                Upload the file
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="upload"
                                name="upload"
                            />
                        </div>
                        <div className="text-end">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handelFileUpload}
                            >
                                <i className="bi bi-cloud-upload"></i>
                                Upload
                            </button>
                        </div>

                        <div>
                            <h2>Student Data</h2>
                            <pre>{JSON.stringify(studentData, null, 2)}</pre>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
