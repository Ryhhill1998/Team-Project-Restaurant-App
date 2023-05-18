/*
 Description: Root component of the application.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import dependencies
import SpinnerView from "../common/components/SpinnerView/SpinnerView";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";
import useInitialiseSlider from "../common/hooks/useInitialiseSlider";

import {onAuthStateChanged} from "firebase/auth";
import {auth, getFriendRequestsByUserId, getFriendsByUserId, getUserFromUserId} from "../firebase/firebase";
import {useEffect} from "react";
import {
    resetUserDetails,
    selectUserId,
    setFriendRequests,
    setFriends,
    setUserDetails,
    setUserId
} from "../features/user/userSlice";

const Root = () => {

    const dispatch = useDispatch();

    // Fetch and filter restaurants, and initialise slider on component mount
    useFetchRestaurants();
    useFilterRestaurants();
    useInitialiseSlider();

    // Get the 'spinnerIsVisible' and 'userId' from the Redux store
    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);
    // Get the 'userId' from the Redux store
    const userId = useSelector(selectUserId);

    // Function to fetch and store the user's details, friends, and friend requests in the Redux store
    const storeUserDetails = async (id) => {
        const userDetails = await getUserFromUserId(id);

        if (userDetails) {
            dispatch(setUserDetails(userDetails));
        }

        const friends = await getFriendsByUserId(id);

        if (friends) {
            dispatch(setFriends(friends));
        }

        const friendRequests = await getFriendRequestsByUserId(id);

        if (friendRequests) {
            dispatch(setFriendRequests(friendRequests));
        }
    };

    // Check if the user is logged in on component mount and whenever the auth state changes
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                dispatch(resetUserDetails());
                localStorage.removeItem("userId");
            } else {
                const userId = user.uid;
                dispatch(setUserId(userId));
                localStorage.setItem("userId", JSON.stringify(userId));
            }
        });
    }, []);

    // Fetch and store the user's details whenever the user ID changes
    useEffect(() => {
        if (userId) {
            storeUserDetails(userId);
        }
    }, [userId]);

     // Modify body overflow style based on spinner visibility to prevent scroll when spinner is visible
    useEffect(() => {
        document.body.style.overflow = (spinnerIsVisible) ? "hidden" : "visible";
    }, [spinnerIsVisible]);

    return (
        <>
            {spinnerIsVisible && <SpinnerView/>}
            <Outlet/>
        </>
    );
};

export default Root;