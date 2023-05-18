/*
Description: Restaurant image component for use restaurant cards (not homepage) and review previews
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./RestaurantImageView.css";

const RestaurantImageView = ({photoUrl, name}) => {
    return (
        <div className="restaurant-image-container">
            <img src={photoUrl} alt={name} loading="lazy"/>
        </div>
    );
};

export default RestaurantImageView;