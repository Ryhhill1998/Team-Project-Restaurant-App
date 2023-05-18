/*
 Description: This file contains the Interaction component, which is a sub-component of the InteractionsView component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./Interaction.css";
// Imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Interaction = ({count, icon}) => {
    return (
        <div className="interaction-container">
            <FontAwesomeIcon icon={icon} className="icon"/>
            {count || "0"}
        </div>
    );
};

export default Interaction;