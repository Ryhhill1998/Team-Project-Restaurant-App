/*
Description: Profile Navigation component present on reviews page and all profile pages
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ProfileNavigationView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

// react router imports
import {useNavigate} from "react-router-dom";

// component imports
import SearchBoxView from "../SearchBoxView/SearchBoxView";

const ProfileNavigationView = ({
                                   pageTitle,
                                   style,
                                   button1,
                                   button2,
                                   lowerNav,
                                   toggleDisplayText,
                                   toggleHandler,
                                   count,
                                   searchFunctionality,
                                   button3,
                                   button4,
                                   handleSearchInputChange,
                                   hasMatches
                               }) => {

    // initialise navigate
    const navigate = useNavigate();

    return (
        <header className="profile-navigation" style={style}>
            <div className="container">
                <div className="upper-nav">
                    {/* show if search enabled */}
                    {searchFunctionality && (
                        <SearchBoxView handleInputChange={handleSearchInputChange} hasMatches={hasMatches}/>
                    )}

                    {/* hide if search enabled */}
                    {!searchFunctionality && (
                        <button onClick={button1?.handler || (() => navigate(-1))}>
                            <FontAwesomeIcon className="icon" icon={button1?.icon || faArrowLeft}/>
                            {button1?.text || "Back"}
                        </button>
                    )}

                    {/* hide if search enabled */}
                    {!searchFunctionality && <h1>{pageTitle}</h1>}

                    {/* hide if search enabled */}
                    {!button2 && (
                        <button style={{visibility: "hidden"}}>
                            <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                            Back
                        </button>
                    )}

                    {button2 && (
                        <button onClick={button2.handler}>
                            {button2.icon && <FontAwesomeIcon className="icon" icon={button2.icon}/>}
                            {button2.text}
                        </button>
                    )}
                </div>

                {/* hide if search enabled or no lower nav */}
                {!searchFunctionality && lowerNav && (
                    <div className="lower-nav">
                        {toggleDisplayText && (
                            <button className="toggle-display-button" onClick={toggleHandler}>
                                {toggleDisplayText}
                                <p className="count">{count}</p>
                            </button>
                        )}

                        {button3 && (
                            <div className="buttons-container">
                                <button onClick={button3.handler}>
                                    {button3.text}
                                    {button3.icon && <FontAwesomeIcon className="icon" icon={button3.icon}/>}
                                </button>

                                <button onClick={button4.handler}>
                                    {button4.text}
                                    {button4.icon && <FontAwesomeIcon className="icon" icon={button4.icon}/>}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default ProfileNavigationView;
