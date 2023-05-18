/*
 Description: Sort filters view component. This component is rendered in the ReviewsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./SortFiltersView.css";

const SortFiltersView = ({filters, handleClick}) => {
    return (
        <div className="sort-filters-view">
            {filters.map(({text, active, type, multiplier}, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(text, type, multiplier)}
                    className={active ? "active" : ""}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default SortFiltersView;