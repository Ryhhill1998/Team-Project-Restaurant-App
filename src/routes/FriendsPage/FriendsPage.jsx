/*
 Description: Friends page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import "./FriendsPage.css";
// Import dependencies
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectFriendRequests, selectFriends} from "../../features/user/userSlice";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import {faCircleCheck, faLink, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import FriendRequestCard from "./FriendCards/FriendRequestCard/FriendRequestCard";
import PendingFriendCard from "./FriendCards/PendingFriendCard/PendingFriendCard";
import ConfirmedFriendCard from "./FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";
import AddFriendPopupView from "./AddFriendPopupView/AddFriendPopupView";
import NoResultsView from "../../common/components/NoResultsView/NoResultsView";

const FriendsPage = () => {

    const navigate = useNavigate();
    // Get the 'friends' and 'friendRequests' from the Redux store
    const friends = useSelector(selectFriends);
    const friendRequests = useSelector(selectFriendRequests);

    // State variables
    const [display, setDisplay] = useState("friends");
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [displayedFriendRequests, setDisplayedFriendRequests] = useState([]);
    const [searchHasMatches, setSearchHasMatches] = useState(true);
    const [navButton2IsVisible, setNavButton2IsVisible] = useState(null);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [inviteCopied, setInviteCopied] = useState(false);

    // Set displayed friends
    useEffect(() => {
        if (!friends?.length) {
            setDisplayedFriends([]);
            return;
        }

        setDisplayedFriends(friends);
    }, [friends]);

    // Set displayed friend requests
    useEffect(() => {
        if (!friendRequests?.length) {
            setDisplayedFriendRequests([]);
            return;
        }

        setDisplayedFriendRequests(friendRequests);
    }, [friendRequests]);

    // Set page display
    useEffect(() => {
        if (display === "friends") {
            if (friends.length) {
                setNavButton2IsVisible(true);
            } else {
                setNavButton2IsVisible(false);
            }
        } else {
            if (friendRequests.length) {
                setNavButton2IsVisible(true);
            } else {
                setNavButton2IsVisible(false);
            }
        }
    }, [display, friends, friendRequests]);

    // Calculate mutual friends
    const calculateMutualFriends = (userFriends) => {
        let mutualFriends = 0;

        userFriends?.forEach(({userId: friendId, status}) => {
            if (status === "confirmed" && friends.some(f => f.id === friendId)) {
                mutualFriends++;
            }
        });

        return mutualFriends;
    };

    // Handle invite click
    const handleInviteClick = async () => {
        await navigator.clipboard.writeText("Hi! I'm using the web app FOOD FIESTA and would like you " +
            "to join! \n\nFollow the link below and create an account: " +
            "\nhttps://restaurant-app-team22.netlify.app/sign-in");

        setInviteCopied(true);
    };

    // Handle search click
    const handleSearchClick = () => {
        setDisplayedFriends(friends);
        setDisplayedFriendRequests(friendRequests);
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    // Handle search input change
    const handleSearchInputChange = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        if (display === "friends") {
            const searchResults = displayedFriends
                .filter(({displayName}) => displayName.toLowerCase().includes(lowerCaseQuery));

            if (searchResults.length) {
                setDisplayedFriends(searchResults);
                setSearchHasMatches(true);
            } else {
                console.log("no results")
                setDisplayedFriends(friends);
                setSearchHasMatches(false);
            }
        } else {
            const searchResults = displayedFriendRequests
                .filter(({displayName}) => displayName.toLowerCase().includes(lowerCaseQuery));

            if (searchResults.length) {
                setDisplayedFriendRequests(searchResults);
                setSearchHasMatches(true);
            } else {
                setDisplayedFriendRequests(friendRequests);
                setSearchHasMatches(false);
            }
        }
    };

    // Handle change display
    const handleChangeDisplay = () => {
        setDisplay(display => display === "friends" ? "requests" : "friends");
    };

    return (
        <div className="friends-page-container">
            <ProfileNavigationView
                pageTitle={display}
                button1={{
                    handler: () => navigate("/profile")
                }}
                button2={!navButton2IsVisible ? null : {
                    text: searchIsVisible ? "Cancel" : "Search",
                    icon: !searchIsVisible ? faMagnifyingGlass : null,
                    handler: handleSearchClick
                }}
                lowerNav={true}
                toggleDisplayText={display === "friends" ? "Requests" : "Friends"}
                toggleHandler={handleChangeDisplay}
                count={display === "friends" ?
                    (friendRequests?.length ? friendRequests?.length : 0)
                    :
                    (friends?.length ? friends?.length : 0)
                }
                searchFunctionality={searchIsVisible}
                button3={{
                    text: "Add",
                    icon: faPlus,
                    handler: () => setAddPopupIsVisible(true)
                }}
                button4={{
                    text: inviteCopied ? "Copied" : "Invite",
                    icon: inviteCopied ? faCircleCheck : faLink,
                    handler: handleInviteClick
                }}
                handleSearchInputChange={handleSearchInputChange}
                hasMatches={searchHasMatches}
            />

            <main className="container">
                {addPopupIsVisible && (
                    <AddFriendPopupView closePopup={() => setAddPopupIsVisible(false)}/>
                )}

                {display === "requests" && (displayedFriendRequests?.length ? (
                    displayedFriendRequests
                        .map(({id, displayName, iconColour, profilePhotoUrl, friends: userFriends}) => (
                        <FriendRequestCard
                            key={id}
                            id={id}
                            displayName={displayName}
                            iconColour={iconColour}
                            profilePhotoUrl={profilePhotoUrl}
                            mutualFriends={calculateMutualFriends(userFriends)}
                        />
                    ))) : (
                    <NoResultsView mainText="You do not currently have any friend requests" />
                ))}


                {display === "friends" && (displayedFriends?.length ? (
                    <div className="friend-icons-container">
                        {[...displayedFriends]
                            .sort((a, b) => {
                                if (a.status === "pending") {
                                    return -1;
                                } else if (b.status === "pending") {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })
                            .map(({id, displayName, iconColour, profilePhotoUrl, status, friends: userFriends}) => {
                                if (status === "pending") {
                                    return (
                                        <PendingFriendCard
                                            key={id}
                                            id={id}
                                            displayName={displayName}
                                            iconColour={iconColour}
                                            profilePhotoUrl={profilePhotoUrl}
                                            mutualFriends={calculateMutualFriends(userFriends)}
                                        />
                                    )
                                } else {
                                    return (
                                        <ConfirmedFriendCard
                                            key={id}
                                            id={id}
                                            displayName={displayName}
                                            iconColour={iconColour}
                                            profilePhotoUrl={profilePhotoUrl}
                                            mutualFriends={calculateMutualFriends(userFriends)}
                                        />
                                    )
                                }
                            })}
                    </div>
                ) : (
                    <NoResultsView
                        mainText="You do not currently have any friends"
                        subText="Ask a friend to send you their user ID and use the add button above to add them"
                    />
                ))}
            </main>
        </div>
    );
};

export default FriendsPage;