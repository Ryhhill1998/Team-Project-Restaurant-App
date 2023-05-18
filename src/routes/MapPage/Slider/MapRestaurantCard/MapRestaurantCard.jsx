/*
 Description: Map page restaurant card component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./MapRestaurantCard.css";
// Import dependencies
import RestaurantCardView from "../../../../common/components/RestaurantCard/RestaurantCardView";

import {useSelector} from "react-redux";
import {selectActiveSlide} from "../../../../features/slider/sliderSlice";
import {selectRouteDetails} from "../../../../features/map/mapSlice";

const MapRestaurantCard = ({restaurant, index}) => {
    // Get the 'activeSlide' from the Redux store
    const activeSlide = useSelector(selectActiveSlide);
    // Get the 'routeDetails' from the Redux store
    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    // Hide card if route is active
    const style = {
        visibility: !routeCoordinates || index === activeSlide ? "visible" : "hidden"
    };

    return (
        <div className="map-restaurant-card-container" style={style}>
            <RestaurantCardView
                restaurant={restaurant}
                view="map"
                ranking={index + 1}
            />
        </div>
    );
};

export default MapRestaurantCard;