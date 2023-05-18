/*
Description: Bookmark button component for adding/removing bookmarks in the application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// fontawesome imports
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faBookmark as faBookmarkSolid} from "@fortawesome/free-solid-svg-icons";

// redux imports
import {
    addBookmark,
    removeBookmark,
    selectBookmarks,
    selectUserId,
} from "../../../../../features/user/userSlice";

import {addBookmarkInteraction, removeBookmarkInteraction} from "../../../../../features/interactions/interactionsSlice";

import {useDispatch, useSelector} from "react-redux";

// firebase imports
import {addUserBookmark, removeUserBookmark} from "../../../../../firebase/firebase";

// react router imports
import {useNavigate} from "react-router-dom";

// react imports
import {useEffect, useState} from "react";

// component imports
import InteractionButtonView from "../../views/InteractionButtonView/InteractionButtonView";
import InteractionFeedbackView from "../../../InteractionFeedbackView/InteractionFeedbackView";

// BookmarkButton component
const BookmarkButton = ({restaurant, style}) => {

    // get id from restaurant if restaurant variable is truthy
    const id = restaurant?.id;

    // initialise navigator
    const navigate = useNavigate();

    // initialise dispatch
    const dispatch = useDispatch();

    // redux selectors
    const userId = useSelector(selectUserId);
    const bookmarks = useSelector(selectBookmarks);

    // state variables
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);

    // Check if the current restaurant is bookmarked when bookmarks or id changes
    useEffect(() => {
        if (!bookmarks || !id) return; // return if user has no bookmarks or there is no restaurant id

        setIsBookmarked(bookmarks.some(bookmark => bookmark === id));
    }, [bookmarks, id]);

    // Handle the bookmark button click event
    const handleBookmarkClick = async () => {
        // navigate user to sign in page if they are not authenticated
        if (!userId) {
            navigate("/sign-in");
            return;
        }

        if (feedbackIsVisible) return; // prevent the user from clicking repeatedly

        if (isBookmarked) {
            await removeUserBookmark(userId, id); // remove from user bookmarks in db
            dispatch(removeBookmark(id)); // remove from user bookmarks in redux store
            dispatch(removeBookmarkInteraction()); // update bookmarks interactions in redux store
        } else {
            await addUserBookmark(userId, restaurant); // add to user bookmarks in db
            dispatch(addBookmark(id)); // add to user bookmarks in redux store
            dispatch(addBookmarkInteraction()); // update bookmarks interactions in redux store
        }

        // show feedback
        setFeedbackIsVisible(true);

        // fade out after 2 seconds
        setTimeout(() => setFeedbackIsVisible(false), 2000);
    };

    // render the BookmarkButton component
    return (
        <>
            <InteractionButtonView
                icon={faBookmark}
                solidIcon={faBookmarkSolid}
                isSolid={isBookmarked}
                handleClick={handleBookmarkClick}
                style={style}
            />

            <InteractionFeedbackView
                isVisible={feedbackIsVisible}
                change={isBookmarked ? "Saved to" : "Removed from"}
                interaction="bookmarks"
            />
        </>
    );
};

export default BookmarkButton;