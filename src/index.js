/*
Description: Root js file
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

import React from 'react';
import ReactDOM from 'react-dom/client';

// react router imports
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// redux imports
import store from './app/store'
import {Provider} from 'react-redux'

import reportWebVitals from './reportWebVitals';

// stylesheet
import './style/index.css';

// import all components
import HomePage from "./routes/HomePage/HomePage";
import MapPage from "./routes/MapPage/MapPage";
import ErrorPage from './routes/ErrorPages/ErrorPage';
import DetailsPage from './routes/DetailsPage/DetailsPage';
import Root from "./routes/Root";
import EditProfilePage from "./routes/EditProfilePage/EditProfilePage";
import SignUpPage from './routes/SignUp/SignUpPage';
import SignInPage from "./routes/SignIn/SignInPage";
import Auth from "./routes/Auth/Auth";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import Bookmarks from "./routes/Bookmarks/Bookmarks";
import CheckIns from "./routes/CheckIns/CheckIns";
import PreviewReviews from "./routes/PreviewReviews/PreviewReviews";
import ReviewsPage from "./routes/ReviewsPage/ReviewsPage";
import FriendsPage from "./routes/FriendsPage/FriendsPage";
import FriendsProfile from "./routes/FriendsPage/FriendsProfile/FriendsProfile";
import FriendsReviews from './routes/FriendsPage/FriendsProfile/FriendsReviews/FriendsReviews';
import FriendsOfFriendsPage from './routes/FriendsPage/FriendsProfile/FriendsOfFriendsPage/FriendsOfFriendPage';
import PhotosPage from "./routes/PhotosPage/PhotosPage";

// create routes using react router browser router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "details/:id",
                element: <DetailsPage/>,
            },
            {
                path: "reviews/:id",
                element: <ReviewsPage/>,
            },
            {
                path: "map",
                element: <MapPage/>,
            },
            {
                element: <Auth/>,
                children: [
                    {
                        path: "sign-in",
                        element: <SignInPage/>,
                    },
                    {
                        path: "sign-up",
                        element: <SignUpPage/>
                    },
                    {
                        path: "profile",
                        element: <ProfilePage/>,
                    },
                    {
                        path: "edit-profile",
                        element: <EditProfilePage/>,
                    },
                    {
                        path: "bookmarks",
                        element: <Bookmarks/>
                    },
                    {
                        path: "check-ins",
                        element: <CheckIns/>,
                    },
                    {
                        path: "preview-reviews",
                        element: <PreviewReviews/>,
                    },
                    {
                        path: "friends",
                        element: <FriendsPage/>,
                    },
                    {
                        path: "photos",
                        element: <PhotosPage/>,
                    },
                    {
                        path: "view-profile/:userId",
                        element: <FriendsProfile/>,
                    },
                    {
                        path: "view-friends/:userId",
                        element: <FriendsOfFriendsPage/>,
                    },
                    {
                        path: "view-reviews/:userId",
                        element: <FriendsReviews/>,
                    },
                ]
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
