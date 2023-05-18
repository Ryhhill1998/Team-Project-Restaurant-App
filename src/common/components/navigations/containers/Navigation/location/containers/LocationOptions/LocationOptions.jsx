/*
Description: Location options component present on filters dropdown
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./LocationOptions.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

// redux imports
import {
    selectUsingCurrentLocation,
    setLocationDescription,
    setUsingCurrentLocation,
    setUsingCustomLocation,
    updateUserPosition
} from "../../../../../../../../features/location/locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {hideSpinner, showSpinner} from "../../../../../../../../features/spinner/spinnerSlice";

// react imports
import {useState} from "react";

// component imports
import ErrorPopupView from "../../../../../../popups/views/ErrorPopupView/ErrorPopupView";

// LocationOptions component
const LocationOptions = ({closePopup}) => {

    // initialise dispatch
    const dispatch = useDispatch();

    // redux selector - check if user is using their current location
    const usingCurrentLocation = useSelector(selectUsingCurrentLocation);

    // state variables
    const [postcode, setPostcode] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorFeedback, setErrorFeedback] = useState({title: "", message: ""});
    const {title, message} = errorFeedback;
    const [inputPlaceholder, setInputPlaceholder] = useState("Enter postcode");

    // handler for when input becomes focused
    const handleInputFocus = () => {
        setInputPlaceholder("");
    };

    // handler for when input is blurred
    const handleInputBlur = () => {
        if (!postcode) {
            setInputPlaceholder("Enter postcode");
        }
    };

    // function to save an item to localStorage
    const updateLocalStorageValue = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };

    // function to save location details to localStorage
    const saveLocationDetails = (longitude, latitude, description) => {
        updateLocalStorageValue("longitude", longitude);
        updateLocalStorageValue("latitude", latitude);
        updateLocalStorageValue("locationDescription", description);

        if (description === "Current location") {
            updateLocalStorageValue(usingCurrentLocation, true);
        } else {
            updateLocalStorageValue(usingCurrentLocation, false);
        }
    };

    // function to update the feedback shown in the error popup
    const updateErrorFeedback = (type) => {
        const newTitle = type === "postcode" ?
            "Unable to find results for that postcode."
            :
            "Unable to retrieve your location.";

        const newMessage = type === "postcode" ?
            "Please make sure the postcode you entered is correct."
            :
            "Please try again or enter a postcode manually.";

        setErrorFeedback(errorFeedback => {
            const updatedFeedback = {...errorFeedback};
            updatedFeedback.title = newTitle;
            updatedFeedback.message = newMessage;
            return updatedFeedback;
        });
    };

    // handler function for when use location button is clicked
    const handleUseLocationClick = () => {
        if (usingCurrentLocation) {
            // if already using current location, close the popup
            closePopup();
            return;
        }

        // show spinner while retrieving location info
        dispatch(showSpinner());

        // success function - saves location details to redux and localStorage
        const success = (position) => {
            const {longitude, latitude} = position.coords;
            dispatch(updateUserPosition({latitude, longitude}));
            dispatch(setUsingCurrentLocation());
            saveLocationDetails(longitude, latitude, "Current location");
            closePopup();
        };

        // error function - update error feedback and display popup
        const error = () => {
            dispatch(hideSpinner());
            updateErrorFeedback("gps");
            setShowErrorPopup(true);
        };

        if ("geolocation" in navigator) {
            // checks if browser has access to the geolocation API
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            dispatch(hideSpinner());
            setErrorFeedback(errorFeedback => {
                const updatedFeedback = {...errorFeedback};
                updatedFeedback.title = "Location not available!";
                updatedFeedback.message = "Your browser does not currently have access to your location data.";
                return updatedFeedback;
            });
            setShowErrorPopup(true);
        }
    };

    // handler function for submitting postcode
    const handlePostcodeSubmit = ({code}) => {
        // make sure key down was Enter for submit - return if not
        if (code !== "Enter") return;

        // show spinner while retrieving postcode data for API
        dispatch(showSpinner());

        // fetch data from postcodes API
        fetch("https://api.postcodes.io/postcodes/" + postcode)
            .then(response => {
                if (!response.ok) {
                    throw new Error("The requested resource is not available.");
                }

                return response.json();
            })
            .then(data => {
                // update location data in redux and localStorage
                const {longitude, latitude} = data.result;
                dispatch(updateUserPosition({longitude, latitude}));
                dispatch(setUsingCustomLocation());
                dispatch(setLocationDescription(postcode));
                saveLocationDetails(longitude, latitude, postcode);
                closePopup();
            })
            .catch(() => {
                // show error
                dispatch(hideSpinner());
                updateErrorFeedback("postcode");
                setShowErrorPopup(true);
            });
    };

    return (
        <div className="location-options-container">
            <div className="location-options">
                {showErrorPopup && (
                    <ErrorPopupView
                        title={title}
                        message={message}
                        closePopup={closePopup}
                    />
                )}

                <label className="postcode-input-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>

                    <input
                        type="text"
                        placeholder={inputPlaceholder}
                        value={postcode}
                        onChange={({target}) => setPostcode(target.value.toUpperCase())}
                        onKeyDown={handlePostcodeSubmit}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        style={{padding: "0"}} // Set padding to 0
                    />
                </label>


                <button className="use-geolocation-button" onClick={handleUseLocationClick}>
                    <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                    Current location
                </button>
            </div>
        </div>
    );
};
export default LocationOptions;
