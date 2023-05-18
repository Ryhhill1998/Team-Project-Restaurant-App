/*
Description: restaurantsSlice redux store used to store app state information regarding restaurants
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRestaurantById} from "../../firebase/firebase";

// initial state configuration
const initialState = {
    allRestaurants: null,
    restaurantResults: null,
    hasMatches: true,
    status: "idle", // idle, pending, success, fail
    error: null,
    lastPositionQueried: {
        longitude: null,
        latitude: null
    }
};

// url to fetch restaurants data - held on json server atm - must later be changed to API endpoint
// const fetchUrl = "http://localhost:8000/data";
// fetch 'Travel Advisor' API to gather restaurant data
const fetchUrl = "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";

export const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_TRAVEL_ADVISOR_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

// async function to fetch restaurants data
export const fetchRestaurants = createAsyncThunk(
    "restaurants/fetchRestaurants",
    async (data) => {
        const {latitude, longitude} = data;

        const query = fetchUrl + "?latitude=" + latitude + "&longitude=" + longitude +
            "&limit=20&currency=GBP&distance=1&open_now=true&lunit=km&lang=en_US";

        const response = await fetch(query, options);

        // const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error("The requested resource is not available. Check the URL is correct.");
        }

        const jsonData = await response.json();

        return {
            data: jsonData.data,
            position: {longitude, latitude},
        }
    }
);

/*
Function to filter data return by API
Must remove all entries that do not contain id, name, latitude, longitude, photo Url, distance, cuisine
Must check that all entries have the above fields in the correct format
Must remove all entries with the same location_id
*/
const filterData = (data) => {
    // used to remove duplicate locations
    const locationIds = new Set();

    return data.filter(entry => {
        const keepEntry = entry.location_id && !locationIds.has(entry.location_id) && entry.name
            && entry.latitude && entry.longitude && entry.photo?.images?.medium?.url && entry.rating
            && entry.distance && entry.hours?.week_ranges?.length === 7 && entry.cuisine;

        if (!keepEntry) return false;

        locationIds.add(entry.location_id);

        return keepEntry;
    });
};

/*
Function to format the filtered data from the API
Must include id, name, latitude, longitude, photoUrl, rating, distance, cuisine, hours
Price can be null if it does not exist
Longitude, latitude and rating are provided as strings so must be converted to numbers
Primary cuisine is the first cuisine in list
*/
const formatData = (data) => {
    return data.map(entry => {
        const {
            location_id: id,
            name,
            latitude,
            longitude,
            photo,
            distance,
            rating,
            price,
            price_level,
            hours,
            cuisine,
            description,
            website,
            phone,
            address_obj: {
                street1,
                street2,
                city,
                postalcode,
            },
            dietary_restrictions,
        } = entry;

        return {
            id,
            name,
            latitude: +latitude,
            longitude: +longitude,
            photoUrl: photo.images.medium.url,
            distance,
            rating: +rating,
            price: price ? price : "",
            priceLevel: price_level ? price_level : "",
            hours: formatHours(hours),
            minutes: formatMinutes(hours),
            primaryCuisine: cuisine.length > 0 ? cuisine[0].name : "",
            cuisines: cuisine,
            description: description ? description : "",
            website: website ? website : "",
            phone: phone ? phone : "",
            address: {
                street1: street1 ? street1 : "",
                street2: street2 ? street2 : "",
                city: city ? city : "",
                postalcode: postalcode ? postalcode : ""
            },
            dietaryRestrictions: dietary_restrictions.map(({name: dietaryType}) => dietaryType),
        };
    });
};

// function to process the data returned by the API by filtering and formatting it
const processData = (data) => {
    const filteredData = filterData(data);
    return formatData(filteredData);
};

// function to format the open hours of restaurant data returned by API
const formatHours = (hours) => {

    if (!hours) return null;

    const {week_ranges: weekRanges} = hours;

    if (!weekRanges || weekRanges.length !== 7) return null;

    return weekRanges.map(range => {
        if (range.length === 0) return "Closed";

        return range
            .map(({open_time, close_time}) => `${formatTime(open_time)} - ${formatTime(close_time)}`)
            .join(', ');
    });
};

// function to format the open hours given in minutes into a flat array for simple storage
const formatMinutes = (minutes) => {
    if (!minutes) return null;

    const {week_ranges: weekRanges} = minutes;

    if (!weekRanges || weekRanges.length !== 7) return null;

    return weekRanges.map(range => {
        if (range.length === 0) return "Closed";

        return range
            .map(({open_time, close_time}) => `${open_time} - ${close_time}`)
            .join(', ');
    });
};

// helper function to format a time string to a "hh:mm" format
const formatTime = (time) => {
    if (!time) return "N/A";

    const wrappedTime = time % 1440;
    const hours = Math.floor(wrappedTime / 60);
    const minutes = wrappedTime % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const getAveragePrice = (priceString) => {
    if (!priceString) return null;

    const priceBounds = priceString
        .replaceAll("£", "")
        .replace(/\s+/g, "")
        .split("-");

    if (priceBounds.length === 1) return priceBounds[0];

    return (+priceBounds[0] + +priceBounds[1]) / 2;
};

const getSearchResults = (searchQuery, restaurants) => {
    if (!searchQuery) {
        return restaurants;
    }
    // Convert searchQuery to lowercase for case-insensitive comparison
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    // Filter restaurants based on the searchQuery
    return restaurants.filter((restaurant) => {
        const nameMatch = restaurant.name.toLowerCase().includes(lowerCaseSearchQuery);
        const cuisineMatch = restaurant.cuisines.some(cuisine =>
            cuisine.name.toLowerCase().includes(lowerCaseSearchQuery)
        );
        /*Potentially add dietary restrictions into search filter*/
        return nameMatch || cuisineMatch;
    });
};

// Create and export the restaurants slice
export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        // Sort restaurants based on the provided sort criteria
        sortRestaurants: (state, action) => {
            const sortBy = action.payload?.toLowerCase();
            const results = state.restaurantResults;

            if (sortBy === "rating") {
                state.restaurantResults = results.sort((a, b) => b.rating - a.rating);
            } else if (sortBy === "distance") {
                state.restaurantResults = results.sort((a, b) => a.distance - b.distance);
            } else if (sortBy === "price") {
                state.restaurantResults = results.sort(({price: a}, {price: b}) => (
                    getAveragePrice(a) - getAveragePrice(b)
                ));
            }
        },
        // Filter restaurants based on the provided cuisine filter
        filterRestaurantResultsByCuisine: (state, action) => {
            const cuisineFilter = action.payload.toLowerCase();

            state.restaurantResults = state.allRestaurants
                .filter(restaurant => cuisineFilter === "any" || restaurant.cuisines
                    .find(cuisine => cuisine.name.toLowerCase().includes(cuisineFilter)));
        },
        // Filter restaurants based on the provided search query
        filterResultsBySearchQuery: (state, action) => {
            const query = action.payload.trim().toLowerCase(); // removes all spaces from the search query
            const results = getSearchResults(query, state.allRestaurants);
            const hasMatches = results.length > 0;
            state.hasMatches = hasMatches;
            state.restaurantResults = hasMatches ? results : state.allRestaurants;
        },
        // Set the restaurants in the state
        setRestaurants: (state, action) => {
            const restaurants = action.payload;
            state.allRestaurants = restaurants;
            state.restaurantResults = restaurants;
        },
        // Reset the restaurant results to the initial state
        resetRestaurantResults: state => {
            state.restaurantResults = state.allRestaurants;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRestaurants.pending, (state, action) => {
                state.status = "pending"; // indicates fetch request has begun
                state.error = null; // reset error
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.status = "success"; // indicates fetch was successful

                const {data, position} = action.payload;

                if (data?.length) {
                    const processedData = processData(data);

                    state.allRestaurants = processedData;
                    state.restaurantResults = processedData;
                } else {
                    state.allRestaurants = [];
                    state.restaurantResults = [];
                }

                state.status = "idle";
                state.lastPositionQueried = position;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.status = "fail"; // indicates fetch failed
                state.error = action.error.message; // sets error to error message returned
            });
    }
});

// Export actions from the restaurants slice
export const {
    sortRestaurants,
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    filterResultsBySearchQuery,
    setRestaurants
} = restaurantsSlice.actions;
// Export selectors for the restaurants slice
export const selectRestaurants = state => state.restaurants.restaurantResults;
export const selectAllRestaurants = state => state.restaurants.allRestaurants;
export const selectHasMatches = state => state.restaurants.hasMatches;
export const selectRestaurantsFetchStatus = state => state.restaurants.status;
export const selectLastPositionQueried = state => state.restaurants.lastPositionQueried;
export default restaurantsSlice.reducer