import React,{useEffect, useState} from "react";
import firebaseConfig from "../components/config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default function Infrastructure(props) {
    const [isPlayground, setIsPlayground] = useState(false);
    const [isAuditorium, setIsAuditorium] = useState(false);
    const [isTheatre, setIsTheatre] = useState(false);
    const [isLibrary, setIsLibrary] = useState(false);
    const [numberOfBooks, setNumberOfBooks] = useState(0);
    const [numberOfJournals, setNumberOfJournals] = useState(0);
    const [isLaboratory, setIsLaboratory] = useState(false);
    const [isConferenceHall, setIsConferenceHall] = useState(false);
    const [isHealthCenter, setIsHealthCenter] = useState(false);
    const [isGymnasium, setIsGymnasium] = useState(false);
    const [isIndoorStadium, setIsIndoorStadium] = useState(false);
    const [isCommonRoom, setIsCommonRoom] = useState(false);
    const [isComputerCenter, setIsComputerCenter] = useState(false);
    const [isCafeteria, setIsCafeteria] = useState(false);
    const [isGuestHouse, setIsGuestHouse] = useState(false);
    const [isseparateRoomForGirls, setIsseparateRoomForGirls] =
        useState(false);
    const [isSolarPowerGeneration, setIsSolarPowerGeneration] =
        useState(false);
    const [isConnectivityNKN, setIsConnectivityNKN] = useState(false);
    const [isConnectivityNMEICT, setIsConnectivityNMEICT] =
        useState(false);
    const [
        isCampusIsDifferntlyAbledFriendly,
        setIsCampusIsDifferntlyAbledFriendly,
    ] = useState(false);
    const [
        isSeparateToiletForDisabledFemale,
        setIsSeparateToiletForDisabledFemale,
    ] = useState(false);
    const [isRampAttachedToClassrooms, setIsRampAttachedToClassrooms] =
        useState(false);
    const [isgrievanceRedressalMechanism, setIsgrievanceRedressalMechanism] =
        useState(false);
    const [isVigilanceCell, setIsVigilanceCell] = useState(false);
    const [isEqualOpportunityCell, setIsEqualOpportunityCell] =
        useState(false);
    const [isSexualHarassmentCell, setIsSexualHarassmentCell] =
        useState(false);
    const [isCounselorsforStudent, setIsCounselorsforStudent] =
        useState(false);
    const [isClinic, setIsClinic] = useState(false);
    const [isSeparateToiletForGirl, setIsSeparateToiletForGirl] =
        useState(false);
    const [isSkillDevelopmentCell, setIsSkillDevelopmentCell] =
        useState(false);
    const [isSelfDefenceClassesForFemales, setIsSelfDefenceClassesForFemales] =
        useState(false);
    const [message, setMessage] = useState("");
    const [disaster, setDisaster] = useState(false);
    const [traningProgram, setTraningProgram] = useState(false);
    const [assessment, setAssessment] = useState(false);
    const [drill, setDrill] = useState(false);

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const ref = db.ref("Infrastructure information");
        ref.on("value", (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setMessage("No data found");
                return;
            }
            setIsPlayground(data.isPlayground);
            setIsAuditorium(data.isAuditorium);
            setIsTheatre(data.isTheatre);
            setIsLibrary(data.isLibrary);
            setNumberOfBooks(data.numberOfBooks);
            setNumberOfJournals(data.numberOfJournals);
            setIsLaboratory(data.isLaboratory);
            setIsConferenceHall(data.isConferenceHall);
            setIsHealthCenter(data.isHealthCenter);
            setIsGymnasium(data.isGymnasium);
            setIsIndoorStadium(data.isIndoorStadium);
            setIsCommonRoom(data.isCommonRoom);
            setIsComputerCenter(data.isComputerCenter);
            setIsCafeteria(data.isCafeteria);
            setIsGuestHouse(data.isGuestHouse);
            setIsseparateRoomForGirls(data.isseparateRoomForGirls);
            setIsSolarPowerGeneration(data.isSolarPowerGeneration);
            setIsConnectivityNKN(data.isConnectivityNKN);
            setIsConnectivityNMEICT(data.isConnectivityNMEICT);
            setIsCampusIsDifferntlyAbledFriendly(
                data.isCampusIsDifferntlyAbledFriendly
            );
            setIsSeparateToiletForDisabledFemale(
                data.isSeparateToiletForDisabledFemale
            );
            setIsRampAttachedToClassrooms(data.isRampAttachedToClassrooms);
            setIsgrievanceRedressalMechanism(
                data.isgrievanceRedressalMechanism
            );
            setIsVigilanceCell(data.isVigilanceCell);
            setIsEqualOpportunityCell(data.isEqualOpportunityCell);
            setIsSexualHarassmentCell(data.isSexualHarassmentCell);
            setIsCounselorsforStudent(data.isCounselorsforStudent);
            setIsClinic(data.isClinic);
            setIsSeparateToiletForGirl(data.isSeparateToiletForGirl);
            setIsSkillDevelopmentCell(data.isSkillDevelopmentCell);
            setIsSelfDefenceClassesForFemales(
                data.isSelfDefenceClassesForFemales
            );
            setDisaster(data.disaster);
            setTraningProgram(data.traningProgram);
            setAssessment(data.assessment);
            setDrill(data.drill);
        });
    }, []);
        
    const handelSave = () => {
        const db = firebase.database();
        const data = {
            isPlayground,
            isAuditorium,
            isTheatre,
            isLibrary,
            numberOfBooks,
            numberOfJournals,
            isLaboratory,
            isConferenceHall,
            isHealthCenter,
            isGymnasium,
            isIndoorStadium,
            isCommonRoom,
            isComputerCenter,
            isCafeteria,
            isGuestHouse,
            isseparateRoomForGirls,
            isSolarPowerGeneration,
            isConnectivityNKN,
            isConnectivityNMEICT,
            isCampusIsDifferntlyAbledFriendly,
            isSeparateToiletForDisabledFemale,
            isRampAttachedToClassrooms,
            isgrievanceRedressalMechanism,
            isVigilanceCell,
            isEqualOpportunityCell,
            isSexualHarassmentCell,
            isCounselorsforStudent,
            isClinic,
            isSeparateToiletForGirl,
            isSkillDevelopmentCell,
            isSelfDefenceClassesForFemales,
        };
        alert(JSON.stringify(data));
        db.ref("Infrastructure information").push(data);

        setMessage("Data Saved Successfully");
        setTimeout(() => {
            setMessage("");
        }, 3000);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <div className="row  comy-4 px-5 py-4 rounded shadow bg-body-tertiary">
                <h3 className="text-center mb-3">
                    Infrastructure Related Data
                </h3>
                <hr />
                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}
                <div className="col">
                    <div
                        className={
                            !props.aisheReport
                                ? "container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"
                                : ""
                        }
                    >
                        <table className="table table-bordered table-striped text-center table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>Sr. No.</th>
                                    <th colSpan={2}>Infrastructure</th>
                                    <th style={{ width: "10%" }}>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td colSpan={2}>Playground</td>
                                    <td
                                        onClick={() => {
                                            setIsPlayground(!isPlayground);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isPlayground}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td colSpan={2}>Auditorium</td>
                                    <td
                                        onClick={() =>
                                            setIsAuditorium(!isAuditorium)
                                        }
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value={isAuditorium}
                                            aria-label="..."
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td colSpan={2}>Theatre</td>
                                    <td
                                        onClick={() => {
                                            setIsTheatre(!isTheatre);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value={isTheatre}
                                            aria-label="..."
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>4.</td>
                                    <td colSpan={2}>Library</td>
                                    <td
                                        onClick={() => {
                                            setIsLibrary(!isLibrary);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            checked={isLibrary}
                                            aria-label="..."
                                        />
                                    </td>
                                </tr>
                                {isLibrary && (
                                    <>
                                        <tr>
                                            <td></td>
                                            <td>(a)</td>
                                            <td>Number of books</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={numberOfBooks}
                                                    onChange={(event) =>
                                                        setNumberOfBooks(
                                                            event.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>(b)</td>
                                            <td>
                                                Number of Journals (Peer
                                                reviewed) subscribed
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={numberOfJournals}
                                                    onChange={(event) =>
                                                        setNumberOfJournals(
                                                            event.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )}
                                <tr>
                                    <td>5.</td>
                                    <td colSpan={2}>Laboratory</td>
                                    <td
                                        onClick={() => {
                                            setIsLaboratory(!isLaboratory);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isLaboratory}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>6.</td>
                                    <td colSpan={2}>Conference Hall</td>
                                    <td
                                        onClick={() => {
                                            setIsConferenceHall(
                                                !isConferenceHall
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isConferenceHall}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>7.</td>
                                    <td colSpan={2}>Health Center</td>
                                    <td
                                        onClick={() => {
                                            setIsHealthCenter(!isHealthCenter);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isHealthCenter}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>8.</td>
                                    <td colSpan={2}>
                                        Gymnasium/ Fitness Center
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsGymnasium(!isGymnasium);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isGymnasium}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.</td>
                                    <td colSpan={2}>Indoor Stadium</td>
                                    <td
                                        onClick={() => {
                                            setIsIndoorStadium(
                                                !isIndoorStadium
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isIndoorStadium}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>10.</td>
                                    <td colSpan={2}>Common Room</td>
                                    <td
                                        onClick={() => {
                                            setIsCommonRoom(!isCommonRoom);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isCommonRoom}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>11.</td>
                                    <td colSpan={2}>Computer Center</td>
                                    <td
                                        onClick={() => {
                                            setIsComputerCenter(
                                                !isComputerCenter
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isComputerCenter}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>12.</td>
                                    <td colSpan={2}>Cafeteria</td>
                                    <td
                                        onClick={() => {
                                            setIsCafeteria(!isCafeteria);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isCafeteria}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>13.</td>
                                    <td colSpan={2}>Guest House</td>
                                    <td
                                        onClick={() => {
                                            setIsGuestHouse(!isGuestHouse);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isGuestHouse}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col">
                    <div
                        className={
                            !props.aisheReport
                                ? "container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"
                                : ""
                        }
                    >
                        <table className="table table-bordered table-striped text-center table-hover">
                            <tbody>
                                <tr>
                                    <td>14.</td>
                                    <td colSpan={2}>
                                        Separate Common Room exclusively for
                                        Girls
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsseparateRoomForGirls(
                                                !isseparateRoomForGirls
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isseparateRoomForGirls}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>15.</td>
                                    <td colSpan={2}>Solar Power Generation</td>
                                    <td
                                        onClick={() => {
                                            setIsSolarPowerGeneration(
                                                !isSolarPowerGeneration
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isSolarPowerGeneration}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>16.</td>
                                    <td colSpan={2}>Connectivity NKN</td>
                                    <td
                                        onClick={() => {
                                            setIsConnectivityNKN(
                                                !isConnectivityNKN
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isConnectivityNKN}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>17.</td>
                                    <td colSpan={2}>Connectivity NMEICT</td>
                                    <td
                                        onClick={() => {
                                            setIsConnectivityNMEICT(
                                                !isConnectivityNMEICT
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isConnectivityNMEICT}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>18.</td>
                                    <td colSpan={2}>
                                        Campus is differently abled friendly
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsCampusIsDifferntlyAbledFriendly(
                                                !isCampusIsDifferntlyAbledFriendly
                                            );
                                            setIsSeparateToiletForDisabledFemale(
                                                false
                                            );
                                            setIsRampAttachedToClassrooms(
                                                false
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={
                                                isCampusIsDifferntlyAbledFriendly
                                            }
                                        />
                                    </td>
                                </tr>
                                {isCampusIsDifferntlyAbledFriendly && (
                                    <>
                                        <tr>
                                            <td></td>
                                            <td>(i)</td>
                                            <td>
                                                Separate toilet for disabled
                                                female
                                            </td>
                                            <td
                                                onClick={() => {
                                                    setIsSeparateToiletForDisabledFemale(
                                                        !isSeparateToiletForDisabledFemale
                                                    );
                                                }}
                                            >
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id=""
                                                    value=""
                                                    aria-label="..."
                                                    // checked={!isCampusIsDifferntlyAbledFriendly ? (!isSeparateToiletForDisabledFemale)}
                                                    checked={
                                                        isSeparateToiletForDisabledFemale
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>(ii)</td>
                                            <td>
                                                Ramp attached to classroom /
                                                library
                                            </td>
                                            <td
                                                onClick={() => {
                                                    setIsRampAttachedToClassrooms(
                                                        !isRampAttachedToClassrooms
                                                    );
                                                }}
                                            >
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id=""
                                                    value=""
                                                    aria-label="..."
                                                    checked={
                                                        isRampAttachedToClassrooms
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )}

                                <tr>
                                    <td>19.</td>
                                    <td colSpan={2}>
                                        Grievance Redressal Mechanism
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsgrievanceRedressalMechanism(
                                                !isgrievanceRedressalMechanism
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={
                                                isgrievanceRedressalMechanism
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>20.</td>
                                    <td colSpan={2}>Vigilance Cell</td>
                                    <td
                                        onClick={() => {
                                            setIsVigilanceCell(
                                                !isVigilanceCell
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isVigilanceCell}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>21.</td>
                                    <td colSpan={2}>Equal Opportunity Cell</td>
                                    <td
                                        onClick={() => {
                                            setIsEqualOpportunityCell(
                                                !isEqualOpportunityCell
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isEqualOpportunityCell}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>22.</td>
                                    <td colSpan={2}>
                                        Sexual harassment / anti-ragging cell
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsSexualHarassmentCell(
                                                !isSexualHarassmentCell
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isSexualHarassmentCell}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>23.</td>
                                    <td colSpan={2}>Counselors for students</td>
                                    <td
                                        onClick={() => {
                                            setIsCounselorsforStudent(
                                                !isCounselorsforStudent
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isCounselorsforStudent}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>24.</td>
                                    <td colSpan={2}>Clinic / first-aid room</td>
                                    <td
                                        onClick={() => {
                                            setIsClinic(!isClinic);
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isClinic}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>25.</td>
                                    <td colSpan={2}>
                                        Separate toilet for girls
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsSeparateToiletForGirl(
                                                !isSeparateToiletForGirl
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isSeparateToiletForGirl}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>26.</td>
                                    <td colSpan={2}>
                                        Skill development centre
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsSkillDevelopmentCell(
                                                !isSkillDevelopmentCell
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={isSkillDevelopmentCell}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>27.</td>
                                    <td colSpan={2}>
                                        Self-defence class for females
                                    </td>
                                    <td
                                        onClick={() => {
                                            setIsSelfDefenceClassesForFemales(
                                                !isSelfDefenceClassesForFemales
                                            );
                                        }}
                                    >
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                            checked={
                                                isSelfDefenceClassesForFemales
                                            }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className="mt-5" />
                <div
                    className={
                        !props.aisheReport
                            ? "container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"
                            : ""
                    }
                >
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td className="" style={{ width: "10%" }}>
                                    B.
                                </td>
                                <td style={{ width: "50%" }}>
                                    Whether the University / Institution have
                                    Disaster Management facilities.
                                </td>
                                <td style={{ wdth: "20%" }}>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B1"
                                            id="disasterYes"
                                            onChange={(e) => setDisaster(true)}
                                            required
                                            checked={disaster}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="disasterYes"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B1"
                                            id="disasterNo"
                                            onChange={(e) => setDisaster(false)}
                                            required
                                            value="no"
                                            checked={!disaster}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="disasterNo"
                                        >
                                            No
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="" style={{ width: "10%" }}>
                                    (i)
                                </td>
                                <td style={{ width: "50%" }}>
                                    Whether capacity Building and
                                    Training/awareness programmes conducted.
                                </td>
                                <td style={{ wdth: "20%" }}>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B2"
                                            id="traningProgramYes"
                                            value="yes"
                                            onChange={(e) => setTraningProgram(true)}
                                            required
                                            checked={traningProgram}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="traningProgramYes"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B2"
                                            id="traningProgramNo"
                                            onChange={(e) => setTraningProgram(false)}
                                            required
                                            value="no"
                                            checked={!traningProgram}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="traningProgramNo"
                                        >
                                            No
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="" style={{ width: "10%" }}>
                                    (ii)
                                </td>
                                <td style={{ width: "50%" }}>
                                    Whether vulnerability assessment checks were
                                    made during the year.
                                </td>
                                <td style={{ wdth: "20%" }}>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B3"
                                            id="assessmentYes"
                                            onChange={(e) => setAssessment(true)}
                                            value="yes"
                                            checked={assessment}
                                            required
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="assessmentYes"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B3"
                                            onChange={(e) => setAssessment(false)}
                                            id="assessmentNo"
                                            required
                                            value="no"
                                            checked={!assessment}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="assessmentNo"
                                        >
                                            No
                                        </label>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="" style={{ width: "10%" }}>
                                    (ii)
                                </td>
                                <td style={{ width: "50%" }}>
                                    Is any mock drill or rehearsal programme
                                    conducted.
                                </td>
                                <td style={{ wdth: "20%" }}>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="B4"
                                            onChange={(e) => setDrill(true)}
                                            id="drillYes"
                                            value="yes"
                                            checked={drill}
                                            required
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="drillYes"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            onChange={(e) => setDrill(false)}
                                            checked={!drill}
                                            name="B4"
                                            id="drillNo"
                                            required
                                            value="no"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="drillNo"
                                        >
                                            No
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-end">
                    {(!props.aisheReport) && (
                        <button
                            type="button"
                            class="btn btn-outline-success px-4"
                            onClick={handelSave}
                        >
                            Save
                        </button>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}
