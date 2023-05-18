/*
Description: Star rating component - used on restaurant cards and details and reviews
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// stylesheet
import '../StarRatingView.css';

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";

const InteractiveStarRatingView = ({rating, onClick, interactive}) => {

    // handler for when star clicked
    const handleClick = (value) => {
        if (interactive) {
            onClick(value);
        }
    };

    return (
        <div className="interactive-star-rating">
            {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                    key={i}
                    icon={i + 1 <= rating ? faStar : faEmptyStar}
                    className="icon"
                    onClick={() => handleClick(i + 1)}
                />
            ))}
        </div>
    );
};

export default InteractiveStarRatingView;