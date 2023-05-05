import React, { useState } from "react";

export default function Table(props) {
    const data = props.data;

    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div>
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
    );
}
