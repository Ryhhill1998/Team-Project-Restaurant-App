/*
 Description: This file contains the CheckInButton component, which is a sub-component of the ImageAndInfoView component.
 It handles the check-in functionality for the restaurant.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

//stylesheet
import "./CheckInButton.css";
// Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as faSolidCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { addRestaurantCheckIn, checkInExists, getLastCheckInToRestaurantByUserId } from "../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFriends, selectUserId } from "../../../../features/user/userSlice";
import InteractionFeedbackView from "../../../../common/components/InteractionFeedbackView/InteractionFeedbackView";
import CheckInPopupView from "../../../../common/components/popups/views/CheckInPopupView/CheckInPopupView";
import { addCheckInInteraction } from "../../../../features/interactions/interactionsSlice";

const CheckInButton = ({ restaurant }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'userId' and 'friends' from the Redux store
    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);
    // useState hooks
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInPopupIsVisible, setCheckInPopupIsVisible] = useState(false);
    const [checkInFeedback, setCheckInFeedback] = useState("");
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);
    // useEffect hook to check if the user has already checked in to the restaurant
    const getLastCheckInDate = async () => {
        const lastCheckIn = await getLastCheckInToRestaurantByUserId(userId, restaurant.id);

        return lastCheckIn ? new Date(lastCheckIn.date).toLocaleDateString() : null;
    };
    // Updates the checkedIn state
    const updateCheckedIn = () => {
        const today = new Date().toLocaleDateString();

        getLastCheckInDate()
            .then(date => {
                if (date) {
                    setCheckedIn(today === date);
                } else {
                    setCheckedIn(false);
                }
            });
    };

    useEffect(() => {
        if (!restaurant || !userId) return;

        updateCheckedIn();
    }, [restaurant, userId]);
    // OnClick handle functions
    const handleClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else if (!feedbackIsVisible) {
            setCheckInPopupIsVisible(true);
        }
    };

    const confirmCheckIn = async (date, friends) => {
        if (+new Date() < +new Date(date)) {
            setCheckInFeedback("You can only check in today or earlier!");
            return;
        }

        const checkedInOnDate = await checkInExists(userId, date, restaurant.id);

        if (checkedInOnDate) {
            setCheckInFeedback("You already checked in on this date!");
            return;
        }

        await addRestaurantCheckIn(userId, date, restaurant, friends);
        updateCheckedIn();

        dispatch(addCheckInInteraction());

        setFeedbackIsVisible(true);

        setTimeout(() => setFeedbackIsVisible(false), 2000);

        closeCheckInPopup();
    };

    const closeCheckInPopup = () => {
        setCheckInPopupIsVisible(false);
    };

    return (
        <>
            <button className="check-in-button" onClick={handleClick}>
                {checkedIn ? "Checked in" : "Check in"}
                <FontAwesomeIcon icon={checkedIn ? faSolidCircleCheck : faCircleCheck} className="icon" />
            </button>

            {checkInPopupIsVisible && (
                <CheckInPopupView
                    restaurant={restaurant}
                    feedback={checkInFeedback}
                    confirmCheckIn={confirmCheckIn}
                    friends={friends}
                    closePopup={closeCheckInPopup}
                    resetFeedback={() => setCheckInFeedback("")}
                />
            )}

            <InteractionFeedbackView isVisible={feedbackIsVisible} change="Saved" interaction="check-in" />
        </>
    );
};

export default CheckInButton;