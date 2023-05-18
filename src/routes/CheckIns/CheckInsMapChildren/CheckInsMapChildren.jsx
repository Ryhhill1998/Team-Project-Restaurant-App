/*
 Description: CheckInsMapChildren component which renders the CheckInMarker on a page
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// stylesheet
import "./CheckInsMapChildren.css";
// Import required dependencies and components
import {FullscreenControl} from "react-map-gl";
import {Popup} from "react-map-gl";
import RestaurantMarker from "../../../common/components/map/containers/RestaurantMarker/RestaurantMarker";

// Define the 'CheckInsMapChildren' component
const CheckInsMapChildren = ({checkIns, displayedRestaurant}) => {

    return (
        <>  
            {/* Iterate through checkIns and render RestaurantMarker for each checkIn */}
            {checkIns && checkIns.map(({id, restaurant}) => {
                const {id: restaurantId, longitude, latitude, name} = restaurant;

                return (
                    <div key={id}>
                        {/* Render RestaurantMarker component */}
                        <RestaurantMarker
                            restaurant={{...restaurant, checkInId: id}}
                            visible={true}
                            type="check-in"
                            selected={displayedRestaurant.id === restaurantId}
                        />
                        {/* Display Popup component for the displayedRestaurant */}
                        {displayedRestaurant?.id === restaurantId && (
                            <Popup
                                longitude={longitude}
                                latitude={latitude}
                                anchor="bottom"
                                closeButton={false}
                                closeOnClick={false}
                                offset={60}
                                className="check-ins-map-popup"
                            >
                                <div className="content">
                                    <h3>{name}</h3>
                                </div>
                            </Popup>
                        )}
                    </div>
                );
            })}
            {/* Render FullscreenControl component for the map */}
            <FullscreenControl position="bottom-right"/>
        </>
    );
};

export default CheckInsMapChildren;