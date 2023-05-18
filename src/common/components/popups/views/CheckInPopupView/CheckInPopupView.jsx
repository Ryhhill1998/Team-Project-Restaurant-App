/*
Description: Check in popup component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./CheckInPopupView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as solidCircleCheck, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";

// react imports
import {useEffect, useState} from "react";

// component imports
import UserIconView from "../../../UserIconView/UserIconView";
import InteractionButtonView from "../../../buttons/views/InteractionButtonView/InteractionButtonView";
import PrimaryButtonView from "../../../buttons/views/PrimaryButtonView/PrimaryButtonView";
import InversePrimaryButtonView from "../../../buttons/views/InversePrimaryButtonView/InversePrimaryButtonView";
import FormFieldView from "../../../FormFieldView/FormFieldView";
import OverlayView from "../../../OverlayView/OverlayView";

const CheckInPopupView = ({
                              restaurant,
                              date,
                              friends,
                              friendsSelected,
                              closePopup,
                              confirmCheckIn,
                              feedback,
                              resetFeedback
                          }) => {

    // state variables
    const [checkInDate, setCheckInDate] = useState((date ? new Date(date) : new Date())
        .toISOString()
        .split("T")[0]);
    const [selectFriendsIsVisible, setSelectFriendIsVisible] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [addFriendsButtonText, setAddFriendsButtonText] = useState("Add friends");

    // if friendSelected prop not null set selected friends to input value
    useEffect(() => {
        if (!friendsSelected) return;

        setSelectedFriends(friendsSelected.map(({id}) => id));
    }, [friendsSelected]);

    // handler function for when date input changes
    const handleDateChange = ({target}) => {
        setCheckInDate(target.value);
        resetFeedback();
    };

    // handler function for add friends button clicked
    const handleAddFriendsClick = () => {
        if (addFriendsButtonText === "Add friends") {
            setAddFriendsButtonText("Clear");
        } else {
            setSelectedFriends([]);
            setAddFriendsButtonText("Add friends");
        }

        setSelectFriendIsVisible(selectFriendsIsVisible => !selectFriendsIsVisible);
    };

    // handler function for friend card clicked
    const handleFriendCardClick = (id) => {
        setSelectedFriends(selectedFriends => {
            if (selectedFriends.includes(id)) {
                return selectedFriends.filter(friendId => friendId !== id);
            } else {
                return [...selectedFriends, id];
            }
        });
    };

    return (
        <>
            <div className="confirm-checkin-popup">
                {/* conditionally render feedback if present */}
                {feedback && <p className="feedback">{feedback}</p>}

                <div className="date-container">
                    <FormFieldView
                        label="Check in date"
                        name="visitDate"
                        type="date"
                        value={checkInDate}
                        onChangeHandler={handleDateChange}
                    />
                </div>

                {/* conditionally render add friends button if user has friends */}
                {friends?.length > 0 && (
                    <button className="add-friend-button" onClick={handleAddFriendsClick}>
                        {addFriendsButtonText}
                        <FontAwesomeIcon icon={selectFriendsIsVisible ? faXmark : faPlus} className="icon"/>
                    </button>
                )}

                {/* show select friends dropdown once user clicks on add friends button */}
                {selectFriendsIsVisible && (
                    <div className="select-friends">
                        {friends.map(({id, displayName, profilePhotoUrl}) => (
                            <div key={id} className="select-friend-card" onClick={() => handleFriendCardClick(id)}>
                                <div>
                                    <UserIconView
                                        size="xSmall"
                                        imageUrl={profilePhotoUrl}
                                    />

                                    <p>{displayName}</p>
                                </div>

                                <InteractionButtonView
                                    icon={faCircleCheck}
                                    solidIcon={solidCircleCheck}
                                    isSolid={selectedFriends.includes(id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* show selected friends count if user has selected at least one friend */}
                {selectedFriends.length > 0 && (
                    <p className="friends-selected-count">
                        {selectedFriends.length} friend{selectedFriends.length > 1 ? "s" : ""} selected
                    </p>
                )}

                <p><span>Check in</span> at {restaurant.name}?</p>

                <div className="buttons-container">
                    <PrimaryButtonView
                        text="Yes"
                        handleClick={() => confirmCheckIn(+new Date(checkInDate), selectedFriends)}
                    />

                    <InversePrimaryButtonView text="No" handleClick={closePopup}/>
                </div>
            </div>

            <OverlayView/>
        </>
    );
};

export default CheckInPopupView;