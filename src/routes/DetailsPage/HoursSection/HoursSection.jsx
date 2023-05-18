/*
 Description: This file contains the HoursSection component, which is a sub-component of the DetailsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 //stylesheet
import "./HoursSection.css";

const HoursSection = ({hours}) => {
    // Function to group days with the same hours, for better readability
    const groupDaysWithSameHours = (hours) => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let groupedHours = [];
        let currentGroup = [daysOfWeek[0]];
        let currentHours = hours[0];

        for (let i = 1; i < hours.length; i++) {
            if (hours[i] === currentHours) {
                currentGroup.push(daysOfWeek[i]);
            } else {
                groupedHours.push({
                    days: currentGroup,
                    hours: currentHours,
                });

                currentGroup = [daysOfWeek[i]];
                currentHours = hours[i];
            }
        }

        groupedHours.push({
            days: currentGroup,
            hours: currentHours,
        });

        return groupedHours.map(
            (group) => `${group.days[0]}${group.days.length > 1
                ?
                `-${group.days[group.days.length - 1]}`
                :
                ""}: ${group.hours}`
        );
    };

    return (
        <div className="hours-view">
            <h2>Opening Times</h2>

            {groupDaysWithSameHours(hours).map((hour, index) => (
                <p key={index}>{hour}</p>
            ))}
        </div>
    );
};

export default HoursSection;