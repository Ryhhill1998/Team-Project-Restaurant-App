/*
 Description: Friends reviews component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import "../../../PreviewReviews/PreviewReviews.css";
// Import dependencies
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getReviewsByUserId} from "../../../../firebase/firebase";
import {selectReview} from "../../../../features/reviews/reviewsSlice";
import RestaurantImageView from "../../../../common/components/RestaurantImageView/RestaurantImageView";
import StarRatingView from "../../../../common/components/StarRatingView/StarRatingView";
import {selectDisplayedFriend} from "../../../../features/user/userSlice";
import ProfileNavigationView from "../../../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import NoResultsView from "../../../../common/components/NoResultsView/NoResultsView";
import PreviewReviewCard from "../../../PreviewReviews/PreviewReviewCard/PreviewReviewCard";

const FriendsReviews = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'displayedFriend' from the Redux store
    const displayedFriend = useSelector(selectDisplayedFriend);
    // Declare state variables for the component
    const [friendReviews, setFriendReviews] = useState(null);
    
    // Fetch friends of the displayed friend, and get reviews
    useEffect(() => {
        if (!displayedFriend) return;

        getReviewsByUserId(displayedFriend.id)
            .then(reviews => setFriendReviews(reviews))
    }, [displayedFriend]);

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-container">
            {displayedFriend && (
                <>
                    <ProfileNavigationView
                        pageTitle={`${displayedFriend.displayName.split(" ")[0]}'s Reviews`}
                    />

                    <main className="reviews-container container">
                        {friendReviews && friendReviews.length === 0 ? (
                            <NoResultsView
                                mainText="No reviews found."
                                subText={`${displayedFriend.displayName} hasn't written any reviews yet.`}
                            />
                        ) : (
                            friendReviews && friendReviews.map(review => (
                                <PreviewReviewCard
                                    key={review.id}
                                    review={review}
                                    canDelete={false}
                                />
                            ))
                        )}
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsReviews;