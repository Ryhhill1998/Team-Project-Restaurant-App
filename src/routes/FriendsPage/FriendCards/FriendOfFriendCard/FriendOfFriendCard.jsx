/*
Description: Friend of friend card component. This component is a modified version of the FriendCard component.

Author: George Ball
Contact: georgeball14@hotmail.com
*/
// Import dependencies
import FriendCard from "../FriendCard/FriendCard";
import ConfirmationPopupView from "../../../../common/components/popups/views/ConfirmationPopupView/ConfirmationPopupView";
import {useState} from "react";
import {sendFriendRequestToUser} from "../../../../firebase/firebase";
import {selectUserId, setFriends} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";

const FriendOfFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();
    // Get the 'userId' from the Redux store
    const userId = useSelector(selectUserId);
    // useState hooks
    const [confirmAddPopupIsVisible, setConfirmAddPopupIsVisible] = useState(false);
    // Function to handle the click on the add button
    const handleAddClick = async () => {
        const updatedFriends = await sendFriendRequestToUser(userId, id);
        dispatch(setFriends(updatedFriends));
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="friendOfFriend"
                handleAddClick={() => setConfirmAddPopupIsVisible(true)}
            />

            {confirmAddPopupIsVisible && (
                <ConfirmationPopupView
                    message={`Add ${displayName} as a friend?`}
                    handleYesClick={handleAddClick}
                    handleNoClick={() => setConfirmAddPopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default FriendOfFriendCard;