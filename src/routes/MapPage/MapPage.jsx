/*
Description: MapPage component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// style sheet
import "./MapPage.css";

// imported components
import Navigation from "../../common/components/navigations/containers/Navigation/Navigation";
import Slider from "./Slider/Slider";
import MapView from "../../common/components/map/views/MapView/MapView";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectRestaurants, selectRestaurantsFetchStatus} from "../../features/restaurants/restaurantsSlice";
import {selectUserPosition} from "../../features/location/locationSlice";
import PrimaryButtonView from "../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";
import NoResultsView from "../../common/components/NoResultsView/NoResultsView";
import ErrorPopupView from "../../common/components/popups/views/ErrorPopupView/ErrorPopupView";

const MapPage = () => {
    // Get the 'restaurants', 'restaurantsFetchStatus' and 'userPosition' from the Redux store
    const restaurants = useSelector(selectRestaurants);
    const restaurantsFetchStatus = useSelector(selectRestaurantsFetchStatus);
    const userPosition = useSelector(selectUserPosition);
    // Declare state variables for the component
    const [windowHeight, setWindowHeight] = useState(+window.innerHeight);
    const [errorPopupIsVisible, setErrorPopupIsVisible] = useState(false);
    const [mapIsLoaded, setMapIsLoaded] = useState(false);

    // Update window height when window is resized
    useEffect(() => {
        setWindowHeight(+window.innerHeight)
    }, [window.innerHeight]);

    // Show error popup if no restaurants are found
    useEffect(() => {
        if (mapIsLoaded && restaurantsFetchStatus === "idle" && !restaurants?.length) {
            setTimeout(() => setErrorPopupIsVisible(true), 2000);
        } else {
            setErrorPopupIsVisible(false);
        }
    }, [restaurants, restaurantsFetchStatus, mapIsLoaded]);

    return (
        <div className="map-page-container">
            <Navigation view="map"/>

            <MapView
                centrePosition={userPosition}
                zoom={14}
                height={windowHeight}
                restaurants={restaurants}
                handleLoad={() => setMapIsLoaded(true)}
            />

            {errorPopupIsVisible && (
                <ErrorPopupView
                    children={
                        <NoResultsView
                            mainText="No open restaurants nearby!!"
                            subText="Try entering a different search location or check back later"
                        />
                    }
                    closePopup={() => setErrorPopupIsVisible(false)}
                />
            )}

            <Slider/>
        </div>
    );
};

export default MapPage;