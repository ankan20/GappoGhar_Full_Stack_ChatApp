import React from 'react'
import {Line,Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS ,CategoryScale,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend} from 'chart.js'
import { chartPurple, chartPurpleLight, orange, orangeLight, pink } from '../../constants/color';
import { getLast7Days } from '../../lib/features';
import zIndex from '@mui/material/styles/zIndex';



ChartJS.register(CategoryScale,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend);

const labels = getLast7Days()


const LineChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        },
    },

    scales:{
        x:{
            grid:{
                display:false,
            }
            
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false,
            }
            
        },
    },
}

const LineChart = ({value=[]}) => {
    const data = {
        labels ,
        datasets:[{
            data:value,
            label:"Revenue",
            fill:true,
            backgroundColor:chartPurpleLight,
            borderColor:chartPurple
        },
      
    
    ]
    }
  return (
    <Line data={data} options={LineChartOptions}/>
  )
}

const doughnutChartOptions = {
    responsive:true,
    plugins:{
        display:false,
    },
    
    cutout:120
}

const DoughnutChat = ({value=[],labels=[]}) => {
    const data = {
        labels ,
        datasets:[{
            data:value,
            label:"Total Chats vs Group Chats",
            backgroundColor:[chartPurpleLight,orangeLight],
            borderColor:[chartPurple,orange],
            hoverBackgroundColor:[chartPurple,orange],
            offset:40
        },
      
    
    ]
    }
    return (
      <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions}/>
    )
  }
  

export  {LineChart ,DoughnutChat}
