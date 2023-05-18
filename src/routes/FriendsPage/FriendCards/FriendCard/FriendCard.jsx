/*
 Description: Friend card component. This component is rendered in the FriendsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./FriendCard.css";
// Import dependencies
import FriendInfo from "../FriendInfo/FriendInfo";
import PrimaryButtonView from "../../../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";
import InversePrimaryButtonView from "../../../../common/components/buttons/views/InversePrimaryButtonView/InversePrimaryButtonView";

const FriendCard = ({
                        displayName,
                        iconColour,
                        profilePhotoUrl,
                        mutualFriends,
                        status,
                        button1Handler,
                        button1Text,
                        button2Handler,
                        button2Text,
                        handleCancelClick,
                        handleAddClick
                    }) => {

    return (
        <div className="friend-card">
            <FriendInfo
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status={status}
                handleCancelClick={handleCancelClick}
                handleAddClick={handleAddClick}
            />

            {(status === "confirmed" || status === "request") && (
                <div className="buttons-container">
                    <PrimaryButtonView handleClick={button1Handler} text={button1Text} size="small"/>
                    <InversePrimaryButtonView handleClick={button2Handler} text={button2Text} size="small"/>
                </div>
            )}
        </div>
    );
};

export default FriendCard;