/*
Description: Interaction button component used throughout as an icon button with no background and border
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./InteractionButtonView.css";

// fontawesome import
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// InteractionButtonView component
const InteractionButtonView = ({icon, solidIcon, isSolid, handleClick, style}) => {
    return (
        <button className="interaction-button" onClick={handleClick}>
            {/* Conditionally render the FontAwesomeIcon based on the isSolid prop */}
            {isSolid ? (
                <FontAwesomeIcon icon={solidIcon} className="icon" style={style}/>
            ) : (
                <FontAwesomeIcon icon={icon} className="icon" style={style}/>
            )}
        </button>
    );
};

export default InteractionButtonView;