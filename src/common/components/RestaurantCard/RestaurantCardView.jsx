/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCardView.css";

import {useNavigate} from 'react-router-dom';

// FontAwesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire, faLocationArrow, faUtensils} from "@fortawesome/free-solid-svg-icons";

import StarRatingView from "../StarRatingView/StarRatingView";
import RouteButton from "./RouteButton/RouteButton";
import BookmarkButton from "../buttons/containers/BookmarkButton/BookmarkButton";
import {useSwipeable} from "react-swipeable";
import RestaurantImageView from "../RestaurantImageView/RestaurantImageView";
import RecommendButton from "../../../routes/DetailsPage/BannerView/RecommendButton/RecommendButton";

// A card component for displaying restaurant information
const RestaurantCardView = ({restaurant, view, ranking, open = true}) => {

    const {name, rating, distance, price, primaryCuisine, photoUrl} = restaurant;

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    const navigate = useNavigate();

    const handlers = useSwipeable({
        onTap: ({event}) => {
            if (event.target.closest(".interaction-button")) return;

            navigate(`/details/${restaurant.id}`)
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    // Render the component
    return (
        <div className={`restaurant-card ${open ? "open" : "closed"}`} {...handlers}>
            <div className="details-container">
                <h3>
                    {ranking && (
                        <div className="ranking">{ranking}</div>
                    )}

                    <div>{name}</div>
                </h3>

                <StarRatingView rating={starRating}/>

                <div className="distance-container">
                    <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                    {Math.round(distance * 10) / 10} Km
                </div>

                <div className="price-cuisine-container">
                    {(price !== "Unknown" && price !== "") && <p>{price}</p>}
                    {(price !== "Unknown" && price !== "") && <span className="dot-separator"></span>}
                    <span className="cuisine"><FontAwesomeIcon icon={faUtensils}
                                                               className="icon"/>{primaryCuisine}</span>
                </div>
            </div>

            <div className="container-rhs">
                <div className="icons-container">
                    <BookmarkButton restaurant={restaurant}/>
                    {view === "map" && <RouteButton/>}
                </div>

                <RestaurantImageView photoUrl={photoUrl} name={name}/>
            </div>
        </div>
    );
};


export default RestaurantCardView;


