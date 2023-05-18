/*
Description: Restaurant marker component to appear on maps
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./RestaurantMarker.css";

// mapbox dependencies
import {Marker} from "react-map-gl";

// redux imports
import {displayRestaurant} from "../../../../../features/map/mapSlice";
import {setActiveSlide} from "../../../../../features/slider/sliderSlice";
import {useDispatch} from "react-redux";
import {setSelectedCheckInsById} from "../../../../../features/checkIns/checkInsSlice";

// RestaurantMarker component
const RestaurantMarker = ({restaurant, index, selected, visible, type = "main"}) => {

    // deconstruct properties of restaurant prop
    const {id, name, longitude, latitude, photoUrl} = restaurant;

    // initialise dispatch
    const dispatch = useDispatch();

    // adjust marker visibility depending on visible prop
    const style = {
        visibility: visible ? "visible" : "hidden",
        zIndex: selected ? 10 : 0,
    };

    // handler function to display the restaurant associated with the marker that is clicked by the user
    const handleClick = (id) => {
        if (!id) {
            throw new Error("No id provided");
        }

        if (type === "check-in") {
            dispatch(displayRestaurant(restaurant));
            dispatch(setSelectedCheckInsById(restaurant.checkInId));
        } else {
            dispatch(displayRestaurant(restaurant));
            dispatch(setActiveSlide(index));
        }
    };

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            style={style}
        >
            <div
                className={`restaurant-marker-container ${selected ? "selected" : ""} ${type}`}
                onClick={() => handleClick(id)}
            >
                <div className="marker">
                    <img src={photoUrl} alt={`${name} marker`}/>
                </div>

                <div className="triangle"></div>
            </div>
        </Marker>
    );
};

export default RestaurantMarker;