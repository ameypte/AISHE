import React, { useState } from "react";


export default function Form() {
  const [message,setMessage] = useState(null);
  const [id,setId] = useState("");
  const [sname,setSname] = useState("");
  const [sid,setSid] = useState("");
  const [gender,setGender] = useState("");
  const [regno,setRegno] = useState("");
  const [minor,setMinor] = useState("");
  const [selectedProgram,setSelectedProgram] = useState("");
  const [progCharCodes, setProgCharCodes] = useState([
    "IF",
    "CM",
    "CE",
    "ME",
    "PP",
    "CH",
    "EC",
    "EE",
]);
const [category , setCategory] = useState([

  "OBC",
  "OPEN",
  "SC",
  
]);
const [adtype , setAdtype] = useState([

    "OBC",
    "OPEN",
    "SC",
    "MINORITY",
    "TFWS",
    "PH"
  ]);

const handelSubmit = () =>{

}
  return (
    
        <div>
            <h2>Fill The Form</h2>
            <form className="row" onSubmit={handelSubmit}>
                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}
                <div className="form-group mb-3 col-6">
                    <label htmlFor="id" className="form-label">
                        Id
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        placeholder="Enter Id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                        <label htmlFor="progChar" className="form-label">
                            Program Char Code
                        </label>
                        <select
                            name="progChar"
                            id="programCharCode"
                            className="form-select"
                            required
                            onChange={(e) => setSelectedProgram(e.target.value)}
                        >
                            {progCharCodes.map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>
                    </div>
                
                <div className="form-group mb-3 col-6">
                    <label htmlFor="sname" className="form-label">
                        Student Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sname"
                        name="sname"
                        placeholder="Enter Student Name"
                        value={sname}
                        onChange={(e) => setSname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="sid" className="form-label">
                        Student Id 
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sid"
                        name="sid"
                        placeholder="Enter Student Id"
                        value={sid}
                        onChange={(e) => setSid(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="regno" className="form-label">
                        Registration Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="regno"
                        name="regno"
                        placeholder="Enter Registration Number"
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3 col-6">
                        <label htmlFor="category" className="form-label">
                            Select Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            required
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {category.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3 col-6">
                        <label htmlFor="category" className="form-label">
                            Admission Type
                        </label>
                        <select
                            name="adtype"
                            id="adtype"
                            className="form-select"
                            required
                            onChange={(e) => setAdtype(e.target.value)}
                        >
                            {adtype.map((at) => (
                                <option key={at} value={at}>
                                    {at}
                                </option>
                            ))}
                        </select>
                    </div>

                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="gender" className="form-label">
                        Gender
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                checked
                                onChange={(e) => setGender(e.target.value)}
                                required
                                value="female"
                            />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="others"
                                checked
                                onChange={(e) => setGender(e.target.value)}
                                required
                                value="others"
                            />
                            <label className="form-check-label" htmlFor="others">
                                Others
                            </label>
                        </div>
                    </div>
                </div>
               
                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="minor" className="form-label">
                        Minor
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="minor"
                                id="yes"
                                value="yes"
                                onChange={(e) => setMinor(e.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="yes">
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="minor"
                                id="no"
                                checked
                                onChange={(e) => setGender(e.target.value)}
                                required
                                value="no"
                            />
                            <label className="form-check-label" htmlFor="no">
                                No
                            </label>
                        </div>
                        
                    </div>
                </div>
               
                
                
               
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Submit
                    </button>
                </div>
            </form>

    </div>
  )
}
