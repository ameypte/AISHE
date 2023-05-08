import React, { useState,useRef } from "react";

export default function Table(props) {
    const data = props.data;
    const tableRef = useRef(null);


    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const rowCount = tableRef.current ? tableRef.current.rows.length : 0;

    return (
        <div>
            <div className="ts">{rowCount} Records Retrived</div>
            <table className="table table-bordered table-striped rounded" ref={tableRef}>
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
