/*
 Description: Redux slice for reviews
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
    selectedReviewId: null,
    sortFilter: "Most recent"
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        // Set the reviews in the state
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        // Add a review to the state
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        // Delete a review from the state
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        },
        // Update a review in the state
        updateReview: (state, action) => {
            const {reviewId, updatedReview} = action.payload;
            state.reviews = state.reviews.map(review => {
                if (review.id === reviewId) {
                    return updatedReview;
                } else {
                    return review;
                }
            });
        },
        // Select a review in the state
        selectReview: (state, action) => {
            state.selectedReviewId = action.payload;
        },
        // Deselect a review in the state
        deselectReview: state => {
            state.selectedReviewId = null;
        },
        // Sort the reviews in the state
        sortReviews: (state, action) => {
            const {text, filter, multiplier} = action.payload;
            state.reviews = [...state.reviews].sort((a, b) => multiplier * (a[filter] - b[filter]));
            state.sortFilter = text;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setReviews,
    addReview,
    deleteReview,
    updateReview,
    selectReview,
    deselectReview,
    sortReviews
} = reviewsSlice.actions
export const selectReviews = state => state.reviews.reviews;
export const selectSelectedReviewId = state => state.reviews.selectedReviewId;
export const selectSortFilter = state => state.reviews.sortFilter;
export default reviewsSlice.reducer