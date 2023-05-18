/*
 Description: Preview reviews page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./PreviewReviews.css";
// Import dependencies
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {deleteRestaurantReview, getReviewsByUserId} from "../../firebase/firebase";
import {deleteReview, selectReview, selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import NoResultsView from "../../common/components/NoResultsView/NoResultsView";
import PreviewReviewCard from "./PreviewReviewCard/PreviewReviewCard";

const PreviewReviews = () => {

    const dispatch = useDispatch();
    // Get the 'userId'and 'reviews' from the Redux store
    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);
    // Declare state variables for the component
    const [fetchStatus, setFetchStatus] = useState("pending");

    // Fetch reviews by user id
    useEffect(() => {
        if (!userId) return;

        getReviewsByUserId(userId)
            .then(data => {
                dispatch(setReviews(data));
                setFetchStatus("idle");
            });
    }, [userId]);

    return (
        <div className="preview-reviews-page-container">
            <ProfileNavigationView pageTitle="Reviews"/>

            <main className="preview-reviews-container container">
                {reviews?.length > 0 && (
                    reviews.map(review => (
                        <PreviewReviewCard
                            key={review.id}
                            review={review}
                            canDelete={true}
                        />
                    ))
                )}

                {!reviews?.length && fetchStatus === "idle" && (
                    <NoResultsView
                        mainText="You haven't written any reviews yet."
                        subText="Write some restaurant reviews, and view them here!"
                    />
                )}
            </main>
        </div>
    );
};

export default PreviewReviews;