/*
 Description: Confirmed friend card component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import dependencies
import FriendCard from "../FriendCard/FriendCard";
import {deleteFriend, getUserFromUserId} from "../../../../firebase/firebase";
import {removeFriend, selectUserId, setDisplayedFriend} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ConfirmationPopupView from "../../../../common/components/popups/views/ConfirmationPopupView/ConfirmationPopupView";

const ConfirmedFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    // Get the 'userId' from the Redux store
    const userId = useSelector(selectUserId);
    // useState hooks
    const [confirmRemovePopupIsVisible, setConfirmRemovePopupIsVisible] = useState(false);

    // Function to handle the click on the profile button
    const handleProfileClick = async () => {
        const friendData = await getUserFromUserId(id);
        dispatch(setDisplayedFriend(friendData))
        navigate(`/view-profile/${id}`);
    };

    // Function to handle the click on the remove button
    const handleRemoveFriend = async () => {
        console.log("show remove friend confirmation popup");
        await deleteFriend(userId, id);
        dispatch(removeFriend(id));
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="confirmed"
                button1Handler={handleProfileClick}
                button1Text="Profile"
                button2Handler={() => setConfirmRemovePopupIsVisible(true)}
                button2Text="Remove"
            />

            {confirmRemovePopupIsVisible && (
                <ConfirmationPopupView
                    message={`Remove ${displayName} as a friend?`}
                    handleYesClick={handleRemoveFriend}
                    handleNoClick={() => setConfirmRemovePopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default ConfirmedFriendCard;