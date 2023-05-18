/*
 Description: Friend contributions button component. This component is rendered in the FriendsProfile component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import dependencies
import "../../../ProfilePage/ContributionsButton/ContributionsButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FriendContributionsButton = ({ userId, route, icon, name }) => {
    const parsedRoute = route.replace(":userId", userId);

    return (
        <Link to={parsedRoute}>
            <FontAwesomeIcon className="icon" icon={icon} />
            {name}
        </Link>
    );
};

export default FriendContributionsButton;