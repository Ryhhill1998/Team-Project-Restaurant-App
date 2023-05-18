/*
Description: Sort by button component which is on sort by options component on filters dropdown
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./SortButtonView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonWalking, faStar, faSterlingSign} from "@fortawesome/free-solid-svg-icons";

// icons map for each filter declared outside component so only declared once
const iconsMap = {
    Distance: faPersonWalking,
    Rating: faStar,
    Price: faSterlingSign
};

// SortButtonView component
const SortButtonView = ({name, selected, handleClick}) => {

    // initialise icon depending on name passed in as a prop
    const icon = iconsMap[name];

    return (
        <button
            className={`sort-button ${selected ? "selected" : ""}`}
            onClick={() => handleClick(name)}
        >
            <FontAwesomeIcon icon={icon} className="icon"/>
            {name}
        </button>
    );
};

export default SortButtonView;