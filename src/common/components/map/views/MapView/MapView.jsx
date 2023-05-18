/*
Description: Map view component to appear on map page and check ins page with different children components
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./MapView.css";

// mapbox dependencies 
import ReactMapGl from "react-map-gl";
import mapboxgl from "mapbox-gl";

// react imports
import {useEffect, useState} from "react";

// redux imports
import {hideSpinner, showSpinner} from "../../../../../features/spinner/spinnerSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectDisplayedRestaurant} from "../../../../../features/map/mapSlice";
import {selectRestaurantsFetchStatus} from "../../../../../features/restaurants/restaurantsSlice";

// children component imports
import MainMapChildren from "../../../../../routes/MapPage/MainMapChildren/MainMapChildren";
import CheckInsMapChildren from "../../../../../routes/CheckIns/CheckInsMapChildren/CheckInsMapChildren";


// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// MapView component
const MapView = ({centrePosition, zoom, height, restaurants, checkIns, handleLoad}) => {

    // initialise dispatch - connection to redux store
    const dispatch = useDispatch();

    // redux selectors
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const restaurantsFetchStatus = useSelector(selectRestaurantsFetchStatus);

    // state variables
    const [map, setMap] = useState(null);
    const [viewState, setViewState] = useState({
        longitude: centrePosition.longitude,
        latitude: centrePosition.latitude,
        zoom
    });

    // show spinner if pending restaurants fetch - hide if idle status and map has loaded
    useEffect(() => {
        if (restaurantsFetchStatus === "pending") {
            dispatch(showSpinner());
        } else if (restaurantsFetchStatus === "idle" && map) {
            dispatch(hideSpinner());
        }
    }, [restaurantsFetchStatus, map]);

    // show spinner if map is loading - hide if loaded
    useEffect(() => {
        if (!map) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [map]);

    // fly to new displayed restaurant when it changes
    useEffect(() => {
        if (!displayedRestaurant || !map) return;

        const {longitude, latitude} = displayedRestaurant;

        map.flyTo({center: [longitude, latitude], essential: true, speed: 0.5});
    }, [displayedRestaurant]);

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!centrePosition || !map) return;

        const {longitude, latitude} = centrePosition;

        map.flyTo({
            center: [longitude, latitude],
            essential: true,
            speed: 0.75,
            zoom
        });
    }, [centrePosition, map]);

    // handler functions
    // handler function to change the view state when the user moves the map
    const handleMapMove = (e) => setViewState(e.viewState);

    // handler function to set the map held in the component state to the map when it is loaded
    const handleMapLoad = ({target}) => {
        setMap(target);

        if (!handleLoad) return;

        handleLoad();
    }

    return (
        <div className="map-container">
            <ReactMapGl
                {...viewState}
                style={{width: "100%", height}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={handleMapMove}
                onLoad={handleMapLoad}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onRender={({target}) => target.resize()}
            >
                {/* if restaurants prop is not null, render main map children component */}
                {map && restaurants && (
                    <MainMapChildren
                        userPosition={centrePosition}
                        restaurants={restaurants}
                        displayedRestaurant={displayedRestaurant}
                    />
                )}

                {/* if check ins prop is not null, render check ins map children component */}
                {map && checkIns && (
                    <CheckInsMapChildren checkIns={checkIns} displayedRestaurant={displayedRestaurant}/>
                )}
            </ReactMapGl>
        </div>
    );
};

export default MapView;