/*
Description: Star rating component - used on restaurant cards and details and reviews
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// stylesheet
import "./StarRatingView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";

const StarRatingView = ({rating, hideNumber = false}) => {

    // calculate number of full and half stars
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars > 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((star, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="icon"/>
            ))}

            {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} className="icon"/>}

            {emptyStars > 0 && [...Array(emptyStars)].map((star, i) => (
                <FontAwesomeIcon key={i} icon={faEmptyStar} className="icon"/>
            ))}

            {!hideNumber && <span>{rating}</span>}
        </div>
    );
};

export default StarRatingView;