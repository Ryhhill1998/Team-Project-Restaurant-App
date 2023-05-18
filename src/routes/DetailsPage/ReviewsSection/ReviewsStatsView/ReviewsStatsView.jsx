/*
 Description: This file contains the ReviewsStatsView component, which is a sub-component of the DetailsPage component.
 It renders the ReviewsGraph component and stats.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

import "./ReviewsStatsView.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons";
import StarRatingView from "../../../../common/components/StarRatingView/StarRatingView";
import {faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";
import ReviewsGraph from "../ReviewsGraph/ReviewsGraph";
import {useState} from "react";

const ReviewsStatsView = ({
                              rating,
                              reviewsHistogram,
                              tripAdvisorReviews,
                              appReviews,
                              handleAllReviewsClick,
                              allReviewsVisible
                          }) => {

    const [reviewsInfoVisible, setReviewsInfoVisible] = useState(false);

    return (
        <div className="review-stats-container">
            <div className="review-stats">
                <div className="rating-container">
                    <p>
                        {rating}

                        <button onClick={() => setReviewsInfoVisible(true)}>
                            <FontAwesomeIcon icon={faCircleQuestion} className="icon"/>
                        </button>
                    </p>

                    <StarRatingView rating={rating} hideNumber={true}/>

                    {reviewsHistogram && <span>{reviewsHistogram.totalReviews} reviews</span>}
                </div>

                {reviewsInfoVisible && (
                    <div className="reviews-info">
                        <button onClick={() => setReviewsInfoVisible(false)}>
                            <FontAwesomeIcon icon={faXmark} className="icon"/>
                        </button>

                        <p><strong>Total Reviews:</strong> {reviewsHistogram.totalReviews}</p>

                        <p>
                            <strong>TripAdvisor Reviews: </strong>
                            {tripAdvisorReviews}
                        </p>

                        <p><strong>App Reviews:</strong> {appReviews}</p>
                    </div>
                )}

                <div className="chart-container">
                    {reviewsHistogram && <ReviewsGraph reviewsHistogram={reviewsHistogram}/>}
                </div>
            </div>

            {!allReviewsVisible && (
                <button onClick={handleAllReviewsClick}>
                    All reviews
                    <FontAwesomeIcon icon={faChevronRight} className="icon"/>
                </button>
            )}
        </div>
    );
};

export default ReviewsStatsView;