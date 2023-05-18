/*
 Description: Friend info component. This component is rendered in the FriendCard component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import "./FriendInfo.css";
// Import dependencies
import UserIconView from "../../../../common/components/UserIconView/UserIconView";
import SecondaryButtonView from "../../../../common/components/buttons/views/SecondaryButtonView/SecondaryButtonView";
import PrimaryButtonView from "../../../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";

const FriendInfo = ({
                        displayName,
                        profilePhotoUrl,
                        mutualFriends,
                        status,
                        handleCancelClick,
                        handleAddClick
                    }) => {

    return (
        <div className="friend-info">
            <UserIconView
                size="larger"
                imageUrl={profilePhotoUrl}
            />

            <div>
                <div className="info-container">
                    <h3>{displayName}</h3>

                    <p>{mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}</p>
                </div>

                {status === "pending" && (
                    <SecondaryButtonView
                        handleClick={handleCancelClick}
                        text="Cancel request"
                        size="small"
                    />
                )}

                {status === "friendOfFriend" && (
                    <PrimaryButtonView
                        handleClick={handleAddClick}
                        text="Add friend"
                        size="small"
                    />
                )}
            </div>
        </div>
    );
};

export default FriendInfo;