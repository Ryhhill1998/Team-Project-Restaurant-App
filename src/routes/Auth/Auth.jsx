/*
 Description: Auth component which renders the Outlet component
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import necessary dependancies from 'react-router-dom' and 'react-redux'
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
// Import the 'selectUserId' selector from the userSlice
import {selectUserId} from "../../features/user/userSlice";
// Import the 'useEffect' hook from React
import {useEffect} from "react";

// Define the 'Auth' component
const Auth = () => {
    // Get the 'navigate' function from the 'useNavigate' hook
    const navigate = useNavigate();

    // Get the current user's ID from the Redux store using the 'selectUserId' selector
    const userId = useSelector(selectUserId);

    // Use the 'useEffect' hook to run navigation when the userId changes
    useEffect(() => {
        // If 'userId' exists, navigate the the '/profile' route; otherwise navigate to the '/sign-in' route
        navigate(userId ? "/profile" : "/sign-in");
    }, [userId]);

    // Render the 'Outlet' component, which will render any nested routes in the application
    return (
        <>
            <Outlet/>
        </>
    );
};

// Export the 'Auth' component as the default export
export default Auth;