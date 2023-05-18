/*
 Description: Bookmarks component which renders the BookmarkCard on a page
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// stylesheet
import "./Bookmarks.css";
// Import necessary hooks and functions from 'react-redux', 'react-router-dom', and 'firebase'
import {useSelector} from "react-redux";
import {selectBookmarks, selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRestaurantById} from "../../firebase/firebase";
// Import common components and subcomponents
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import NoResultsView from "../../common/components/NoResultsView/NoResultsView";
import BookmarkCard from "./BookmarkCard/BookmarkCard";

// Define the 'checkIsOpen' function to check if a restaurant is open
export const checkIsOpen = (restaurant) => {
    if (!restaurant) return false;

    let {minutes} = restaurant;
    const now = new Date();
    const day = now.getDay();
    const openingMinutes = minutes[day];

    let isOpen = false;

    if (openingMinutes !== "Closed") {
        const hour = now.getHours();
        const minute = now.getMinutes();
        const totalMinutes = 60 * hour + minute;

        const minuteRanges = openingMinutes.replaceAll(" ", "").split(",");

        for (let i = 0; i < minuteRanges.length; i++) {
            const range = minuteRanges[i];
            const [openMinutes, closeMinutes] = range.split("-");

            if (totalMinutes >= +openMinutes && totalMinutes <= +closeMinutes) {
                isOpen = true;
                break;
            }
        }
    }

    return isOpen;
};

// Define the 'Bookmarks' component
const Bookmarks = () => {

    const navigate = useNavigate();

    // Get the 'userId' and 'userBookmarks' from the Redux store using selectors
    const userId = useSelector(selectUserId);
    const userBookmarks = useSelector(selectBookmarks);

    // Declare state variables for 'bookmarkedRestaurants' and 'fetchStatus'
    const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("pending");

    // Use the 'useEffect' hook to navigate to the '/profile' route if the 'userId' is not available    
    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    // Define the 'setBookmarkData' function to fetch bookmark data and format it
    const setBookmarkData = async () => {
        const data = await Promise.all(userBookmarks
            .map(async (bookmark) => await getRestaurantById(bookmark)));

        const formattedData = data.map(bookmark => {
            const updatedBookmark = {...bookmark};
            updatedBookmark.isOpen = checkIsOpen(bookmark);
            return updatedBookmark;
        });

        setBookmarkedRestaurants(formattedData);
    };

    // Use the 'useEffect' hook to fetch and set bookmark data when 'userBookmarks' change
    useEffect(() => {
        if (!userId || !userBookmarks) return;

        setBookmarkData().then(() => {
            setBookmarkedRestaurants(bookmarkedRestaurants => bookmarkedRestaurants
                .sort(a => a.isOpen ? -1 : 1));

            setFetchStatus("idle");
        });
    }, [userBookmarks]);

    // Render the 'Bookmarks' component
    return (
        <div className="bookmarks-page-container">
            {/* Render the 'ProfileNavigationView' component with the 'pageTitle' prop */}
            <ProfileNavigationView pageTitle="Bookmarks"/>

            {/* Render the list of 'BookmarkCard' components if there are bookmarked restaurants */}
            {bookmarkedRestaurants.length > 0 && (
                <div className="bookmarks-view container">
                    {bookmarkedRestaurants.map(restaurant => (
                        <BookmarkCard key={restaurant.id} restaurant={restaurant}/>
                    ))}
                </div>
            )}

            {/* Render the 'NoResultsView' component if there are no bookmarked restaurants and the fetch status is 'idle' */}
            {!bookmarkedRestaurants.length && fetchStatus === "idle" && (
                <NoResultsView
                    mainText="You haven't bookmarked any restaurants yet."
                    subText="Bookmarked restaurants will appear here!"
                />
            )}
        </div>
    );
};

// Export the 'Bookmarks' component as the default export
export default Bookmarks;