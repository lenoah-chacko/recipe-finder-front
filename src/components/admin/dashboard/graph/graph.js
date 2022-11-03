import React, { useEffect, useState } from 'react';

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

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip);


export function Graph() {
  const options = {
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
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", "November", "December"];
  
  const [data,setData]= useState()
  const [labels,setLabels]= useState()
  
  async function getData(){
    console.log("getting data")
      const response = await fetch("http://localhost:4000/api/admin/get-recent-recipes")
      await response.json().then((data)=>{
        setData(data.map((data)=>{return data.numberOfRecipes}))
        setLabels(data.map((data)=>{return months[data.MonthNumber-1]}))
      console.log("got",data)
    })
  }
  useEffect(()=>{
    getData()
  },[])
  useEffect(()=>{
    console.log("data",data)
  },[data])
  return <Line options={options} data={{"labels":labels,datasets: [
    {
      label: 'Submissions',
      data: data,
      borderColor: 'rgb(0, 42, 50)',  // line graph's line colour
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
}} />;
}