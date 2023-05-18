/*
 Description: ReccomendButton component for the DetailsPage component. Handles a user recommending a restaurant.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
//stylesheet
import "./RecommendButton.css";
//Import necessary components, hooks, and functions
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faSolidHeart, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck, faHeart} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addRecommendation,
    removeRecommendation,
    selectRecommendations,
    selectUserId
} from "../../../../features/user/userSlice";
import {useEffect, useState} from "react";
import InteractionButtonView from "../../../../common/components/buttons/views/InteractionButtonView/InteractionButtonView";
import {addUserRecommendation, removeUserRecommendation} from "../../../../firebase/firebase";
import InteractionFeedbackView from "../../../../common/components/InteractionFeedbackView/InteractionFeedbackView";
import {
    addRecommendationInteraction,
    removeRecommendationInteraction
} from "../../../../features/interactions/interactionsSlice";

const RecommendButton = ({restaurant, style, updateInteractions}) => {
    // Declare state variables for the component
    const id = restaurant?.id;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get the 'userId' and 'recommendations' from the Redux store
    const userId = useSelector(selectUserId);
    const recommendations = useSelector(selectRecommendations);

    const [isRecommended, setIsRecommended] = useState(false);
    const [confirmationIsVisible, setConfirmationIsVisible] = useState(false);
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);
// useEffect hook to check if the user has already recommended the restaurant
    useEffect(() => {
        if (!restaurant || !recommendations) return;

        setIsRecommended(recommendations.some(recommendation => recommendation === id));
    }, [restaurant, recommendations]);
// OnClick handle functions
    const handleRecommendClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else if (!feedbackIsVisible) {
            setConfirmationIsVisible(true);
        }
    };

    const handleYesClick = async () => {
        setConfirmationIsVisible(false);
        console.log("yes clicked")

        if (isRecommended) {
            await removeUserRecommendation(userId, id);
            dispatch(removeRecommendation(id));
            dispatch(removeRecommendationInteraction());
            updateInteractions("recommendations", -1);
        } else {
            await addUserRecommendation(userId, restaurant);
            dispatch(addRecommendation(id));
            dispatch(addRecommendationInteraction());
        }

        setFeedbackIsVisible(true);
        setTimeout(() => setFeedbackIsVisible(false), 2000);
    };

    return (
        <>
            <InteractionButtonView
                icon={faHeart}
                solidIcon={faSolidHeart}
                isSolid={isRecommended}
                handleClick={handleRecommendClick}
                style={style}
            />
{/* Render confirmation popup*/}
            {confirmationIsVisible && (
                <div className="confirm-checkin-popup">
                    <p>
                        {isRecommended
                            ? "Remove recommendation for "
                            :
                            "Recommend "}
                        {restaurant?.name}?
                    </p>

                    <div className="buttons-container">
                        <button onClick={handleYesClick}>Yes</button>
                        <button onClick={() => setConfirmationIsVisible(false)}>No</button>
                    </div>
                </div>
            )}

            <InteractionFeedbackView
                isVisible={feedbackIsVisible}
                change={isRecommended ? "Added" : "Removed"}
                interaction={"recommendation"}
            />
        </>
    );
};

export default RecommendButton;