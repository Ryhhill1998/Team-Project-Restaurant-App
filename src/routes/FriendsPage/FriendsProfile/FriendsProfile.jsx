/*
 Description: Friends profile page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import './FriendsProfile.css';
// Import dependencies
import FriendContributionsButton from './FriendContributionsButton/FriendContributionsButton';
import {useNavigate} from "react-router-dom";
import UserIconView from '../../../common/components/UserIconView/UserIconView';
import {
    faComment,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import ProfileNavigationView from "../../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import {useSelector} from "react-redux";
import {selectDisplayedFriend} from "../../../features/user/userSlice";

const FriendsProfile = () => {

    const navigate = useNavigate();
    // Get the 'displayedFriend' from the Redux store
    const displayedFriend = useSelector(selectDisplayedFriend);

    return (
        <div className="friends-profile-page-container">
            {displayedFriend && (
                <>
                    <ProfileNavigationView
                        pageTitle={`${displayedFriend.displayName.split(" ")[0]}'s Profile`}
                        button1={{handler: () => navigate("/friends")}}
                    />

                    <main className="container">
                        <section className="friends-profile-info-container">
                            <div className="user-icon-container">
                                <UserIconView
                                    size="xLarge"
                                    imageUrl={displayedFriend.profilePhotoUrl}
                                />
                            </div>

                            <p
                                style={{visibility: displayedFriend.displayName ? "visible" : "hidden"}}
                            >
                                {displayedFriend.displayName || "display name"}
                            </p>
                        </section>

                        <section className="contributions-container">
                            <FriendContributionsButton
                                userId={displayedFriend.id}
                                route={`/view-friends/${displayedFriend.id}`}
                                icon={faUserGroup}
                                name="Friends"
                            />

                            <FriendContributionsButton
                                userId={displayedFriend.id}
                                route="/view-reviews/:userId"
                                icon={faComment}
                                name="Reviews"
                            />
                        </section>
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsProfile;