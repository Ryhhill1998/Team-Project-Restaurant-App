/*
Description: Review card - used in reviews list
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ReviewCard.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faImages} from "@fortawesome/free-regular-svg-icons";

// react imports
import {useState} from "react";

// firebase imports
import {addUserReactionToReview, deleteRestaurantReview} from "../../../../../firebase/firebase";

// redux imports
import {deleteReview, selectReviews, updateReview} from "../../../../../features/reviews/reviewsSlice";
import {useDispatch, useSelector} from "react-redux";


// component imports
import UserIconView from "../../../UserIconView/UserIconView";
import VoteButton from "./VoteButton/VoteButton";
import InteractionButtonView from "../../../buttons/views/InteractionButtonView/InteractionButtonView";
import ConfirmationPopupView from "../../../popups/views/ConfirmationPopupView/ConfirmationPopupView";
import StarRatingView from "../../../StarRatingView/StarRatingView";

const ReviewCard = ({review, userId, handleEditClick}) => {

    const {
        id,
        profilePhotoUrl,
        displayName,
        numberOfReviews,
        authorId,
        rating,
        visitDate,
        title,
        content,
        reactions,
        photoUrl
    } = review;

    // initialise dispatch
    const dispatch = useDispatch();

    // select reviews from redux store
    const reviews = useSelector(selectReviews);

    // state variables
    const [showReviewPhotos, setShowReviewPhotos] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [confirmationPopupIsVisible, setConfirmationPopupIsVisible] = useState(false);

    // handler for when photo is clicked
    const handlePhotoClick = (photoUrl) => {
        setSelectedPhoto(photoUrl);
    };

    // handler to close full screen mode
    const closeFullScreenPhoto = () => {
        setSelectedPhoto("");
    };

    // handler for when vote button clicked
    const handleVoteClick = async (reviewId, voteType) => {
        if (!reviews || !userId) return;

        const reactions = await addUserReactionToReview(userId, reviewId, voteType);

        const updatedReview = {...reviews.find(review => review.id === reviewId)};
        updatedReview.reactions = reactions;
        dispatch(updateReview({reviewId, updatedReview}));
    };

    // handler for when yes clicked on popup
    const handleYesClick = async () => {
        await deleteRestaurantReview(userId, id);
        dispatch(deleteReview(id));
        setConfirmationPopupIsVisible(false);
    };

    return (
        <div id={"review-" + id} className="review-card">
            {/* show confirm delete popup conditionally */}
            {confirmationPopupIsVisible && (
                <ConfirmationPopupView
                    message="Delete this review?"
                    handleYesClick={handleYesClick}
                    handleNoClick={() => setConfirmationPopupIsVisible(false)}
                />
            )}

            <div className="review-header">
                <div className="author-details">
                    <UserIconView
                        size="medium"
                        imageUrl={profilePhotoUrl}
                    />

                    <div>
                        <p className="display-name">{displayName}</p>
                        {numberOfReviews && (
                            <p>{numberOfReviews} review{numberOfReviews > 1 ? "s" : ""}</p>
                        )}
                    </div>
                </div>

                {/* show edit and delete buttons only if user is author */}
                {authorId === userId && (
                    <div className="buttons-container">
                        <InteractionButtonView icon={faPen} handleClick={() => handleEditClick(id)}/>

                        <InteractionButtonView
                            icon={faTrash}
                            handleClick={() => setConfirmationPopupIsVisible(true)}
                        />
                    </div>
                )}
            </div>

            <div className="review-content">
                <div className="rating-and-date-container">
                    <StarRatingView rating={rating}/>

                    <p>
                        <strong>Visit date: </strong>
                        {new Date(visitDate).toLocaleDateString()}
                    </p>
                </div>

                <h3>{title}</h3>

                <p>{content}</p>

                <div className="buttons-container">
                    <VoteButton
                        isSolid={reactions.upVotes.includes(userId)}
                        handleClick={() => handleVoteClick(id, "upVotes")}
                    />

                    <p>{+(reactions.upVotes.length - reactions.downVotes.length)}</p>

                    <VoteButton
                        isSolid={reactions.downVotes.includes(userId)}
                        handleClick={() => handleVoteClick(id, "downVotes")}
                    />

                    {photoUrl && (
                        <button className="show-photos-button" onClick={() => setShowReviewPhotos(!showReviewPhotos)}>
                            <FontAwesomeIcon icon={faImages} className="icon"/>
                        </button>
                    )}
                </div>

                {/* show review photos conditionally if photos and if photos button clicked */}
                {showReviewPhotos && (
                    <div className={`review-photos${showReviewPhotos ? " visible" : ""}`}>
                        <div onClick={() => handlePhotoClick(photoUrl)}>
                            <img className="user-review-photo" src={photoUrl} alt="Review Photo" loading="lazy"/>
                        </div>
                    </div>
                )}

                {/* full screen photo if photo selected */}
                {selectedPhoto && (
                    <div className="full-screen-photo" onClick={closeFullScreenPhoto}>
                        <img src={selectedPhoto} alt="Full screen review photo"/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;