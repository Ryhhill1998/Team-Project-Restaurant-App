/*
Description: Cuisine button component which is in cuisine options on filters dropdown
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./CuisineButtonView.css";

// fontawesome imports
import {
    faUtensils,
    faGlassMartini,
    faBurger,
    faBeerMugEmpty,
    faPizzaSlice,
    faPepperHot,
    faBowlRice
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// grey image src imports
import GreyEuropeanImageSrc from "../../../../../../../../images/icons-grey/European.png";
import GreyJapaneseImageSrc from "../../../../../../../../images/icons-grey/Japanese.png";
import GreyMexicanImageSrc from "../../../../../../../../images/icons-grey/Mexican.png";
import GreySpanishImageSrc from "../../../../../../../../images/icons-grey/Spanish.png";
import GreySteakImageSrc from "../../../../../../../../images/icons-grey/Steak.png";
import GreySushiImageSrc from "../../../../../../../../images/icons-grey/Sushi.png";
import GreyThaiImageSrc from "../../../../../../../../images/icons-grey/Thai.png";

// yellow image src imports
import YellowEuropeanImageSrc from "../../../../../../../../images/icons-yellow/European.png";
import YellowJapaneseImageSrc from "../../../../../../../../images/icons-yellow/Japanese.png";
import YellowMexicanImageSrc from "../../../../../../../../images/icons-yellow/Mexican.png";
import YellowSpanishImageSrc from "../../../../../../../../images/icons-yellow/Spanish.png";
import YellowSteakImageSrc from "../../../../../../../../images/icons-yellow/Steak.png";
import YellowSushiImageSrc from "../../../../../../../../images/icons-yellow/Sushi.png";
import YellowThaiImageSrc from "../../../../../../../../images/icons-yellow/Thai.png";

// icons map declared outside component to make sure only declared once
const iconsMap = {
    British: faUtensils,
    Chinese: faBowlRice,
    Burger: faBurger,
    Indian: faPepperHot,
    Italian: faPizzaSlice,
    Pizza: faPizzaSlice,
    Pub: faBeerMugEmpty,
    Bar: faGlassMartini
};

// grey image src map
const greyImageSrcMap = {
    European: GreyEuropeanImageSrc,
    Japanese: GreyJapaneseImageSrc,
    Mexican: GreyMexicanImageSrc,
    Spanish: GreySpanishImageSrc,
    Steak: GreySteakImageSrc,
    Sushi: GreySushiImageSrc,
    Thai: GreyThaiImageSrc
};

// grey image src map
const yellowImageSrcMap = {
    European: YellowEuropeanImageSrc,
    Japanese: YellowJapaneseImageSrc,
    Mexican: YellowMexicanImageSrc,
    Spanish: YellowSpanishImageSrc,
    Steak: YellowSteakImageSrc,
    Sushi: YellowSushiImageSrc,
    Thai: YellowThaiImageSrc
};

// CuisineButtonView component
const CuisineButtonView = ({name, selected, handleClick}) => {

    // initialise icon using map depending on name prop
    const icon = iconsMap[name];

    // initialise icon using map depending on name prop and selected prop
    const imgSrc = selected ? yellowImageSrcMap[name] : greyImageSrcMap[name];

    return (
        <div
            id={`${name}-option`}
            className={`cuisine-option ${selected ? "selected" : ""}`}
            onClick={() => handleClick(name)}
        >
            {/* conditionally render icon if initialised */}
            {icon && <FontAwesomeIcon className="icon cuisine-icon" icon={icon}/>}

            {/* conditionally render img if initialised */}
            {imgSrc && <img alt={name} className="cuisine-icon" src={imgSrc}/>}

            <span className="cuisine-option-name">{name}</span>
        </div>
    );
};

export default CuisineButtonView;