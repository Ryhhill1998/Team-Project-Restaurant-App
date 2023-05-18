/*
Description: Interaction feedback component to appear when a user checks ins, bookmarks or recommends a restaurant
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./InteractionFeedbackView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

// InteractionFeedbackView component
const InteractionFeedbackView = ({isVisible, change, interaction}) => {

    return (
        <div className="interaction-feedback" style={{opacity: isVisible ? 1 : 0}}>
            {change} {interaction}

            {/* show a different icon depending on change */}

            <FontAwesomeIcon
                icon={change === "Saved" ? faCircleCheck : faXmark}
                className="feedback-icon"
            />
        </div>
    );
};

export default InteractionFeedbackView;