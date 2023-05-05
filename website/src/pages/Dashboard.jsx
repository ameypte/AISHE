import { useEffect, useState } from "react";
import isLoggedIn from "../components/isLoggedIn";
import firebase from "firebase/compat/app";
import firebaseConfig from "../components/config/firebaseConfig";
import "firebase/compat/database";
export default function Dashboard() {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const dept = localStorage.getItem("dept");
    const [name, setName] = useState();

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);

        const isUserLoggedIn = isLoggedIn();
        if (!isUserLoggedIn) {
            window.location.href = "/";
            return null;
        }
        const userRef = firebase
            .database()
            .ref("Departments")
            .child(dept)
            .child(role)
            .child(user);
        const userData = userRef.on("value", (snapshot) => {
            setName(snapshot.val().name);
        });
    }, []);

    return (
        <div className="container my-4 px-5 py-4 rounded shadow bg-body-tertiary">
            <h2 className="mb-4">Welcome, {name} </h2>
            <div>
                <h4>AISHE Report</h4>
                <p style={{ textAlign: "justify" }}>
                    The All India Survey on Higher Education (AISHE) is an
                    annual survey conducted by the Indian government's Ministry
                    of Education to collect data on various aspects of higher
                    education in India. The survey aims to provide a
                    comprehensive database on higher education that can be used
                    by policymakers, academics, researchers, and other
                    stakeholders to plan, develop, and monitor the growth and
                    quality of higher education in India.
                </p>
                <p style={{ textAlign: "justify" }}>
                    The AISHE report includes data on various parameters such as
                    student enrolment, faculty, courses, infrastructure,
                    research and development, and financial resources of higher
                    education institutions in India. The report is released
                    every year and is available in the public domain. It
                    provides a useful snapshot of the state of higher education
                    in India and helps in identifying trends and gaps in the
                    sector.
                </p>
            </div>
            <div className="text-end">
                <button type="button" class="btn btn-outline-success">
                    Generate Report
                </button>
            </div>
        </div>
    );
}
