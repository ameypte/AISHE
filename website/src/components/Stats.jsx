import React, { useEffect, useState } from "react";


export default function Stats() {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        handleSlat();
    }, []);

    const handleSlat = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/resultslat", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (responseData.message) {
                return;
            }
            console.log(responseData);
            setStatsData(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
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
        </div>
    );
}
