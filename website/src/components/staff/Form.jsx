import React,{useState} from "react";

export default function Form() {
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pan, setPan] = useState("");
    const [message, setMessage] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        const data = {
            first_name: fname,
            middle_name: mname,
            last_name: lname,
            email: email,
        };
        alert(JSON.stringify(data));
        setMessage("Data has been submitted");
    };

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
                    <label htmlFor="fname" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        name="fname"
                        placeholder="Enter staff first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group mb-3 col-6">
                    <label htmlFor="lname" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lname"
                        name="lname"
                        placeholder="Enter staff last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="pan" className="form-label">
                        Pan Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="pan"
                        name="pan"
                        placeholder="Enter Staff Pan Number"
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter staff email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </form>
        </div>
    );
}
