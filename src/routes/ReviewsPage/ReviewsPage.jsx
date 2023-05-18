/*
 Description: Reviews page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./ReviewsPage.css";
// Import dependencies
import ReviewForm from "../../common/components/reviews/ReviewForm/ReviewForm";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import {useEffect, useState} from "react";
import {getRestaurantById, getReviewsByRestaurantId} from "../../firebase/firebase";
import {selectUserId} from "../../features/user/userSlice";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {selectAllRestaurants} from "../../features/restaurants/restaurantsSlice";
import {faChevronDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import SortFiltersView from "./SortFiltersView/SortFiltersView";
import OverlayView from "../../common/components/OverlayView/OverlayView";
import ReviewsList from "../../common/components/reviews/ReviewsList/ReviewsList";

// Sort reviews by most recent visit date
export const sortReviewsByMostRecentVisitDate = (reviews) => {
    return [...reviews].sort((a, b) => b.visitDate - a.visitDate);
};

const ReviewsPage = () => {

    const {id: restaurantId} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'userId', 'reviews' and 'allRestaurants' from the Redux store
    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);
    const allRestaurants = useSelector(selectAllRestaurants);

    // Declare state variables for the component
    const [displayedReviews, setDisplayedReviews] = useState(null);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [sortFiltersVisible, setSortFiltersVisible] = useState(false);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [searchHasMatches, setSearchHasMatches] = useState(true);
    const [activeFilter, setActiveFilter] = useState("Most recent");
    const [sortFilters, setSortFilters] = useState([
        {text: "Highest rated", active: false, type: "rating", multiplier: -1},
        {text: "Lowest rated", active: false, type: "rating", multiplier: 1},
        {text: "Most recent", active: true, type: "visitDate", multiplier: -1},
        {text: "Oldest", active: false, type: "visitDate", multiplier: 1}
    ]);

    // Show spinner if restaurant is not found
    useEffect(() => {
        if (!restaurant) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [restaurant]);

    // Get restaurant by id
    useEffect(() => {
        if (!allRestaurants) return;

        let foundRestaurant = allRestaurants.find(restaurant => restaurant.id === restaurantId);

        if (!foundRestaurant) {
            getRestaurantById(restaurantId)
                .then(data => setRestaurant(data));
        } else {
            setRestaurant(foundRestaurant);
        }
    }, [allRestaurants, restaurantId]);

    // Redirect to error page if restaurant is not found
    useEffect(() => {
        if (restaurant === undefined) {
            navigate('/error', {replace: true});
        }
    }, [restaurant, navigate]);

    // Get reviews by restaurant id
    useEffect(() => {
        if (!restaurantId || reviews?.length) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => dispatch(setReviews(sortReviewsByMostRecentVisitDate(reviewsFound))));
    }, [restaurantId, reviews]);

    // Set displayed reviews to all reviews
    useEffect(() => {
        if (!reviews) return;

        setDisplayedReviews(sortReviewsByMostRecentVisitDate(reviews));
    }, [reviews]);

    // Handle write review button click
    const handleWriteReviewClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            setIsReviewFormVisible(!isReviewFormVisible);
        }
    };

    // Handle overlay click
    const handleSortClick = () => {
        setSortFiltersVisible(sortFiltersVisible => !sortFiltersVisible);
    };

    // Handle search click
    const handleSearchClick = () => {
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    // Handle search input change
    const handleSearchInputChange = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        const results = reviews
            .filter(({title, content}) => title.toLowerCase().includes(lowerCaseQuery)
                || content.toLowerCase().includes(lowerCaseQuery));

        if (results.length) {
            setDisplayedReviews(results);
            setSearchHasMatches(true);
        } else {
            setDisplayedReviews(reviews);
            setSearchHasMatches(false);
        }
    };

    // Handle sort filter click
    const handleSortFilterClick = (text, type, multiplier) => {
        setActiveFilter(text);

        const changeFilterStatus = (filter, active) => {
            const updatedFilter = {...filter};
            updatedFilter.active = active;
            return updatedFilter;
        };

        setSortFilters(sortFilters => sortFilters
            .map(filter => changeFilterStatus(filter, filter.text === text)));

        setDisplayedReviews(displayedReviews => [...displayedReviews]
            .sort((a, b) => multiplier * (a[type] - b[type])));

        setSortFiltersVisible(false);
    };

    // Handle overlay click
    const handleOverlayClick = () => {
        setSortFiltersVisible(false);
    };

    // Log restaurant
    useEffect(() => {
        console.log("review page", {restaurant})
    }, [restaurant]);

    return (
        <div className="reviews-page">
            <ProfileNavigationView
                pageTitle="Reviews"
                button2={{
                    text: searchIsVisible ? "Cancel" : "Search",
                    icon: !searchIsVisible ? faMagnifyingGlass : null,
                    handler: handleSearchClick
                }}
                lowerNav={true}
                searchFunctionality={searchIsVisible}
                button3={{
                    text: isReviewFormVisible ? "Close Review Form" : "Write a Review",
                    handler: handleWriteReviewClick
                }}
                button4={{
                    text: activeFilter,
                    icon: faChevronDown,
                    handler: handleSortClick
                }}
                handleSearchInputChange={handleSearchInputChange}
                hasMatches={searchHasMatches}
            />

            {sortFiltersVisible && (
                <>
                    <SortFiltersView filters={sortFilters} handleClick={handleSortFilterClick}/>
                    <OverlayView handleClick={handleOverlayClick}/>
                </>
            )}

            <main className="container">
                {isReviewFormVisible && (
                    <ReviewForm
                        restaurant={restaurant}
                        userId={userId}
                        closeForm={() => setIsReviewFormVisible(false)}
                    />
                )}

                <ReviewsList restaurant={restaurant} reviews={displayedReviews} userId={userId}/>
            </main>
        </div>
    );
};

export default ReviewsPage;