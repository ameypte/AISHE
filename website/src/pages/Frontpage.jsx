import React from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/swatchbharat.png";

export default function Frontpage() {
    return (
        <div>
            <div className=" mt-2 text-center">
                <h2>ALL INDIA SURVEY ON HIGHER EDUCATION.</h2>
            </div>
            <div className="mt-5 text-center">
                <h5>DATA CAPTURE FORMAT - III</h5>
            </div>
            <div className="text-center">
                <h5>STANDALONE INSTITUTIONS</h5>
            </div>
            <div className="text-center">
                <h5>(NOT AFFILIATED / RECOGNISED BY THE UNIVERSITY)</h5>
            </div>
            <div className="mt-4 text-center">
                <h5>YEAR:</h5>
            </div>
            <div className="mt-4 text-center">
                <h5>As On 30th September 2018</h5>
            </div>
            <div className="text-center">
                <img
                    src={logo}
                    alt="logo"
                    className="img-fluid"
                    style={{ height: "90px", marginTop: "18px" }}
                />
            </div>

            <div className="mt-5 text-center">
                <h4>
                    Ministry of Human Resource Development<br/>
                    Department of Higher Education <br/>
                    New Delhi

                </h4>
            </div>
            <div className="mb-2 ms-5 text-center">
                <img
                    src={logo2}
                    alt="logo"
                    className="img-fluid"
                    style={{ height: "90px", marginTop: "18px" }}
                />
            </div>
        </div>
    );
}
