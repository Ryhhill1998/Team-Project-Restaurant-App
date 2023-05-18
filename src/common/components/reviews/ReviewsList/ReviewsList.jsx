/*
Description: Reviews list - used in reviews page and reviews previews on details page
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ReviewsList.css";

// component imports
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewCard from "./ReviewCard/ReviewCard";

// react imports
import {useState} from "react";
import NoResultsView from "../../NoResultsView/NoResultsView";

const ReviewsList = ({restaurant, reviews, userId}) => {

    // state variables - editing review ID
    const [editingReviewId, setEditingReviewId] = useState(null);

    // handler function when cancel edit mode button clicked
    const handleCancel = () => {
        setEditingReviewId(null);
    };

    return (
        <div className="reviews-container">
            {/* show no results when there are no reviews available*/}
            {!reviews?.length && (
                <p>No reviews available</p>
            )}

            {reviews && reviews.map(review => {
                    let {id, authorId, title, rating, content, visitDate} = review;

                    if (editingReviewId === id) {
                        visitDate = new Date(visitDate)
                            .toISOString()
                            .replaceAll("/", "-")
                            .split("T")
                            .at(0);

                        return <ReviewForm
                            key={id}
                            restaurant={restaurant}
                            userId={authorId}
                            edit={true}
                            reviewId={id}
                            reviewData={{rating, visitDate, title, content}}
                            closeForm={handleCancel}
                        />
                    }

                    return (
                        <ReviewCard
                            key={id}
                            review={review}
                            userId={userId}
                            handleEditClick={() => setEditingReviewId(id)}
                        />
                    )
                })}
        </div>
    );
};

export default ReviewsList;