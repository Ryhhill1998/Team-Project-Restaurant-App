/*
 Description: DetailsCard component rendered inside the DetailsPopup component
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// stylesheet
import "./DetailsCard.css";
// Import required dependencies and components
import UserIconView from "../../../../common/components/UserIconView/UserIconView";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCamera, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import InteractionButtonView from "../../../../common/components/buttons/views/InteractionButtonView/InteractionButtonView";
import CheckInPopupView from "../../../../common/components/popups/views/CheckInPopupView/CheckInPopupView";
import {useDispatch, useSelector} from "react-redux";
import {selectFriends, selectProfilePhotoUrl} from "../../../../features/user/userSlice";
import {removeRestaurantCheckIn, updateCheckInDoc} from "../../../../firebase/firebase";
import {removeCheckIn, setSelectedCheckIn, updateCheckIn} from "../../../../features/checkIns/checkInsSlice";
import ConfirmationPopupView from "../../../../common/components/popups/views/ConfirmationPopupView/ConfirmationPopupView";
import CollageImageView from "../../../../common/components/CustomCollageView/CollageImageView/CollageImageView";

// Define the 'DetailsCard' component
const DetailsCard = ({
                         checkIn,
                         isFriendsPage,
                         showPhotos,
                         closePopup,
                         expandPopup
                     }) => {

    const dispatch = useDispatch();
    // Get the 'allFriends' and 'profilePhotoUrl' from the Redux store
    const allFriends = useSelector(selectFriends);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);
    
    // Declare state variables for the component
    const [editPopupIsVisible, setEditPopupIsVisible] = useState(false);
    const [editPopupFeedback, setEditPopupFeedback] = useState("");
    const [confirmDeletePopupIsVisible, setConfirmDeletePopupIsVisible] = useState(false);
    
    // Format check-in date
    const formattedDate = new Date(checkIn.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // OnClick event handlers for the component
    const handleAddPhotoClick = () => {
        dispatch(setSelectedCheckIn(checkIn))
        showPhotos();
    };

    const handleEditClick = () => {
        expandPopup();
        setEditPopupIsVisible(true);
    };
    // Confirm edit check-in and update check-in information
    const confirmEditCheckIn = async (date, friends) => {
        if (+new Date() < +new Date(date)) {
            setEditPopupFeedback("You can only check in today or earlier!");
            return;
        }

        const photoIds = checkIn.photoData.map(({id}) => id);

        const updatedCheckIn = await updateCheckInDoc(checkIn.id, date, checkIn.userData.id, friends, photoIds);
        dispatch(updateCheckIn(updatedCheckIn));

        setEditPopupIsVisible(false);
    };

    const handleDeleteClick = () => {
        expandPopup();
        setConfirmDeletePopupIsVisible(true);
    };
    
    // Confirm check-in deletion and remove check-in
    const confirmDelete = async () => {
        const checkInId = checkIn.id;

        await removeRestaurantCheckIn(checkIn.id);

        dispatch(removeCheckIn(checkInId));
    };

    return (
        <div className="check-ins-card">
            {/* Render CheckInPopupView component for editing check-ins */}
            {editPopupIsVisible && (
                <CheckInPopupView
                    restaurant={checkIn.restaurant}
                    date={checkIn.date}
                    closePopup={() => setEditPopupIsVisible(false)}
                    friends={allFriends}
                    friendsSelected={checkIn.friendData}
                    confirmCheckIn={confirmEditCheckIn}
                    feedback={editPopupFeedback}
                    resetFeedback={() => setEditPopupFeedback("")}
                />
            )}
            {/* Render ConfirmationPopupView component for confirming check-in deletion */}
            {confirmDeletePopupIsVisible && (
                <ConfirmationPopupView
                    message="Delete this check-in?"
                    handleYesClick={confirmDelete}
                    handleNoClick={() => setConfirmDeletePopupIsVisible(false)}
                />
            )}

            <div className="card-header">
                <h3>{checkIn.restaurant.name}</h3>
                {/* Render edit and delete buttons if not on friends page */}
                {!isFriendsPage && (
                    <div className="buttons-container">
                        <InteractionButtonView icon={faPen} handleClick={handleEditClick}/>

                        <InteractionButtonView icon={faTrash} handleClick={handleDeleteClick}/>
                    </div>
                )}
            </div>

            <div className="visit-date">
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon"/>
                <span>{formattedDate}</span>
            </div>

            <div className="user-icons">
                <UserIconView
                    size="small"
                    imageUrl={profilePhotoUrl}
                />

                {checkIn.friendData.map(user => (
                    <UserIconView
                        key={user.id + checkIn.id}
                        size="small"
                        imageUrl={user.profilePhotoUrl}
                    />
                ))}
            </div>

            <div className="photo-previews-container">
                {[...checkIn.photoData].slice(0, 2).map(({id, url, alt}) => (
                    <div key={id} className="image-preview-container">
                        <CollageImageView url={url} alt={alt}/>
                    </div>
                ))}

                <button className="add-photo-button" onClick={handleAddPhotoClick}>
                    <FontAwesomeIcon className="icon" icon={faCamera}/>
                </button>
            </div>
        </div>
    );
};

export default DetailsCard;
