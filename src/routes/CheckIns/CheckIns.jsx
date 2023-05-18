/*
 Description: CheckIns component which renders multiple components that make up the CheckIns page
 Author: George Ball
 Contact: georgeball14@hotmail.com
 */

// stylesheets
import "./CheckIns.css";
import "./CheckInsCalendar/CheckInsCalendar.css";

// Import required dependencies and components

// Import Calendar component from 'react'calendar'
import Calendar from "react-calendar";

import NoResultsView from "../../common/components/NoResultsView/NoResultsView";

import {useDispatch, useSelector} from "react-redux";
import {selectProfilePhotoUrl, selectUserId} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUtensils, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCheckInsAndRestaurantDataByUserIdForMonth} from "../../firebase/firebase";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import DetailsPopup from "./DetailsPopup/DetailsPopup";
import MapView from "../../common/components/map/views/MapView/MapView";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage";
import {
    selectCheckIns,
    selectSelectedCheckIns,
    setCheckIns, setSelectedCheckIns
} from "../../features/checkIns/checkInsSlice";
import {displayRestaurant, selectDisplayedRestaurant} from "../../features/map/mapSlice";

const currentDate = new Date();

const CheckIns = () => {
    // Hooks and selectors
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'userId','profilePhotoUrl', 'allCheckIns', 'selectedCheckIns', and 'displayedRestaurant' from the Redux store
    const userId = useSelector(selectUserId);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);
    const allCheckIns = useSelector(selectCheckIns);
    const selectedCheckIns = useSelector(selectSelectedCheckIns);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    // State variables
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [showCollagePopup, setShowCollagePopup] = useState(false);
    const [fetchStatus, setFetchStatus] = useState("pending");
    const [detailsPopupIsVisible, setDetailsPopupIsVisible] = useState(false);

    // If user is not logged in, navigate to the profile page
    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    // Fetch check-ins and restaurant data for the selected month
    useEffect(() => {
        if (!userId) return;

        getCheckInsAndRestaurantDataByUserIdForMonth(userId, selectedMonth)
            .then(data => {
                dispatch(setCheckIns(data));
                setFetchStatus("idle");
            });
    }, [userId, selectedMonth]);

    // Set the selected check-ins based on the calendar value
    useEffect(() => {
        if (!selectedCheckIns?.length) return;

        const checkIn = selectedCheckIns[0];

        setCalendarValue(new Date(checkIn.date));
    }, [selectedCheckIns]);

    // Update selected check-ins when all check-ins change
    useEffect(() => {
        if (!allCheckIns?.length) return;

        const checkIns = getCheckInsOnDate(calendarValue);
        dispatch(setSelectedCheckIns(checkIns));
    }, [allCheckIns]);

    // Update displayed restaurant when selected check-ins change
    useEffect(() => {
        if (!selectedCheckIns?.length || displayedRestaurant.checkInId) return;

        const checkIn = selectedCheckIns[0];
        dispatch(displayRestaurant({...checkIn.restaurant, checkInId: checkIn.id}));
    }, [displayedRestaurant, selectedCheckIns]);

    // Helper function to filter check-ins by date
    const getCheckInsOnDate = (date) => {
        return allCheckIns.filter((checkIn) => {
            const checkInDate = new Date(checkIn.date).toLocaleDateString();
            return checkInDate === date.toLocaleDateString();
        });
    };

    // Helper function to get checked-in restaurant by restaurantId
    const getCheckedInRestaurant = (restaurantId) => {
        return allCheckIns.find(checkIn => checkIn.restaurant.id === restaurantId);
    };

    // Helper function to count unique restaurants in check-ins
    const countUniqueRestaurants = (checkIns) => {
        if (!checkIns) {
            return 0;
        }
        const uniqueRestaurantIds = new Set(checkIns.map((checkIn) => checkIn.restaurant.id));
        return uniqueRestaurantIds.size;
    };

    // Handle click on a calendar tile
    const handleTileClick = (checkIns) => {
        const checkInsOnDate = checkIns.map(checkIn => {
            const updatedCheckIn = {...checkIn};
            updatedCheckIn.userData = {id: userId, profilePhotoUrl};
            return updatedCheckIn;
        });

        dispatch(setSelectedCheckIns(checkInsOnDate));

        const checkIn = checkInsOnDate[0];
        dispatch(displayRestaurant({...checkIn.restaurant, checkInId: checkIn.id}));

        setDetailsPopupIsVisible(true);
    };

    // Render tile content with check-in data for calendar
    const TileContent = ({ date }) => {
        if (!allCheckIns?.length) return null;

        const checkInsForDate = getCheckInsOnDate(date);

        return checkInsForDate.map((checkIn, index) => {
            const foundCheckIn = getCheckedInRestaurant(checkIn.restaurant.id);

            if (!foundCheckIn) return null;

            const { restaurant } = foundCheckIn;

            const tileContentStyle = {
                backgroundImage: `url(${restaurant.photoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%',
            };

            return (
                <div
                    key={index}
                    style={tileContentStyle}
                    title={restaurant.name}
                    onClick={() => handleTileClick(checkInsForDate)}
                ></div>
            );
        });
    };

    // Render tile content for calendar based on view type
    const renderTileContent = ({ date, view }) => {
        if (view !== "month") {
            return null;
        }

        return <TileContent date={date} />;
    };

    // Handle start date change in the calendar
    const handleStartDateChange = ({activeStartDate}) => {
        setSelectedMonth(activeStartDate.getMonth());
    };

    return (
        <div className="check-ins-page-container">
            <ProfileNavigationView pageTitle="Check-ins" />

            <div className="check-ins-page">
                <div className="check-ins-map-container">
                    {/* Render the MapView component if there are check-ins*/}
                    {allCheckIns?.length > 0 && (
                        <MapView
                            centrePosition={{
                                longitude: displayedRestaurant.longitude,
                                latitude: displayedRestaurant.latitude
                            }}
                            height={260}
                            zoom={14}
                            checkIns={detailsPopupIsVisible ? selectedCheckIns : allCheckIns}
                        />
                    )}  
                    {/*Render the NoResultsView component when a user has no Check-ins in the current month*/}
                    {!allCheckIns?.length && fetchStatus === "idle" && (
                        <NoResultsView
                            mainText="You haven't checked in anywhere this month."
                            subText="Head to a restaurant page to check-in!"
                        />
                    )}
                </div>

                <div className="check-ins-stats">
                    <div className="check-ins-unique-restaurants">
                        <div className="icon-container">
                            {/* Render the unique restaurants count*/}
                            <FontAwesomeIcon className="icon" icon={faUtensils} />
                            <span>{countUniqueRestaurants(allCheckIns) || "0"}</span>
                        </div>
                        <p>Unique restaurants</p>
                    </div>

                    <div className="check-ins-total">
                        <div className="icon-container">
                            {/* Render the total check-ins count*/}
                            <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                            <span>{allCheckIns?.length || "0"}</span>
                        </div>
                        <p>Check-ins</p>
                    </div>
                </div>

                <div className="check-ins-calendar">
                    {/* Render the Calendar component if there are check-ins*/}
                    <Calendar
                        onChange={(value) => setCalendarValue(value)}
                        value={calendarValue}
                        maxDate={currentDate}
                        minDate={new Date(2023, 0, 1)}
                        maxDetail="month"
                        minDetail="month"
                        tileContent={renderTileContent}
                        onActiveStartDateChange={handleStartDateChange}
                    />
                    {/* Render the CheckInsCollage component on Calendar tile click*/}
                    {showCollagePopup && (
                        <CheckInsCollage closePopup={() => setShowCollagePopup(false)}/>
                    )}
                    {/* Render the DetailsPopup component on Calendar tile click*/}
                    {detailsPopupIsVisible && (
                        <DetailsPopup
                            date={calendarValue.toLocaleDateString()}
                            closePopup={() => setDetailsPopupIsVisible(false)}
                            showPhotos={() => setShowCollagePopup(true)}
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default CheckIns;