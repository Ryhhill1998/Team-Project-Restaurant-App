/*
Description: Route button component for use on map page restaurant cards to display route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// fontawesome imports
import {faCircleXmark, faRoute} from "@fortawesome/free-solid-svg-icons";

// redux imports
import {fetchRoute, resetRoute, selectDisplayedRestaurant, selectRouteDetails} from "../../../../features/map/mapSlice";
import {selectUserPosition} from "../../../../features/location/locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {activateSlider, deactivateSlider} from "../../../../features/slider/sliderSlice";

// component imports
import InteractionButtonView from "../../buttons/views/InteractionButtonView/InteractionButtonView";

const RouteButton = () => {

    // initialise dispatch - connection to redux
    const dispatch = useDispatch();

    // redux selectors
    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const userPosition = useSelector(selectUserPosition);

    // handler for button clicked
    const handleClick = () => {
        if (routeCoordinates) {
            dispatch(resetRoute());
            dispatch(activateSlider());
        } else {
            const coordinates1 = userPosition;

            const {latitude, longitude} = displayedRestaurant;
            const coordinates2 = {latitude, longitude};

            // fetches route from redux map slice
            dispatch(fetchRoute({coordinates1, coordinates2}));

            dispatch(deactivateSlider());
        }
    };

    return (
        <InteractionButtonView
            icon={faRoute}
            solidIcon={faCircleXmark}
            isSolid={routeCoordinates}
            handleClick={handleClick}
        />
    );
};

export default RouteButton;