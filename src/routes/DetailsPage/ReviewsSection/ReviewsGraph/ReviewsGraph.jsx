/*
 Description: This file contains the ReviewsGraph component, which is a sub-component of the ReviewsSection component.
 It displays a bar graph of the number of reviews for each rating.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // Imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Bar} from 'react-chartjs-2';
import {useEffect, useState} from "react";
// Register ChartJS plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
// ChartJS options
const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderRadius: 8,
            borderSkipped: false
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: false
        }
    },
    scales: {
        x: {
            display: false,
            max: 19
        },
        y: {
            grid: {
                display: false
            },
            border: {
                display: false
            },
            ticks: {
                color: "black",
                padding: 0
            }
        }
    },
    layout: {
        padding: 0
    },
    animation: false,
    hover: false
};

const labels = [5, 4, 3, 2, 1];

const ReviewsGraph = ({reviewsHistogram}) => {
    // Declare state variables for the component
    const [maxRating, setMaxRating] = useState(0);
    // Set the maximum rating
    useEffect(() => {
        if (!reviewsHistogram || maxRating) return;

        const {count_1, count_2, count_3, count_4, count_5} = reviewsHistogram;

        const max = Math.max(count_1, count_2, count_3, count_4, count_5);
        options.scales.x.max = max;
        setMaxRating(max);
    }, [reviewsHistogram]);
    // Set the data for the graph
    const data = {
        labels,
        datasets: [
            {
                data: [
                    reviewsHistogram.count_5,
                    reviewsHistogram.count_4,
                    reviewsHistogram.count_3,
                    reviewsHistogram.count_2,
                    reviewsHistogram.count_1
                ],
                backgroundColor: '#F49D1A',
                barPercentage: 1,
                categoryPercentage: 1,
                maxBarThickness: 8,
            },
            {
                data: [maxRating, maxRating, maxRating, maxRating, maxRating],
                backgroundColor: '#e8e8e8',
                barPercentage: 1,
                categoryPercentage: 1,
                maxBarThickness: 8,
                grouped: false,
            }
        ],
    };

    if (!maxRating) {
        return <></>;
    }

    return (
        <Bar options={options} data={data}/>
    );
};

export default ReviewsGraph;