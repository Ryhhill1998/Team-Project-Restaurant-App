/*
 Description: This file contains the DetailsPage component, which is a route component.
 It renders the details page for a restaurant.
 Author: George Ball
 Contact: georgeball14@hotmail.com
 */
// stylesheet
import './DetailsPage.css';
// imports
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllRestaurants} from '../../features/restaurants/restaurantsSlice';
import {useState, useEffect, useRef} from 'react';
import BannerView from "./BannerView/BannerView";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {selectUserId} from "../../features/user/userSlice";
import {checkIsOpen} from "../Bookmarks/Bookmarks";
import {getRestaurantById} from "../../firebase/firebase";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import DetailsNavLink from "./DetailsNavLink/DetailsNavLink";
import AdditionalDetailsView from "./AdditionalDetailsView/AdditionalDetailsView";
import HoursSection from "./HoursSection/HoursSection";
import ImageAndInfoView from "./ImageAndInfoView/ImageAndInfoView";
import InteractionsView from "./InteractionsView/InteractionsView";
import WebsiteView from "./WebsiteView/WebsiteView";
import AboutView from "./AboutView/AboutView";
import {
    selectBookmarkInteractions, selectCheckInInteractions,
    selectRecommendationInteractions,
    setInteractions
} from "../../features/interactions/interactionsSlice";
// Navigation links text
const navLinksText = ["Interactions", "Website", "About", "Hours", "Details", "Reviews"];

const DetailsPage = () => {
// Get the ID from the URL params
    const {id} = useParams();

    // Use the navigation hook
    const navigate = useNavigate();
    // Use Redux hooks to get data from the store
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const allRestaurants = useSelector(selectAllRestaurants);
    const recommendations = useSelector(selectRecommendationInteractions);
    const bookmarks = useSelector(selectBookmarkInteractions);
    const checkIns = useSelector(selectCheckInInteractions);

    // Refs for different sections of the page
    const bannerRef = useRef(null);
    const nameRef = useRef(null);
    const interactionsRef = useRef(null);
    const websiteRef = useRef(null);
    const aboutRef = useRef(null);
    const hoursRef = useRef(null);
    const detailsRef = useRef(null);
    const reviewsRef = useRef(null);

    // State variables
    const [restaurant, setRestaurant] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeNavLink, setActiveNavLink] = useState("Interactions");
    const [navigationStyle, setNavigationStyle] = useState({top: 0});
    const [showNameInBanner, setShowNameInBanner] = useState(false);

    useEffect(() => {
         // Show spinner if restaurant data is not loaded, hide it otherwise
        if (!restaurant) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [restaurant]);

    useEffect(() => {
        // Fetch restaurant data if not available in the Redux store
        if (!allRestaurants) return;

        let foundRestaurant = allRestaurants.find(restaurant => restaurant.id === id);

        if (!foundRestaurant) {
            getRestaurantById(id)
                .then(data => setRestaurant(data));
        } else {
            setRestaurant(foundRestaurant);
        }
    }, [allRestaurants, id]);

    useEffect(() => {
        // Redirect to error page if the restaurant data is undefined
        if (restaurant === undefined) {
            navigate('/error', {replace: true});
        }
    }, [restaurant, navigate]);

    useEffect(() => {
        // Fetch interactions data for the current restaurant
        if (!restaurant) return;

        getRestaurantById(restaurant.id)
            .then(data => {
                if (!data) return;

                const {recommendations, bookmarks, checkIns} = data;
                dispatch(setInteractions({recommendations, bookmarks, checkIns}));
            });
    }, [restaurant]);

    useEffect(() => {
        // Set the navigation style
        if (!bannerRef.current) return;

        setNavigationStyle(navigationStyle => {
            const style = {...navigationStyle};
            style.top = bannerRef.current.offsetHeight - 2;
            return style;
        });
    }, [bannerRef.current]);

    useEffect(() => {
        // Set the active navigation link
        const handleScroll = () => {
            const {scrollY} = window;
            setScrollPosition(scrollY);

            let previousTop = 0;

            const bannerHeight = document.getElementById("banner")?.getBoundingClientRect().height;
            const navHeight = document.getElementById("details-page-nav")?.getBoundingClientRect().height;
            const adjustment = bannerHeight + navHeight;

            const activeSection = [interactionsRef, websiteRef, aboutRef, hoursRef, detailsRef, reviewsRef]
                .find(({current}) => {
                    if (!current) return false;

                    const sectionBottom = current.offsetTop - adjustment + current.offsetHeight;
                    const sectionIsActive = scrollY > previousTop && scrollY <= sectionBottom;

                    if (sectionIsActive) {
                        return true;
                    } else {
                        previousTop = sectionBottom;
                        return false;
                    }
                })
                ?.current;

            if (activeSection) {
                setActiveNavLink(activeSection.id);
            }

            if (nameRef?.current?.getBoundingClientRect()?.bottom - bannerHeight <= 0) {
                setShowNameInBanner(true);
            } else {
                setShowNameInBanner(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!restaurant) {
        return <></>;
    }
    // Destructure the restaurant data
    const {
        name,
        photoUrl,
        rating,
        hours,
        website,
        description,
        phone,
        price,
        priceLevel,
        primaryCuisine,
        dietaryRestrictions,
        address
    } = restaurant;

    const {street1, city, postalcode: postalCode} = address;

    const starRating = Math.round(rating * 2) / 2;

    const isOpen = checkIsOpen(restaurant);

    const formattedAddress = `${street1}${city ? `, ${city}` : ""}${postalCode ? `, ${postalCode}` : ""}`;

    const handleNavLinkClick = (text) => {
        // Scroll to the section when the navigation link is clicked
        const elementRef = [interactionsRef, websiteRef, aboutRef, hoursRef, detailsRef, reviewsRef]
            .find(({current}) => current.id === text)?.current;

        if (!elementRef) return;

        const elementPosition = elementRef.offsetTop;
        const bannerHeight = document.getElementById("banner").getBoundingClientRect().height;
        const navHeight = document.getElementById("details-page-nav").getBoundingClientRect().height;

        window.scrollTo({
            top: elementPosition - (bannerHeight + navHeight + 5),
            behavior: "smooth"
        });
    };

    const updateInteractions = (interaction, change) => {
        // Update the interactions data in the Redux store
        setInteractions(interactions => {
           const updatedInteractions = {...interactions};
           updatedInteractions[interaction] += change;
            console.log({updatedInteractions})
           return updatedInteractions;
        });
    };

    return (
        <div className="details-page container">
            <BannerView
                ref={bannerRef}
                restaurant={restaurant}
                scrollPosition={scrollPosition}
                showName={showNameInBanner}
                updateInteractions={updateInteractions}
            />

            <ImageAndInfoView
                ref={nameRef}
                id={id}
                name={name}
                photoUrl={photoUrl}
                starRating={starRating}
                price={price}
                priceLevel={priceLevel}
                formattedAddress={formattedAddress}
                phone={phone}
                isOpen={isOpen}
                restaurant={restaurant}
                updateInteractions={updateInteractions}
            />

            <div id="details-page-nav" className="details-page-navigation" style={navigationStyle}>
                {navLinksText.map((text, i) => (
                    <DetailsNavLink
                        key={i}
                        active={activeNavLink === text}
                        handleClick={handleNavLinkClick}
                        text={text}
                    />
                ))}
            </div>

            <div className="details-container">
                <section id="Interactions" ref={interactionsRef}>
                    <InteractionsView
                        recommendations={recommendations}
                        bookmarks={bookmarks}
                        checkIns={checkIns}
                    />
                </section>

                {website && (
                    <section id="Website" ref={websiteRef} className="website">
                        <WebsiteView url={website}/>
                    </section>
                )}

                <section id="About" ref={aboutRef} className="description">
                    <AboutView description={description}/>
                </section>

                <section id="Hours" ref={hoursRef} className="hours">
                    <HoursSection hours={hours}/>
                </section>

                <section id="Details" ref={detailsRef}>
                    <AdditionalDetailsView
                        formattedAddress={formattedAddress}
                        price={price}
                        priceLevel={priceLevel}
                        primaryCuisine={primaryCuisine}
                        dietaryRestrictions={dietaryRestrictions}
                    />
                </section>

                <section id="Reviews" ref={reviewsRef}>
                    <ReviewsSection userId={userId} restaurant={restaurant}/>
                </section>
            </div>
        </div>
    );
};

export default DetailsPage;