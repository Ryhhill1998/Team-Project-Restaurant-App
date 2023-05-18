/*
 Description:  Profile page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./ProfilePage.css";
// Import dependencies
import {Link, useNavigate} from "react-router-dom";
import UserIconView from "../../common/components/UserIconView/UserIconView";
import {useDispatch, useSelector} from "react-redux";
import {
    resetDisplayedFriend,
    selectDisplayName,
    selectProfilePhotoUrl,
    selectUserId,
} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faCamera,
    faCircleCheck,
    faComment, faCopy, faPen, faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {signOutAuthUser} from "../../firebase/firebase";
import {useEffect, useState} from "react";
import ContributionsButton from "./ContributionsButton/ContributionsButton";
import {hideSpinner} from "../../features/spinner/spinnerSlice";
import PrimaryButtonView from "../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";

const ProfilePage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Get the 'userId', 'displayName', and 'profilePhotoUrl' from the Redux store
    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);
    // Declare state variables for the component
    const [idCopied, setIdCopied] = useState(false);

    // Reset displayed friend on mount
    useEffect(() => {
        dispatch(resetDisplayedFriend());

        if (!userId) {
            navigate("/sign-in")
        }

        dispatch(hideSpinner());
    }, []);

    // Handle back button click
    const handleBackClick = () => {
        navigate("/");
    };

    // Handle sign out button click
    const handleSignOutClick = async () => {
        await signOutAuthUser();
    };

    // Handle copy user ID button click
    const handleCopyIdClick = () => {
        navigator.clipboard.writeText(userId + "")
            .then(() => setIdCopied(true));
    };

    return (
        <div className="profile-page-container">
            <ProfileNavigationView pageTitle="Profile" button1={{text: "Home", handler: handleBackClick}}/>

            <main className="container">
                <section className="profile-info-container">
                    <div className="user-icon-container">
                        <UserIconView
                            size="xLarge"
                            imageUrl={profilePhotoUrl}
                        />
                    </div>

                    <p style={{visibility: displayName ? "visible" : "hidden"}}>{displayName || "display name"}</p>

                    <PrimaryButtonView
                        text={idCopied ? "Copied" :"Copy user ID"}
                        handleClick={handleCopyIdClick}
                        width="fit-content"
                        icon={idCopied ? faCircleCheck : faCopy}
                        size="small"
                        margin="1em auto 0"
                    />
                </section>

                <section className="contributions-container">
                    <ContributionsButton route="/bookmarks" icon={faBookmark} name="Bookmarks"/>

                    <ContributionsButton route="/check-ins" icon={faCircleCheck} name="Check ins"/>

                    <ContributionsButton route="/preview-reviews" icon={faComment} name="Reviews"/>
                </section>

                <section className="options-container">
                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faPen}/>
                        Edit profile
                    </Link>

                    <Link to="/photos">
                        <FontAwesomeIcon className="icon" icon={faCamera}/>
                        Photos
                    </Link>

                    <Link to="/friends">
                        <FontAwesomeIcon className="icon" icon={faUserGroup}/>
                        Friends
                    </Link>
                </section>

                <section>
                    <PrimaryButtonView handleClick={handleSignOutClick} text="Sign out" size="large"/>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;