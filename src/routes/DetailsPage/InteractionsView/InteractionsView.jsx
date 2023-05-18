/*
 Description: This file contains the InteractionsView component, which is a sub-component of the DetailsPage component.
 It renders the interactions section of the DetailsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// stylesheet 
import "./InteractionsView.css";
// Imports
import {faBookmark, faCheckCircle, faHeart} from "@fortawesome/free-regular-svg-icons";
import Interaction from "./Interaction/Interaction";

const InteractionsView = ({recommendations, bookmarks, checkIns}) => {
    return (
        <div className="interactions-view">
            <h2>Interactions</h2>
{/*Render multiple Interaction components for each interaction section*/}
            <div>
                <Interaction count={recommendations} icon={faHeart}/>

                <Interaction count={bookmarks} icon={faBookmark}/>

                <Interaction count={checkIns} icon={faCheckCircle}/>
            </div>
        </div>
    );
};

export default InteractionsView;