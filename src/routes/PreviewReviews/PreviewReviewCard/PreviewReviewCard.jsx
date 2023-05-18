/*
 Description: Preview review card component. This component is rendered in the PreviewReviews component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./PreviewReviewCard.css";
// Import dependencies
import RestaurantImageView from "../../../common/components/RestaurantImageView/RestaurantImageView";
import StarRatingView from "../../../common/components/StarRatingView/StarRatingView";
import {faTrash, faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {deleteRestaurantReview} from "../../../firebase/firebase";
import {deleteReview, selectReview} from "../../../features/reviews/reviewsSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import InteractionButtonView from "../../../common/components/buttons/views/InteractionButtonView/InteractionButtonView";
import ConfirmationPopupView from "../../../common/components/popups/views/ConfirmationPopupView/ConfirmationPopupView";

const PreviewReviewCard = ({review, canDelete}) => {
    // Destructure props
    const {id, rating, title, content, restaurantId, restaurantName, photoUrl} = review;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'userId' from the Redux store
    const userId = useSelector(selectUserId);
    // Declare state variables for the component
    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    // Delete review
    const handleDelete = async () => {
        await deleteRestaurantReview(userId, id);
        dispatch(deleteReview(id));
        setConfirmDeleteReviewId(null);
    };

    // Expand review
    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-review-card">
            {confirmDeleteReviewId === id && (
                <ConfirmationPopupView
                    message="Delete this review?"
                    handleYesClick={handleDelete}
                    handleNoClick={() => setConfirmDeleteReviewId(null)}
                />
            )}

            <div className="container-lhs">
                <RestaurantImageView photoUrl={photoUrl} name={restaurantName}/>

                <div className="preview">
                    <h3 style={{margin: 0}}>{title}</h3>

                    <StarRatingView rating={rating}/>

                    <p>{content}</p>
                </div>
            </div>

            <div className="container-rhs">
                <InteractionButtonView
                    icon={faUpRightAndDownLeftFromCenter}
                    handleClick={() => handleExpandClick(id, restaurantId)}
                />

                {canDelete && (
                    <InteractionButtonView
                        icon={faTrash}
                        handleClick={() => setConfirmDeleteReviewId(id)}
                    />
                )}

                {!canDelete && (
                    <InteractionButtonView
                        icon={faUpRightAndDownLeftFromCenter}
                        handleClick={() => handleExpandClick(id, restaurantId)}
                        style={{visibility: "hidden"}}
                    />
                )}
            </div>
        </div>
    );
};

export default PreviewReviewCard;