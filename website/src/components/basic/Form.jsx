import React, { useEffect, useState } from "react";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import isLoggedIn from "../isLoggedIn";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function Form(props) {
    const [instituteName, setInstituteName] = useState("");
    const [aisheCode, setAisheCode] = useState("");
    const [city, setCity] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [website, setWebsite] = useState("");
    const [totalArea, setTotalArea] = useState(0);
    const [constructedArea, setConstructedArea] = useState(0);
    const [establishmentYear, setEstablishmentYear] = useState(0);
    const [headName, setHeadName] = useState("");
    const [headContact, setHeadContact] = useState("");
    const [headEmail, setHeadEmail] = useState("");
    const [nodalName, setNodalName] = useState("");
    const [nodalDesignation, setNodalDesignation] = useState("");
    const [nodalTelephone, setNodalTelephone] = useState("");
    const [nodalContact, setNodalContact] = useState("");
    const [nodalEmail, setNodalEmail] = useState("");
    // Standard Institute Details
    const [recognitionYear, setRecognitionYear] = useState(0);
    const [institutionLocation, setInstitutionLocation] = useState("");
    const [instituteBlockCityTown, setInstituteBlockCityTown] = useState("");
    // Geographical Referencing
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [isDegreeThroughUniversity, setIsDegreeThroughUniversity] =
        useState(false);
    const [degreeThroughUniversityName, setDegreeThroughUniversityName] =
        useState("");
    const [managementOfInstitute, setManagementOfInstitute] = useState("");
    const [nameOfMinistry, setNameOfMinistry] = useState("");
    const [isInstituteMeantForGirls, setIsInstituteMeantForGirls] =
        useState(false);
    const [isStaffAvailable, setIsStaffAvailable] = useState(false);
    const [isHostelAvailable, setIsHostelAvailable] = useState(false);

    const [teachingStaff, setTeachingStaff] = useState(0);
    const [nonTeachingStaff, setNonTeachingStaff] = useState(0);
    const [hostelNo, setHostelNo] = useState(0);

    const [hostelName, setHostelName] = useState([]);
    const [hostelType, setHostelType] = useState([]);
    const [intakeCapacity, setIntakeCapacity] = useState([]);
    const [studentResiding, setStudentResiding] = useState([]);

    const calculateTotal = () => {
        const total = teachingStaff + nonTeachingStaff;
        return total;
    };
    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        const isUserLoggedIn = isLoggedIn();

        if (!isUserLoggedIn) {
            window.location.href = "/";
            alert("You are not logged in");
            return null;
        }
        const ref = firebase.database().ref("Basic Information");

        ref.on("value", (snapshot) => {
            const data = snapshot.val();
            setInstituteName(data.instituteName);
            setAisheCode(data.aisheCode);
            setCity(data.city);
            setAddressLine1(data.addressLine1);
            setAddressLine2(data.addressLine2);
            setState(data.state);
            setDistrict(data.district);
            setWebsite(data.website);
            setTotalArea(data.totalArea);
            setConstructedArea(data.constructedArea);
            setEstablishmentYear(data.establishmentYear);
            setHeadName(data.headName);
            setHeadContact(data.headContact);
            setHeadEmail(data.headEmail);
            setNodalName(data.nodalName);
            setNodalDesignation(data.nodalDesignation);
            setNodalTelephone(data.nodalTelephone);
            setNodalContact(data.nodalContact);
            setNodalEmail(data.nodalEmail);
            setRecognitionYear(data.recognitionYear);
            setInstitutionLocation(data.institutionLocation);
            setInstituteBlockCityTown(data.instituteBlockCityTown);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setIsDegreeThroughUniversity(data.isDegreeThroughUniversity);
            setDegreeThroughUniversityName(data.degreeThroughUniversityName);
            setManagementOfInstitute(data.managementOfInstitute);
            setNameOfMinistry(data.nameOfMinistry);
            setIsInstituteMeantForGirls(data.isInstituteMeantForGirls);
            setIsStaffAvailable(data.isStaffAvailable);
            setIsHostelAvailable(data.isHostelAvailable);
            setTeachingStaff(data.teachingStaff);
            setNonTeachingStaff(data.nonTeachingStaff);
            setHostelNo(data.hostelNo);
            setHostelName(data.hostelName);
            setHostelType(data.hostelType);
            setIntakeCapacity(data.intakeCapacity);
            setStudentResiding(data.studentResiding);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = firebase.database().ref("Basic Information");

        database.once("value", (snapshot) => {
            if (snapshot.exists()) {
                alert("Institute already exists");
            } else {
                const data = {
                    instituteName,
                    aisheCode,
                    city,
                    addressLine1,
                    addressLine2,
                    state,
                    district,
                    website,
                    totalArea,
                    constructedArea,
                    establishmentYear,
                    headName,
                    headContact,
                    headEmail,
                    nodalName,
                    nodalDesignation,
                    nodalTelephone,
                    nodalContact,
                    nodalEmail,
                    recognitionYear,
                    institutionLocation,
                    instituteBlockCityTown,
                    latitude,
                    longitude,
                    isDegreeThroughUniversity,
                    degreeThroughUniversityName,
                    managementOfInstitute,
                    nameOfMinistry,
                    isInstituteMeantForGirls,
                    isStaffAvailable,
                    isHostelAvailable,
                    teachingStaff,
                    nonTeachingStaff,
                    hostelNo,
                    hostelName,
                    hostelType,
                    intakeCapacity,
                    studentResiding,
                };
                database.set(data);

                alert("Data Saved");
            }
        });
    };
    return (
        <div
            className={
                !props.aisheReport
                    ? "container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"
                    : "py-4"
            }
        >
            <h1 className="text-center mb-3">Institute Information</h1>
            <div className="text-start">
                {!props.aisheReport ? (
                    <button
                        type="button"
                        className="btn btn-success mb-3"
                        onClick=""
                    >
                        <i className="bi bi-cloud-upload"></i>
                        Print
                    </button>
                ) : null}
            </div>
            <form className="row" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="institute-name" className="form-label">
                        Name of the Institute
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="institute-name"
                        name="institute-name"
                        value={instituteName}
                        onChange={(e) => setInstituteName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="aishe-code" className="form-label">
                        AISHE Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="aishe-code"
                        value={aisheCode}
                        onChange={(e) => setAisheCode(e.target.value)}
                        name="aishe-code"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        id="city"
                        name="city"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address-line1" className="form-label">
                        Postal Address Line 1
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        id="address-line1"
                        name="address-line1"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address-line2" className="form-label">
                        Postal Address Line 2
                    </label>
                    <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="form-control"
                        id="address-line2"
                        name="address-line2"
                    />
                </div>

                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="state" className="form-label">
                        State
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        id="state"
                        name="state"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="district" className="form-label">
                        District
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        name="district"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="website" className="form-label">
                        Website
                    </label>
                    <input
                        type="url"
                        className="form-control"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        name="website"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-4 col-md-12">
                    <label htmlFor="total-area" className="form-label">
                        Total Area (in acre)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="total-area"
                        value={totalArea}
                        onChange={(e) => setTotalArea(e.target.value)}
                        name="total-area"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-4 col-md-12">
                    <label htmlFor="constructed-area" className="form-label">
                        Total Constructed Area (in Sq. m.)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="constructed-area"
                        name="constructed-area"
                        value={constructedArea}
                        onChange={(e) => setConstructedArea(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-4 col-md-12">
                    <label htmlFor="establishment-year" className="form-label">
                        Year of Establishment
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="establishment-year"
                        name="establishment-year"
                        value={establishmentYear}
                        onChange={(e) => setEstablishmentYear(e.target.value)}
                        required
                    />
                </div>
                <hr className="my-4" />
                <h4>Standard Institution Contact Details</h4>
                <h5>A) Head of the Institution</h5>
                <div className="form-group mb-3 ">
                    <label htmlFor="head-name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="head-name"
                        value={headName}
                        onChange={(e) => setHeadName(e.target.value)}
                        name="head-name"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="head-contact" className="form-label">
                        Contact No.
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="head-contact"
                        value={headContact}
                        onChange={(e) => setHeadContact(e.target.value)}
                        name="head-contact"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="head-email" className="form-label">
                        Email ID
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="head-email"
                        value={headEmail}
                        onChange={(e) => setHeadEmail(e.target.value)}
                        name="head-email"
                        required
                    />
                </div>
                <h5>B) Nodal Officer</h5>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="nodal-name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nodal-name"
                        value={nodalName}
                        onChange={(e) => setNodalName(e.target.value)}
                        name="nodal-name"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="nodal-designation" className="form-label">
                        Designation
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nodal-designation"
                        value={nodalDesignation}
                        onChange={(e) => setNodalDesignation(e.target.value)}
                        name="nodal-designation"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="nodal-telephone" className="form-label">
                        Telephone No.
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        value={nodalTelephone}
                        onChange={(e) => setNodalTelephone(e.target.value)}
                        id="nodal-telephone"
                        name="nodal-telephone"
                        required
                    />
                </div>
                <div className="form-group mb-3 col-lg-6 col-md-12">
                    <label htmlFor="nodal-mobile" className="form-label">
                        Mobile No.
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        value={nodalContact}
                        onChange={(e) => setNodalContact(e.target.value)}
                        id="nodal-mobile"
                        name="nodal-mobile"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="nodal-email" className="form-label">
                        Email ID
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={nodalEmail}
                        onChange={(e) => setNodalEmail(e.target.value)}
                        id="nodal-email"
                        name="nodal-email"
                        required
                    />
                </div>
                <hr />
                <h4>Standard Institution Details</h4>
                <div className="form-group mb-3 col-lg-4 col-md-12">
                    <label htmlFor="recognition-year" className="form-label">
                        Year of Recognition
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={recognitionYear}
                        onChange={(e) => setRecognitionYear(e.target.value)}
                        id="recognition-year"
                        name="recognition-year"
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-12">
                    <label
                        htmlFor="institution-location"
                        className="form-label"
                    >
                        Location of the Institution:
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="location"
                                id="Rural"
                                value="Rural"
                                onChange={(e) =>
                                    setInstitutionLocation(e.target.value)
                                }
                                required
                            />
                            <label className="form-check-label" htmlFor="Rural">
                                Rural
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="location"
                                id="Urban"
                                onChange={(e) =>
                                    setInstitutionLocation(e.target.value)
                                }
                                required
                                value="Urban"
                            />
                            <label className="form-check-label" htmlFor="Urban">
                                Urban
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-3 col-lg-4 col-md-12">
                    <label htmlFor="block-city-town" className="form-label">
                        Block/City/Town
                    </label>
                    <input
                        type="text"
                        value={instituteBlockCityTown}
                        onChange={(e) =>
                            setInstituteBlockCityTown(e.target.value)
                        }
                        className="form-control"
                        id="block-city-town"
                        name="block-city-town"
                        required
                    />
                </div>
                <hr />
                <h4 className="mb-0">Geographical referencing</h4>
                <div id="passwordHelpBlock" className="form-text mb-2">
                    Values must contain minimum of 5 digits after the decimal
                    point.
                </div>
                <div className="mb-3 col-lg-4 col-md-12">
                    <label htmlFor="latitude" className="form-label">
                        Latitude
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        id="latitude"
                        name="latitude"
                        required
                    />
                    <div id="passwordHelpBlock" className="form-text mb-2">
                        Range: 6 - 38
                    </div>
                </div>
                <div className="mb-3 col-lg-4 col-md-12">
                    <label htmlFor="longitude" className="form-label">
                        Longitude
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        id="longitude"
                        name="longitude"
                        required
                    />
                    <div id="passwordHelpBlock" className="form-text mb-2">
                        Range: 68 - 98
                    </div>
                </div>
                <hr />
                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="awards" className="form-label">
                        Wether the awards degree through any University:{" "}
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="award"
                                onChange={(e) => {
                                    setIsDegreeThroughUniversity(true);
                                }}
                                id="award-yes"
                                value="Yes"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="award-yes"
                            >
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="award"
                                onChange={(e) => {
                                    setIsDegreeThroughUniversity(false);
                                }}
                                id="award-no"
                                required
                                value="No"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="award-no"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="isawards" className="form-label">
                        If Yes, then the university through which it awards
                        degree
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={degreeThroughUniversityName}
                        onChange={(e) =>
                            setDegreeThroughUniversityName(e.target.value)
                        }
                        id="isawards"
                        name="isawards"
                        required={isDegreeThroughUniversity}
                    />
                </div>
                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="management" className="form-label">
                        Management of Institution
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={managementOfInstitute}
                        onChange={(e) =>
                            setManagementOfInstitute(e.target.value)
                        }
                        id="management"
                        name="management"
                        required={isDegreeThroughUniversity}
                    />
                </div>
                {/* Name of the ministry */}
                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="ministry" className="form-label">
                        Name of the Ministry
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nameOfMinistry}
                        onChange={(e) => setNameOfMinistry(e.target.value)}
                        id="ministry"
                        name="ministry"
                        required
                    />
                </div>

                <div className="mb-3 col-lg-6 col-md-12">
                    <label id="meant-for-girls" className="form-label">
                        Whether the Institution is exclusively meant for girls
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="meantforGirls"
                                onChange={() => {
                                    setIsInstituteMeantForGirls(true);
                                }}
                                id="meantforGirlsYes"
                                value="Yes"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="meantforGirlsYes"
                            >
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="meantforGirls"
                                id="meantforGirlsNo"
                                onChange={() => {
                                    setIsInstituteMeantForGirls(false);
                                }}
                                value="No"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="meantforGirlsNo"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-3 col-lg-6 col-md-12">
                    <label id="staff-quater" className="form-label">
                        Staff Quater Available
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="staffQuater"
                                value="Yes"
                                onChange={() => {
                                    setIsStaffAvailable(true);
                                }}
                                id="staff-yes"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="staff-yes"
                            >
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="staffQuater"
                                onChange={() => {
                                    setIsStaffAvailable(false);
                                }}
                                id="staff-no"
                                required
                                value="No"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="staff-no"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>

                {isStaffAvailable && (
                    <div className="d-block">
                        <div className="mb-3 container w-50 bg-body-secondary rounded shadow-sm">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Teaching Staff</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={teachingStaff}
                                                onChange={(e) =>
                                                    setTeachingStaff(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Non-Teaching Staff</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={nonTeachingStaff}
                                                onChange={(e) =>
                                                    setNonTeachingStaff(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>
                                            <span>{calculateTotal()}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className="mb-3 col-lg-6 col-md-12">
                    <label htmlFor="hostel" className="form-label">
                        Does the Institution have Hostel
                    </label>
                    <div className="form-control">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="hostel"
                                id="hostelyes"
                                value="Yes"
                                onChange={() => {
                                    setIsHostelAvailable(true);
                                }}
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="hostelyes"
                            >
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="hostel"
                                id="hostelno"
                                required
                                value="No"
                                onChange={() => {
                                    setIsHostelAvailable(false);
                                }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="hostelno"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
                {isHostelAvailable && (
                    <>
                        <div className="mb-3 col-lg-6 col-md-12">
                            <label htmlFor="hostel-no" className="form-label">
                                Number of Hostel
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="hostel-no"
                                value={hostelNo}
                                onChange={(e) => {
                                    setHostelNo(parseInt(e.target.value));
                                    setHostelName([]);
                                    setHostelType([]);
                                    setIntakeCapacity([]);
                                    setStudentResiding([]);
                                }}
                                name="hostel-no"
                                required
                            />
                        </div>

                        <div className="mb-3 container bg-body-secondary rounded shadow-sm">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Name of Hostel</th>
                                        <th>Hostel Type</th>
                                        <th>Intake Capacity</th>
                                        <th>No. of Students Residing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelNo > 0 &&
                                        [...Array(hostelNo)].map((_, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={hostelName[i]}
                                                        onChange={(e) => {
                                                            let names = [
                                                                ...hostelName,
                                                            ];
                                                            names[i] =
                                                                e.target.value;
                                                            setHostelName(
                                                                names
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={hostelType[i]}
                                                        onChange={(e) => {
                                                            let types = [
                                                                ...hostelType,
                                                            ];
                                                            types[i] =
                                                                e.target.value;
                                                            setHostelType(
                                                                types
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={
                                                            intakeCapacity[i]
                                                        }
                                                        onChange={(e) => {
                                                            let capacities = [
                                                                ...intakeCapacity,
                                                            ];
                                                            capacities[i] =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                );
                                                            setIntakeCapacity(
                                                                capacities
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={
                                                            studentResiding[i]
                                                        }
                                                        onChange={(e) => {
                                                            let residing = [
                                                                ...studentResiding,
                                                            ];
                                                            residing[i] =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                );
                                                            setStudentResiding(
                                                                residing
                                                            );
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {!props.aisheReport && (
                    <div className="text-end">
                        <button
                            type="submit"
                            className="btn btn-primary col-1 mt-2"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
