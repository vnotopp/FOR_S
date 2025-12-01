import React, { useState, useEffect } from 'react';
import { motivations } from '../data/motivations';

export default function Home({ notes, analytics, onRefresh }){
  const [mot, setMot] = useState(motivations[0]);

  useEffect(()=> setMot(motivations[Math.floor(Math.random()*motivations.length)]),[]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl card-bg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-bv-600">{mot.text}</h1>
            <p className="text-sm mt-1">{mot.sub}</p>
            <p className="mt-2 text-sm">Hey Siddhi — this space is made just for you. 💜</p>
            <div className="mt-3 text-sm text-gray-500">Made for babyy kamat</div>
          </div>
          <div>
            <button onClick={onRefresh} className="px-3 py-2 bg-white rounded-lg shadow">🔄 Refresh</button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl card-bg">
          <div className="text-sm text-gray-500">Study Time</div>
          <div className="text-2xl font-bold">{analytics.totalStudyTime || 0}m</div>
        </div>
        <div className="p-4 rounded-xl card-bg">
          <div className="text-sm text-gray-500">Sessions</div>
          <div className="text-2xl font-bold">{analytics.sessions || 0}</div>
        </div>
        <div className="p-4 rounded-xl card-bg">
          <div className="text-sm text-gray-500">Streak</div>
          <div className="text-2xl font-bold">{analytics.streak || 0}</div>
        </div>
      </div>

      <div className="p-4 rounded-xl card-bg">
        <h3 className="font-semibold">Random note</h3>
        <p className="text-gray-600 mt-2">{notes.length ? notes[Math.floor(Math.random()*notes.length)].text : 'No notes yet — leave her a sweet message!'}</p>
      </div>
    </div>
  );
}
