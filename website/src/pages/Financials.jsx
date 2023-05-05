import React, { useState, useEffect } from 'react'
import isLoggedIn from "../components/isLoggedIn";
import jsPDF from "jspdf";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "../components/config/firebaseConfig";


export default function Financials(props) {
  const isUserLoggedIn = isLoggedIn();
  const [income, setIncome] = useState([{ items: "", amtTho: "", amtRs: "" }]);
  const [expend, setExpend] = useState([{ items: "", amtTho: "", amtRs: "" }]);
  const [incMessage, setIncMessage] = useState("");
  const [expMessage, setExpMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if (!isUserLoggedIn) {
      window.location.href = "/";
      alert("You are not logged in");
      return null;
    }

    setIsLoading(true);
    const incRef = firebase.database().ref("Financial information").child("income");
    incRef.on("value", (snapshot) => {
      const incomes = snapshot.val();
      if (incomes) {
        setIncome(incomes);
      }
      
    });
    const expRef = firebase.database().ref("Financial information").child("expenditure");
    expRef.on("value", (snapshot) => {
      const expends = snapshot.val();
      if (expends) {
        setExpend(expends);
      }
      
    });

    setIsLoading(false);
  }, []);

  // For Income Part
  const handleItemChange = (event, index) => {

    const newIncome = [...income]
    newIncome[index].items = event.target.value;
    setIncome(newIncome);
  }

  const handleAmtThoChange = (event, index) => {
    const newIncome = [...income]
    newIncome[index].amtTho = event.target.value;
    setIncome(newIncome);
  }
  const handleAmtRsChange = (event, index) => {
    const newIncome = [...income]
    newIncome[index].amtRs = event.target.value;
    setIncome(newIncome);
  }

  const handleAddIncome = () => {
    setIncome([...income, { items: "", amtTho: "", amtRs: "" }]);
  }
  const handelUpdateIncome = () => {
    const dbRef = firebase.database().ref("Financial information").child("income");
    dbRef.set(income);
    setIncMessage("Income updated successfully");
  }

  const handleRemoveIncome = (index) => {
    if (
      window.confirm(
        `Are you sure you want to remove information ${index + 1}?`
      )
    ) {
      const newIncome = [...income];
      newIncome.splice(index, 1);
      setIncome(newIncome);
    }
  }

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Sr. No.", "Items", "Amount Converted in Thousand", "Amount in Absoulte Rupees"]],
      body: income.map((inc, index) => [
        index + 1,
        inc.items,
        inc.amtRs,
        inc.amtRs,
      ]),
    });
    doc.save("Income Information.pdf");
  }


  // For Expend  Part

  const handleExpItemChange = (event, index) => {

    const newExpend = [...expend]
    newExpend[index].items = event.target.value;
    setIncome(newExpend);
  }

  const handleExpAmtThoChange = (event, index) => {
    const newExpend = [...expend]
    newExpend[index].amtTho = event.target.value;
    setIncome(newExpend);
  }
  const handleExpAmtRsChange = (event, index) => {
    const newExpend = [...expend]
    newExpend[index].amtRs = event.target.value;
    setIncome(newExpend);
  }

  const handleAddExpend = () => {
    setExpend([...expend, { items: "", amtTho: "", amtRs: "" }]);
  }
  const handelUpdateExpend = () => {
    const dbRef = firebase.database().ref("Financial information").child("expenditure");
    dbRef.set(expend);
    setExpMessage("Expenditure updated successfully");

  }

  const handleRemoveExpend = (index) => {
    if (
      window.confirm(
        `Are you sure you want to remove information ${index + 1}?`
      )
    ) {
      const newExpend = [...expend];
      newExpend.splice(index, 1);
      setExpend(newExpend);
    }
  }

  const handleExpendPrint = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Sr. No.", "Items", "Amount Converted in Thousand", "Amount in Absoulte Rupees"]],
      body: expend.map((exp, index) => [
        index + 1,
        exp.items,
        exp.amtRs,
        exp.amtRs,
      ]),
    });
    doc.save("Expenditure Information.pdf");
  }

  return (
    <>
      <div className={(!props.aisheReport) ? ("container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"):("")}>
        {/* <h2 className="text-center mb-4 col">Financial Information</h2> */}
        {incMessage && (
          <div className="alert alert-success" role="alert">
            {incMessage}
          </div>
        )}
        {isLoading ? (
          <div className="text-center">
            <div
              class="spinner-border text-primary xmb-3"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
        <h3 className="text-center mb-4 col">Income</h3>
        <table className="table table-bordered table-striped text-center table-hover">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sr. No.</th>
              <th style={{ width: "40%" }}>Items</th>
              <th style={{ width: "25%" }}>Amount Converted in Thousand</th>
              <th style={{ width: "30%" }}>Amount in Absoulte Rupees</th>
              {(!props.aisheReport) && ( <th style={{ width: "20%" }}>Actions</th>)}
            </tr>
          </thead>
          <tbody>
            {income.map((inc, index) => (
              <tr key={index}>
                <td style={{ width: "10%" }}>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={inc.items}
                    onChange={(event) =>
                      handleItemChange(event, index)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={inc.amtTho}
                    onChange={(event) =>
                      handleAmtThoChange(event, index)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={inc.amtRs}
                    onChange={(event) =>
                      handleAmtRsChange(event, index)
                    }
                  />
                </td>
                {(!props.aisheReport) && (
                <td style={{ width: "10%" }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      handleRemoveIncome(index)
                    }
                  >
                    Remove
                  </button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
          {(!props.aisheReport) && (
          <tfoot>
            <tr>
              <td colSpan="5" className="text-center">
                <button
                  type="button"
                  className="btn btn-success me-3"
                  onClick={() => handelUpdateIncome()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddIncome}
                >
                  Add Row
                </button>
              </td>
            </tr>
          </tfoot>
          )}
        </table>

        <div className="text-end">
        {(!props.aisheReport) && (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handlePrint}
          >
            Print
          </button>
        )}
        </div>
      </div>


      {/* for Expend Part */}

      <div className={(!props.aisheReport) ? ("container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"):("")}>

        {expMessage && (
          <div className="alert alert-success" role="alert">
            {expMessage}
          </div>
        )}
        {isLoading ? (
          <div className="text-center">
            <div
              class="spinner-border text-primary xmb-3"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
        <h3 className="text-center mb-4 col">Expenditure</h3>
        <table className="table table-bordered  table-striped text-center table-hover">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sr. No.</th>
              <th style={{ width: "40%" }}>Items</th>
              <th style={{ width: "25%" }}>Amount Converted in Thousand</th>
              <th style={{ width: "30%" }}>Amount in Absoulte Rupees</th>
              {(!props.aisheReport) && (<th style={{ width: "20%" }}>Actions</th>)}
            </tr>
          </thead>
          <tbody>
            {expend.map((exp, index) => (
              <tr key={index}>
                <td style={{ width: "10%" }}>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={exp.items}
                    onChange={(event) =>
                      handleExpItemChange(event, index)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={exp.amtTho}
                    onChange={(event) =>
                      handleExpAmtThoChange(event, index)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={exp.amtRs}
                    onChange={(event) =>
                      handleExpAmtRsChange(event, index)
                    }
                  />
                </td>
                {(!props.aisheReport) && (
                <td style={{ width: "10%" }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      handleRemoveExpend(index)
                    }
                  >
                    Remove
                  </button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
          {(!props.aisheReport) && (
          <tfoot>
            <tr>
              <td colSpan="5" className="text-center">
                <button
                  type="button"
                  className="btn btn-success me-3"
                  onClick={() => handelUpdateExpend()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddExpend}
                >
                  Add Row
                </button>
              </td>
            </tr>
          </tfoot>
          )}
        </table>

        <div className="text-end">
        {(!props.aisheReport) && (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleExpendPrint}
          >
            Print
          </button>
        )}
        </div>
      </div>
    </>
  )
}
