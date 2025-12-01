import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

export default function Analytics({ analytics }){
  const data = { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets:[{ label:'Minutes', data: analytics.dailyData || [0,0,0,0,0,0,0], backgroundColor: 'rgba(91,79,198,0.8)', borderRadius:8 }] };
  const options = { scales:{ y:{ beginAtZero:true } }, plugins:{ legend:{ display:false } } };
  return (
    <div className='space-y-4'>
      <div className='p-4 card-bg rounded-xl shadow grid md:grid-cols-3 gap-4'>
        <div><div className='text-sm text-gray-500'>Total Study Time</div><div className='text-xl font-bold'>{analytics.totalStudyTime || 0}m</div></div>
        <div><div className='text-sm text-gray-500'>Sessions</div><div className='text-xl font-bold'>{analytics.sessions || 0}</div></div>
        <div><div className='text-sm text-gray-500'>Best Streak</div><div className='text-xl font-bold'>{analytics.streak || 0}</div></div>
      </div>
      <div className='p-4 card-bg rounded-xl shadow'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
