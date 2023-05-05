import React from "react";

export default function Infrastructure(props) {
    const [isPlayground, setIsPlayground] = React.useState(false);
    const [isAuditorium, setIsAuditorium] = React.useState(false);
    const [isTheatre, setIsTheatre] = React.useState(false);
    const [isLibrary, setIsLibrary] = React.useState(false);
    const [numberOfBooks, setNumberOfBooks] = React.useState(0);
    const [numberOfJournals, setNumberOfJournals] = React.useState(0);
    const [isLaboratory, setIsLaboratory] = React.useState(false);
    const [isConferenceHall, setIsConferenceHall] = React.useState(false);
    const [isHealthCenter, setIsHealthCenter] = React.useState(false);
    const [isGymnasium, setIsGymnasium] = React.useState(false);
    const [isIndoorStadium, setIsIndoorStadium] = React.useState(false);
    const [isCommonRoom, setIsCommonRoom] = React.useState(false);
    const [isComputerCenter, setIsComputerCenter] = React.useState(false);
    const [isCafeteria, setIsCafeteria] = React.useState(false);
    const [isGuestHouse, setIsGuestHouse] = React.useState(false);
    const [isseparateRoomForGirls, setIsseparateRoomForGirls] = React.useState(false);
    const [isSolarPowerGeneration, setIsSolarPowerGeneration] = React.useState(false);
    const [isConnectivityNKN, setIsConnectivityNKN] = React.useState(false);
    const [isConnectivityNMEICT, setIsConnectivityNMEICT] = React.useState(false);
    const [isCampusIsDifferntlyAbledFriendly, setIsCampusIsDifferntlyAbledFriendly] = React.useState(false);
    const [isSeparateToiletForDisabledFemale,setIsSeparateToiletForDisabledFemale] = React.useState(false);
    const [isRampAttachedToClassrooms, setIsRampAttachedToClassrooms] =React.useState(false);
    const [isgrievanceRedressalMechanism, setIsgrievanceRedressalMechanism] =React.useState(false);
    const [isVigilanceCell, setIsVigilanceCell] =React.useState(false);
    const [isEqualOpportunityCell, setIsEqualOpportunityCell] =React.useState(false);
    const [isSexualHarassmentCell, setIsSexualHarassmentCell] =React.useState(false);
    const [isCounselorsforStudent, setIsCounselorsforStudent] =React.useState(false);
    const [isClinic, setIsClinic] =React.useState(false);
    const [isSeparateToiletForGirl, setIsSeparateToiletForGirl] =React.useState(false);
    const [isSkillDevelopmentCell, setIsSkillDevelopmentCell] =React.useState(false);
    const [isSelfDefenceClassesForFemales, setIsSelfDefenceClassesForFemales] =React.useState(false);

    return (
        <div>
            <div className="row  comy-4 px-5 py-4 rounded shadow bg-body-tertiary">
              <h3 className="text-center mb-3">Infrastructure Related Data</h3>
              <hr />
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
                                    <td>
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
                                            aria-label="..."
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td colSpan={2}>Theatre</td>
                                    <td>
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id=""
                                            value=""
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
                                            setIsAuditorium(!isCommonRoom);
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
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col" >
                  <div className={
                            !props.aisheReport
                                ? "container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"
                                : ""
                        }>
                    <table className="table table-bordered table-striped text-center table-hover">
                        <tbody>
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
                                            Separate toilet for disabled female
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
                                                // checked={isSeparateToiletForDisabledFemale}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>(ii)</td>
                                        <td>
                                            Ramp attached to classroom / library
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
                                                // checked={isRampAttachedToClassrooms}
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
                                        checked={isgrievanceRedressalMechanism}
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
                                <td colSpan={2}>Sexual harassment / anti-ragging cell</td>
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
                                        setIsClinic(
                                            !isClinic
                                        );
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
                                <td colSpan={2}>Separate toilet for girls</td>
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
                                <td colSpan={2}>Skill development centre</td>
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
                                <td colSpan={2}>Self-defence class for females</td>
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
                                        checked={isSelfDefenceClassesForFemales}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <hr className="mt-5"/>
                <div className={
                  !props.aisheReport
                                ? "container comy-4 px-5 py-4 rounded shadow bg-body-tertiary"
                                : ""
                        }>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="" style={{width:"10%"}}>B.</td>
                      <td style={{width:"50%"}}>Whether the University / Institution have Disaster Management facilities.</td>
                      <td style={{wdth:"20%"}}>
                      
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="B1"
                                id=""
                                value="yes"
                                // onChange={(e) => setGender(e.target.value)}
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
                                name="B1"
                                id=""
                                // onChange={(e) => setGender(e.target.value)}
                                required
                                value="no"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="no"
                            >
                                No
                            </label>
                        </div>
                    
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="" style={{width:"10%"}}>(i)</td>
                      <td style={{width:"50%"}}>Whether capacity Building and Training/awareness programmes conducted.</td>
                      <td style={{wdth:"20%"}}>
                      
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="B2"
                                id=""
                                value="yes"
                                // onChange={(e) => setGender(e.target.value)}
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
                                name="B2"
                                id=""
                                // onChange={(e) => setGender(e.target.value)}
                                required
                                value="no"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="no"
                            >
                                No
                            </label>
                        </div>
                    
                      </td>
                    </tr>
                    <tr>
                      <td className="" style={{width:"10%"}}>(ii)</td>
                      <td style={{width:"50%"}}>Whether vulnerability assessment checks were made during the year.</td>
                      <td style={{wdth:"20%"}}>
                      
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="B3"
                                id=""
                                value="yes"
                                // onChange={(e) => setGender(e.target.value)}
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
                                name="B3"
                                id=""
                                // onChange={(e) => setGender(e.target.value)}
                                required
                                value="no"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="no"
                            >
                                No
                            </label>
                        </div>
                    
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="" style={{width:"10%"}}>(ii)</td>
                      <td style={{width:"50%"}}>Is any mock drill or rehearsal programme conducted.</td>
                      <td style={{wdth:"20%"}}>
                      
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="B4"
                                id=""
                                value="yes"
                                // onChange={(e) => setGender(e.target.value)}
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
                                name="B4"
                                id=""
                                // onChange={(e) => setGender(e.target.value)}
                                required
                                value="no"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="no"
                            >
                                No
                            </label>
                        </div>
                    
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
                          </div>
  

            </div>
            
        </div>
    );
}
