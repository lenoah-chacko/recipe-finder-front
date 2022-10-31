import React, { useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
      legend: {
        display: false
      },
      title: {
      display: true,
      text: 'Recipes added in the last 6 months',
      font: {
        size: 30
      }
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 60 })),
      borderColor: 'rgb(0, 42, 50)',  // line graph's line colour
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export function Graph() {
  useEffect(()=>{
    console.log(data.datasets[0].data)
  })
  return <Line options={options} data={data} />;
}