import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCripto } from '../context/crypto-context';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
    const { assets } = useCripto()
    const data = {
        labels: assets.map(a => a.name),
        datasets: [
            {
                label: '$',
                data: assets.map((a) => a.totalAmount),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', // Red
                    'rgba(54, 162, 235, 1)', // Blue
                    'rgba(255, 206, 86, 1)', // Yellow
                    'rgba(75, 192, 192, 1)', // Green
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(255, 159, 64, 1)', // Orange
                    'rgba(255, 99, 132, 1)', // Pink
                    'rgba(54, 162, 235, 1)', // Light Blue
                    'rgba(255, 206, 86, 1)', // Light Yellow
                    'rgba(75, 192, 192, 1)', // Teal
                    'rgba(153, 102, 255, 1)', // Lavender
                    'rgba(255, 159, 64, 1)'  // Coral
                ],
            },
        ],
    };


    return (
        <div style={{
            display: 'flex',
            marginBottom: '1rem',
            justifyContent: 'center',
            height: 400,
        }}>
            <Pie data={data} />
        </div>
    );
}
