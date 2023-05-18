/*
 Description: BookmarkCard component rendered in the 'bookmarks' route
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// stylesheet
import "./BookmarkCard.css";
// Import the 'RestaurantCard' component from the common components folder
import RestaurantCardView from "../../../common/components/RestaurantCard/RestaurantCardView";
// Import the 'ClosedSign' component
import ClosedSign from "./ClosedSign/ClosedSign";

const BookmarkCard = ({restaurant}) => {
    // Destructure the 'isOpen' property from the 'restaurant' object
    const {isOpen} = restaurant;

      // Render a 'div' element with the 'bookmark-card' class
    return (
        <div className="bookmark-card">
            {/* If the restaurant is not open, render the 'ClosedSign' component */}
            {!isOpen && <ClosedSign/>}

            {/* Render the 'RestaurantCard' component, passing the 'restaurant' object as a prop
          and the 'isOpen' value to the 'open' prop */}
            <RestaurantCardView restaurant={restaurant} open={isOpen}/>
        </div>
    );
};

// Export the 'BookmarkCard' component as the default export
export default BookmarkCard;