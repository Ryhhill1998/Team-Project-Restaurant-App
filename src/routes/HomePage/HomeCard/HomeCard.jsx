/*
 Description: Home card component. This component is rendered in the HomePage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./HomeCard.css";
// Import dependencies
import StarRatingView from "../../../common/components/StarRatingView/StarRatingView";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faUtensils} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../common/components/buttons/containers/BookmarkButton/BookmarkButton";
import {useNavigate} from "react-router-dom";

const HomeCard = ({restaurant, highlyRecommended}) => {
    // Get props
    const {name, rating, distance, price, primaryCuisine, photoUrl} = restaurant;

    const navigate = useNavigate();

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    // Show restaurant details when the user clicks anywhere on the card except the bookmark button
    const showRestaurantDetails = (event) => {
        if (event.target.closest(".interaction-button")) return;

        navigate(`/details/${restaurant.id}`);
    };

    return (
        <div className="home-card" onClick={showRestaurantDetails}>
            {highlyRecommended && (
                <div className="highlight-banner">Highly recommended</div>
            )}

            <div className="restaurant-image-background" style={{backgroundImage: `url(${photoUrl})`}}></div>

            <div className="details-container">
                <h3>
                    <div>{name}</div>

                    <BookmarkButton restaurant={restaurant}/>
                </h3>

                <StarRatingView rating={starRating}/>

                <div className="price-cuisine-container">
                    <div className="distance-container">
                        <FontAwesomeIcon icon={faLocationArrow} className="icon"/>

                        {Math.round(distance * 10) / 10} Km
                    </div>

                    <div>
                        {price && price !== "Unknown" && <p>{price}</p>}

                        {price && price !== "Unknown" && <span className="dot-separator"></span>}

                        <span className="cuisine">
                            <FontAwesomeIcon icon={faUtensils} className="icon"/>

                            {primaryCuisine}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;