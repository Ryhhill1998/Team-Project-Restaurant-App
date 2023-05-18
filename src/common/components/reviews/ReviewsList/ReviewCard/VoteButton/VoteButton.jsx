/*
Description: Vote button - present twice on each review card (one rotated 180 degrees as downvote)
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// fontawesome imports
import {faCircleUp as faSolidCircleUp} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";

// component imports
import InteractionButtonView from "../../../../buttons/views/InteractionButtonView/InteractionButtonView";

const VoteButton = ({isSolid, handleClick}) => {
    return (
        <InteractionButtonView
            icon={faCircleUp}
            solidIcon={faSolidCircleUp}
            isSolid={isSolid}
            handleClick={handleClick}
        />
    );
};

export default VoteButton;