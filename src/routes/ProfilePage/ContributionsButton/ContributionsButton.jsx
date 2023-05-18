/*
 Description: Contributions button component. This component is rendered in the ProfilePage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./ContributionsButton.css";
// Import dependencies
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const ContributionsButton = ({route, icon, name}) => {
    return (
        <Link to={route} className="contributions-button">
            <FontAwesomeIcon className="icon" icon={icon}/>
            {name}
        </Link>
    );
};

export default ContributionsButton;