// stylesheet
import "./ClosedSign.css";
// Import 'FontAwesomeIcon' component from '@fortawesome/react-fontawesome' package
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// Import icons
import {faBan} from "@fortawesome/free-solid-svg-icons";

// Define the 'ClosedSign' component
const ClosedSign = () => {
    // Render a div with a 'closed-sign' class, containing the text "Closed" and a FontAwesome icon
    return (
        <div className="closed-sign">
            Closed
            <FontAwesomeIcon className="icon" icon={faBan}/>
        </div>
    );
};

// Export the 'ClosedSign' component as the default export
export default ClosedSign;