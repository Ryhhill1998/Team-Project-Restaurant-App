/*
 Description: This file contains the BannerView component, which is a sub-component of the DetailsPage component.
 It represents the banner of the page, which contains the restaurant name, and the buttons for bookmarking, recommending, and sharing.
 Author: George Ball
 Contact: georgeball14@hotmail.com
 */

 //stylesheet
import "./BannerView.css";
// Imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../common/components/buttons/containers/BookmarkButton/BookmarkButton";
import ShareButton from "./ShareButton/ShareButton";
import {forwardRef} from "react";
import RecommendButton from "./RecommendButton/RecommendButton";
import {deselectReview} from "../../../features/reviews/reviewsSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetRestaurantResults} from "../../../features/restaurants/restaurantsSlice";
import {resetInteractions} from "../../../features/interactions/interactionsSlice";

const BannerView = forwardRef((props, ref) => {
    // Get the props passed to the component
    const {restaurant, scrollPosition, showName, updateInteractions} = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();
// Styling for the banner based on user scroll position
    const style = scrollPosition > 20
        ? {position: 'fixed', backgroundColor: '#4c4c4c'}
        : {position: 'absolute', backgroundColor: 'transparent'};

    const bannerButtonsStyle = scrollPosition > 20
        ? {color: "#F49D1A"}
        : {color: "white"};
// OnClick handle function for back button
    const handleBackClick = () => {
        dispatch(deselectReview());
        dispatch(resetRestaurantResults());
        dispatch(resetInteractions());
        navigate(-1);
    };

    return (
        <div id="banner" ref={ref} className="banner container" style={style}>
            <button className="back-button" onClick={handleBackClick} style={bannerButtonsStyle}>
                <FontAwesomeIcon icon={faArrowLeft} className="icon" style={bannerButtonsStyle}/>
                Back
            </button>

            <h1 style={{opacity: showName ? 1 : 0}}>{restaurant?.name}</h1>

            <div className="action-button-container">
                <RecommendButton
                    restaurant={restaurant}
                    style={bannerButtonsStyle}
                    updateInteractions={updateInteractions}
                />

                <BookmarkButton
                    restaurant={restaurant}
                    style={bannerButtonsStyle}
                    updateInteractions={updateInteractions}
                />

                <ShareButton id={restaurant?.id} style={bannerButtonsStyle}/>
            </div>
        </div>
    );
});

export default BannerView;