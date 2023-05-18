/*
Description: Location button component present on lower nav
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./LocationButtonView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faXmark} from "@fortawesome/free-solid-svg-icons";

// redux imports
import {useSelector} from "react-redux";
import {selectLocationDescription} from "../../../../../../../../features/location/locationSlice";

// LocationButtonView component
const LocationButtonView = ({handleClick, optionsOpen}) => {

    // redux selector - get description of user's current location
    const locationDescription = useSelector(selectLocationDescription);

    return (
        <button className="location-button" onClick={handleClick}>
            <FontAwesomeIcon className="icon" icon={optionsOpen ? faXmark : faLocationDot}/>

            <span>{optionsOpen ? "Close options" : (locationDescription || "Newcastle Upon Tyne")}</span>
        </button>
    );
};

export default LocationButtonView;