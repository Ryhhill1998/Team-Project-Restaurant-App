/*
 Description: Pending friend card component. This component is rendered in the FriendsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // Import dependencies
import FriendCard from "../FriendCard/FriendCard";
import {cancelFriendRequest} from "../../../../firebase/firebase";
import {selectUserId, setFriends} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import ConfirmationPopupView from "../../../../common/components/popups/views/ConfirmationPopupView/ConfirmationPopupView";
import {useState} from "react";

const PendingFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();
    // Get the 'userId' from the Redux store
    const userId = useSelector(selectUserId);
    // useState hooks
    const [confirmACancelPopupIsVisible, setConfirmCancelPopupIsVisible] = useState(false);

    // Function to handle the click on the cancel button
    const handleCancelClick = async () => {
        const updatedFriends = await cancelFriendRequest(userId, id);
        dispatch(setFriends(updatedFriends));
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="pending"
                handleCancelClick={() => setConfirmCancelPopupIsVisible(true)}
            />

            {confirmACancelPopupIsVisible && (
                <ConfirmationPopupView
                    message={`Cancel friend request to ${displayName}?`}
                    handleYesClick={handleCancelClick}
                    handleNoClick={() => setConfirmCancelPopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default PendingFriendCard;