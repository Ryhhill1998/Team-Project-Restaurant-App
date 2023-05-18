/*
 Description: Slider component. This component is rendered in the MapPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./Slider.css";
// Import dependencies

// Import 'react-swipeable' for restuarant cards
import {useSwipeable} from "react-swipeable";

import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide, selectSliderIsActive} from "../../../features/slider/sliderSlice";
import {displayRestaurant} from "../../../features/map/mapSlice";
import {selectRestaurants} from "../../../features/restaurants/restaurantsSlice";
import MapRestaurantCard from "./MapRestaurantCard/MapRestaurantCard";

const Slider = () => {

    const dispatch = useDispatch();
    // Get the 'activeSlide', 'sliderIsActive' and 'restaurants' from the Redux store
    const activeSlide = useSelector(selectActiveSlide);
    const sliderIsActive = useSelector(selectSliderIsActive);
    const restaurants = useSelector(selectRestaurants);
    // Declare a ref for the slider container
    const positionRef = useRef(window.innerWidth > 500 ? 500 : window.innerWidth);
    const offsetRef = useRef((window.innerWidth - positionRef.current) / 2);
    // useState hooks
    const [xPosition, setXPosition] = useState(offsetRef.current);
    const [style, setStyle] = useState({});

    // Update style on active slide change
    const updateStyle = useCallback(() => {
        requestAnimationFrame(() => {
            setStyle(style => {
                const updatedStyle = {...style};
                const translateX = offsetRef.current - (activeSlide * positionRef.current);
                updatedStyle.transform = `translateX(${translateX}px)`;
                setXPosition(translateX);
                return updatedStyle;
            });
        });
    }, [activeSlide, positionRef.current, offsetRef.current]);

    // Update positionRef and offsetRef on window resize
    const handlers = useSwipeable({
        onSwipedRight: () => {
            if (!sliderIsActive) return;

            dispatch(changeSlide("backward"));
        },
        onSwipedLeft: () => {
            if (!sliderIsActive) return;

            dispatch(changeSlide("forward"));
        },
        onSwiping: ({deltaX}) => {
            if (!sliderIsActive) return;

            requestAnimationFrame(() => {
                setStyle(style => {
                    const updatedStyle = {...style};
                    updatedStyle.transform = `translateX(${xPosition + deltaX}px)`;
                    return updatedStyle;
                });
            });
        },
        onTouchEndOrOnMouseUp: () => {
            updateStyle();
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        trackTouch: true
    });


    useEffect(() => {
        updateStyle();

        if (!restaurants) return;

        dispatch(displayRestaurant(restaurants[activeSlide]));
    }, [activeSlide]);

    if (!restaurants?.length) {
        return <></>;
    }

    return (
        <div className="slider" {...handlers} style={style}>
            <div className="restaurant-cards-container">
                {restaurants && restaurants.map((restaurant, i) => (
                    <MapRestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        index={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;