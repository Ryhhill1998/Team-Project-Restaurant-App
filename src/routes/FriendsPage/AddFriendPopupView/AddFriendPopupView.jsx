/*
 Description: Add friend popup view component. 
 Contact: ryan.henzell-hill@outlook.com
 */

 // Import dependencies
import FormFieldView from "../../../common/components/FormFieldView/FormFieldView";
import PrimaryButtonView from "../../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";
import SecondaryButtonView from "../../../common/components/buttons/views/SecondaryButtonView/SecondaryButtonView";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFriendRequests, selectFriends, selectUserId, setFriends} from "../../../features/user/userSlice";
import {getUserFromUserId, sendFriendRequestToUser} from "../../../firebase/firebase";

const AddFriendPopupView = ({closePopup}) => {

    const dispatch = useDispatch();
    // Get the 'userId', 'friends' and 'friendRequests' from the Redux store
    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);
    const friendRequests = useSelector(selectFriendRequests);
    // useState hooks
    const [addFriendId, setAddFriendId] = useState("");
    const [feedback, setFeedback] = useState("");
    const [foundUser, setFoundUser] = useState(null);

    // Function to handle the click of the Yes button
    const handleYesClick = async () => {
        const updatedFriends = await sendFriendRequestToUser(userId, addFriendId);
        dispatch(setFriends(updatedFriends));
        setAddFriendId("");
        closePopup();
    };

    // Function to handle the click of the No button
    const handleNoClick = () => {
        setAddFriendId("");
        setFeedback("");
        setFoundUser(null);
        closePopup();
    };

    // Function to handle the click of the Find User button
    const handleFindUserClick = async (addFriendId) => {
        if (!addFriendId) {
            setFeedback("Please enter a user ID");
        } else if (addFriendId === userId) {
            setFeedback("You cannot add yourself as a friend");
        } else if (friends.some(friend => friend.id === addFriendId)) {
            setFeedback("You are already friends with this user");
        } else if (friendRequests.includes(addFriendId)) {
            setFeedback("You are already have a friend request from this user");
        } else {
            const user = await getUserFromUserId(addFriendId);

            if (!user) {
                setFeedback("No user was found with that ID");
            } else if (user?.id !== userId) {
                setFoundUser(user);
            }
        }
    };

    return (
        <div className="confirm-checkin-popup">
            {feedback && (
                <p className="feedback">{feedback}</p>
            )}

            <div className="date-container">
                <FormFieldView
                    label="Friend ID"
                    name="visitDate"
                    type="text"
                    value={addFriendId}
                    onChangeHandler={({target}) => setAddFriendId(target.value)}
                />
            </div>

            {foundUser && (
                <p>Send friend request to <span>{foundUser.displayName}</span>?</p>
            )}

            {!foundUser && (
                <div className="buttons-container">
                    <PrimaryButtonView handleClick={() => handleFindUserClick(addFriendId)} text="Find user"/>
                    <SecondaryButtonView handleClick={handleNoClick} text="Cancel"/>
                </div>
            )}

            {foundUser && (
                <div className="buttons-container">
                    <PrimaryButtonView handleClick={handleYesClick} text="Yes"/>
                    <SecondaryButtonView handleClick={handleNoClick} text="No"/>
                </div>
            )}
        </div>
    );
};

export default AddFriendPopupView;