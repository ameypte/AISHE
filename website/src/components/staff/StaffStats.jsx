import React, { useEffect, useState } from "react";

export default function StaffStats() {
    const [data, setData] = useState([]);
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    useEffect(() => {
        try {
            const response = fetch("http://localhost:5000/staffslat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = response.json();
            if (responseData.message) {
                return;
            }
            console.log(responseData);
            setData(responseData);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
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
    );
}
