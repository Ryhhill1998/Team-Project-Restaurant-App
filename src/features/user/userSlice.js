/*
 Description: Redux slice for user
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import the necessary function from Redux Toolkit
import {createSlice} from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
    id: JSON.parse(localStorage.getItem("userId")),
    displayName: "",
    email: "",
    phone: "",
    iconColour: "",
    profilePhotoUrl: "",
    recommendations: [],
    bookmarks: [],
    friends: [],
    friendRequests: [],
    friendsSortFilter: "Most recent",
    displayedFriend: null,
};

// Create and export the user slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Set the user ID in the state
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        // Set the user details in the state
        setUserDetails: (state, action) => {
            const {
                id,
                displayName,
                email,
                phone,
                iconColour,
                profilePhotoUrl,
                recommendations,
                bookmarks,
            } = action.payload;

            state.id = id;
            state.displayName = displayName || "";
            state.email = email || "";
            state.phone = phone || "";
            state.iconColour = iconColour || "";
            state.profilePhotoUrl = profilePhotoUrl || null;
            state.recommendations = recommendations || [];
            state.bookmarks = bookmarks || [];
        },
        // Reset the user details in the state
        resetUserDetails: state => {
            state.id = null;
            state.displayName = "";
            state.email = "";
            state.phone = "";
            state.iconColour = null;
            state.profilePhotoUrl = "";
            state.recommendations = [];
            state.bookmarks = [];
            state.friends = [];
            state.friendRequests = [];
            state.friendsSortFilter = "Most recent";
            state.displayedFriend = null;
        },
        // Set the user display name in the state
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        // Set the user email in the state
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        // Set the user phone in the state
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        // Set the user icon colour in the state
        setIconColour: (state, action) => {
            state.iconColour = action.payload;
        },
        // Set the user profile photo URL in the state
        setProfilePhotoUrl: (state, action) => {
            state.profilePhotoUrl = action.payload;
        },
        // Add a recommendation to the user's recommendations in the state
        addRecommendation: (state, action) => {
            state.recommendations.push(action.payload);
        },
        // Remove a recommendation from the user's recommendations in the state
        removeRecommendation: (state, action) => {
            state.recommendations = state.recommendations.filter(recommendation => recommendation !== action.payload);
        },
        // Add a bookmark to the user's bookmarks in the state
        addBookmark: (state, action) => {
            state.bookmarks.push(action.payload);
        },
        // Remove a bookmark from the user's bookmarks in the state
        removeBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark !== action.payload);
        },
        // Set the user's friends in the state
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        // Remove a friend from the user's friends in the state
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload)
        },
        // Set the user's friend requests in the state
        setFriendRequests: (state, action) => {
            state.friendRequests = action.payload;
        },
        // Remove a friend request from the user's friend requests in the state
        removeFriendRequest: (state, action) => {
            state.friendRequests = state.friendRequests.filter(request => request.id !== action.payload)
        },
        // Sort the user's friends in the state
        sortFriends: (state, action) => {
            const {text, filter, multiplier} = action.payload;
            state.friends = [...state.friends].sort((a, b) => multiplier * (a[filter] - b[filter]));
            state.friendsSortFilter = text;
        },
        // Sort the user's friend requests in the state
        sortFriendRequests: (state, action) => {
            const {text, filter, multiplier} = action.payload;
            state.friendRequests = [...state.friendRequests]
                .sort((a, b) => multiplier * (a[filter] - b[filter]));
            state.friendsSortFilter = text;
        },
        // Set the displayed friend in the state
        setDisplayedFriend: (state, action) => {
            state.displayedFriend = action.payload;
        },
        // Reset the displayed friend in the state
        resetDisplayedFriend: state => {
            state.displayedFriend = null;
        }
    },
});

// Export the actions and selectors from the user slice
export const {
    setUserId,
    setUserDetails,
    resetUserDetails,
    setDisplayName,
    setEmail,
    setPhone,
    setIconColour,
    addRecommendation,
    removeRecommendation,
    addBookmark,
    removeBookmark,
    setFriends,
    removeFriend,
    setFriendRequests,
    removeFriendRequest,
    sortFriends,
    sortFriendRequests,
    setProfilePhotoUrl,
    setDisplayedFriend,
    resetDisplayedFriend
} = userSlice.actions;
// Selectors
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectEmail = state => state.user.email;
export const selectPhone = state => state.user.phone;
export const selectIconColour = state => state.user.iconColour;
export const selectRecommendations = state => state.user.recommendations;
export const selectBookmarks = state => state.user.bookmarks;
export const selectFriends = state => state.user.friends;
export const selectFriendRequests = state => state.user.friendRequests;
export const selectFriendsSortFilter = state => state.user.friendsSortFilter;
export const selectProfilePhotoUrl = state => state.user.profilePhotoUrl;
export const selectDisplayedFriend = state => state.user.displayedFriend;

// Export the user reducer
export default userSlice.reducer;