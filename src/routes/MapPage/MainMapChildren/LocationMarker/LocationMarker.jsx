/*
 Description: Location marker component. This component is rendered in the MainMap component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import "./LocationMarker.css";
// Import dependencies
import {Marker} from "react-map-gl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";

const LocationMarker = ({longitude, latitude}) => {
    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
        >
            <div className="location-marker-container">
                <FontAwesomeIcon className="icon" icon={faLocationArrow}/>
            </div>
        </Marker>
    );
};

export default LocationMarker;