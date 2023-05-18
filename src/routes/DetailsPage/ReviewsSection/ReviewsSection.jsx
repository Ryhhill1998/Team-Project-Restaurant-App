/*
 Description: This file contains the ReviewsSection component, which is a sub-component of the DetailsPage component.
 Renders multiple components to make up the reviews section of the DetailsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./ReviewsSection.css";
// Imports
import ReviewForm from "../../../common/components/reviews/ReviewForm/ReviewForm";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../../features/reviews/reviewsSlice";
import ReviewsList from "../../../common/components/reviews/ReviewsList/ReviewsList";
import PrimaryButtonView from "../../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";
import ReviewsStatsView from "./ReviewsStatsView/ReviewsStatsView";
import {sortReviewsByMostRecentVisitDate} from "../../ReviewsPage/ReviewsPage";
import {options} from "../../../features/restaurants/restaurantsSlice";

const ReviewsSection = ({userId, restaurant}) => {
    
    const restaurantId = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'reviews' from the Redux store
    const reviews = useSelector(selectReviews);
    // useRef hook
    const formRef = useRef();
    // useState hooks
    const [displayedReviews, setDisplayedReviews] = useState(null);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [reviewsHistogram, setReviewsHistogram] = useState(null);
    const [allReviewsVisible, setAllReviewsVisible] = useState(true);
// useEffect hook to get the reviews for the restaurant
    useEffect(() => {
        if (!restaurantId) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => dispatch(setReviews(reviewsFound)));
    }, [restaurantId]);
    // useEffect hook to sort the reviews by most recent visit date and set the displayed reviews
    useEffect(() => {
        if (!reviews) return;

        setAllReviewsVisible(reviews?.length <= 3);
        const sortedReviews = sortReviewsByMostRecentVisitDate(reviews);
        setDisplayedReviews(sortedReviews.slice(0, 3));
    }, [reviews]);
    
    useEffect(() => {
        if (!displayedReviews?.length) {
            setReviewsHistogram(null);
        }
    }, [displayedReviews]);

    // useEffect hook to scroll to the review form when it is visible
    useEffect(() => {
        if (!isReviewFormVisible || !formRef?.current) return;

        formRef.current.scrollIntoView({behavior: "smooth"});
    }, [isReviewFormVisible, formRef]);

    const handleWriteReviewClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            setIsReviewFormVisible(!isReviewFormVisible);
        }
    };
    // useEffect hook to get the reviews histogram for the restaurant
    useEffect(() => {
        if (!restaurant || !displayedReviews?.length) return;

        const url = "https://travel-advisor.p.rapidapi.com/restaurants/get-details?location_id=" + restaurant.id +
            "&currency=USD&lang=en_US";

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                const histogram = data.rating_histogram;
                setReviewsHistogram({...histogram, totalReviews: +data.num_reviews})
            })
            .catch(err => console.error(err));
    }, [restaurant, displayedReviews]);
// OnClick function to handle the all reviews button
    const handleAllReviewsClick = () => {
        navigate("/reviews/" + restaurantId);
    };

    return (
        <div className="restaurant-reviews">
            <h2>Reviews</h2>

            {reviewsHistogram && (
                <ReviewsStatsView
                    rating={restaurant.rating}
                    reviewsHistogram={reviewsHistogram}
                    tripAdvisorReviews={reviewsHistogram.totalReviews - displayedReviews.length}
                    appReviews={displayedReviews.length}
                    handleAllReviewsClick={handleAllReviewsClick}
                    allReviewsVisible={allReviewsVisible}
                />
            )}

            <ReviewsList restaurant={restaurant} reviews={displayedReviews} userId={userId}/>

            {allReviewsVisible ? (
                <PrimaryButtonView
                    text={isReviewFormVisible ? "Close Review Form" : "Write a Review"}
                    handleClick={handleWriteReviewClick}
                    width="fit-content"
                    margin="1em auto"
                />
            ) : (
                <PrimaryButtonView
                    text={"See all reviews"}
                    handleClick={handleAllReviewsClick}
                    width="fit-content"
                    margin="1em auto"
                />
            )}

            {allReviewsVisible && isReviewFormVisible && (
                <ReviewForm
                    ref={formRef}
                    restaurant={restaurant}
                    userId={userId}
                    closeForm={() => setIsReviewFormVisible(false)}
                />
            )}
        </div>
    );
};

export default ReviewsSection;